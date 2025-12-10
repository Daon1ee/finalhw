// Color API helper - fetch palettes from TheColorAPI (https://www.thecolorapi.com)
// Provides a small adapter: fetchPaletteForMood(mood) -> Promise<string[]>

const moodToSeed: Record<string, string> = {
  happy: 'sunshine',
  calm: 'ocean',
  romantic: 'roses',
  energetic: 'neon',
  cozy: 'coffee',
  dreamy: 'pastel',
  vibrant: 'festival',
  peaceful: 'nature',
};

async function fetchFromTheColorApi(seed: string, count = 5): Promise<string[]> {
  // TheColorAPI doesn't provide a direct mood -> palette endpoint.
  // We'll use a simple approach: use an HTML color name or seed word to request a scheme
  // via the `/scheme` endpoint by supplying a seed color derived from the seed word.
  // For reliability we attempt a few strategies and return the first successful palette.

  // Helper: convert a string into a hex-like pseudo-seed by hashing
  const hashToHex = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
    // produce 6 hex digits
    const hex = ((h >>> 0) & 0xffffff).toString(16).padStart(6, '0');
    return `#${hex}`;
  };

  const seedHex = hashToHex(seed || 'a');

  const url = `https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(seedHex.replace('#',''))}&format=json&mode=analogic&count=${count}`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Color API request failed: ${resp.status}`);
  const data = await resp.json();
  if (!data || !data.colors) throw new Error('Unexpected color API response');

  return data.colors.slice(0, count).map((c: any) => c.hex.value as string);
}

export async function fetchPaletteForMood(mood: string | null, fallback: string[] = []): Promise<string[]> {
  if (!mood) return fallback;
  const seed = moodToSeed[mood] || mood;
  try {
    const palette = await fetchFromTheColorApi(seed, 5);
    if (Array.isArray(palette) && palette.length > 0) return palette;
    return fallback;
  } catch (err) {
    // network error or API error -> return fallback
    return fallback;
  }
}

export default { fetchPaletteForMood };
