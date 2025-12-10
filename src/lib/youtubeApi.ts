// Minimal YouTube Data API v3 helper to find Creative Commons videos for a mood.
// Requires VITE_YOUTUBE_API_KEY in environment for client-side calls.

type SearchResult = {
  id: { videoId?: string };
  snippet?: any;
};

export async function searchCreativeCommonsVideo(query: string): Promise<string | null> {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!key) throw new Error('Missing YouTube API key');

  const params = new URLSearchParams({
    key,
    part: 'snippet',
    q: query,
    type: 'video',
    videoLicense: 'creativeCommon',
    maxResults: '5',
    safeSearch: 'moderate',
  });

  const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
  const resp = await fetch(url);
  if (!resp.ok) return null;
  const data = await resp.json();
  const items: SearchResult[] = data.items || [];
  for (const it of items) {
    if (it.id && it.id.videoId) return it.id.videoId;
  }
  return null;
}

export default { searchCreativeCommonsVideo };
