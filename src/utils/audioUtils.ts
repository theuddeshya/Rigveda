/**
 * Utility functions for Rigveda audio playback
 */

type AudioData = {
  [mandala: string]: {
    [sukta: string]: string;
  };
};

let audioDataCache: AudioData | null = null;

/**
 * Load audio data from the JSON file
 */
export async function loadAudioData(): Promise<AudioData> {
  if (audioDataCache) {
    return audioDataCache;
  }

  try {
    const response = await fetch('/data/rig-veda-audio.json');
    if (!response.ok) {
      throw new Error('Failed to load audio data');
    }
    audioDataCache = await response.json();
    return audioDataCache!;
  } catch (error) {
    console.error('Error loading audio data:', error);
    return {};
  }
}

/**
 * Get audio URL for a specific verse
 * @param mandala - Mandala number
 * @param sukta - Sukta number
 * @returns Audio URL or null if not available
 */
export async function getAudioUrl(mandala: number, sukta: number): Promise<string | null> {
  const audioData = await loadAudioData();

  const mandalaKey = String(mandala);
  const suktaKey = String(sukta);

  if (audioData[mandalaKey] && audioData[mandalaKey][suktaKey]) {
    return audioData[mandalaKey][suktaKey];
  }

  return null;
}

/**
 * Check if audio is available for a specific verse
 * @param mandala - Mandala number
 * @param sukta - Sukta number
 * @returns Promise resolving to boolean
 */
export async function hasAudio(mandala: number, sukta: number): Promise<boolean> {
  const url = await getAudioUrl(mandala, sukta);
  return url !== null;
}
