// Unsplash API utility

// Mood to keyword mapping
const moodKeywords: Record<string, string[]> = {
  happy: ['sunshine', 'flowers', 'smile', 'joy', 'bright'],
  calm: ['ocean', 'lake', 'zen', 'spa', 'meditation'],
  romantic: ['roses', 'sunset', 'couple', 'heart', 'candle'],
  energetic: ['sports', 'dance', 'fire', 'lightning', 'action'],
  cozy: ['coffee', 'blanket', 'fireplace', 'autumn', 'warm'],
  dreamy: ['clouds', 'stars', 'fantasy', 'pastel', 'ethereal'],
  vibrant: ['color', 'festival', 'rainbow', 'neon', 'party'],
  peaceful: ['nature', 'forest', 'morning', 'serene', 'tranquil'],
};

export function getMoodKeyword(mood: string): string {
  const keywords = moodKeywords[mood] || ['nature'];
  return keywords[Math.floor(Math.random() * keywords.length)];
}

export async function searchUnsplashPhotos(query: string, count: number = 6) {
  // Using Unsplash Source API which doesn't require authentication
  // This provides random images matching the query
  const timestamp = Date.now();
  
  return Array.from({ length: count }, (_, i) => {
    // Each image gets a unique seed to ensure different images
    const seed = timestamp + i;
    return {
      id: `${query}-${seed}`,
      url: `https://source.unsplash.com/800x800/?${encodeURIComponent(query)}&seed=${seed}`,
      smallUrl: `https://source.unsplash.com/400x400/?${encodeURIComponent(query)}&seed=${seed}`,
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    };
  });
}

export function getMoodPhotos(mood: string | null, count: number = 6) {
  const keyword = mood ? getMoodKeyword(mood) : 'nature';
  const timestamp = Date.now();
  
  return Array.from({ length: count }, (_, i) => {
    const seed = timestamp + i;
    return {
      id: `${keyword}-${seed}`,
      url: `https://source.unsplash.com/400x400/?${encodeURIComponent(keyword)}&seed=${seed}`,
      smallUrl: `https://source.unsplash.com/400x400/?${encodeURIComponent(keyword)}&seed=${seed}`,
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    };
  });
}