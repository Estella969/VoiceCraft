export interface StorageData {
  mbtiType: string;
  favorites: GeneratedText[];
  history: GeneratedText[];
}

export interface GeneratedText {
  id: string;
  text: string;
  scene: string;
  tone: {
    formal: number;
    restrained: number;
  };
  isFavorite: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'voicecraft_data';

export function saveToStorage(data: Partial<StorageData>): void {
  const existingData = getFromStorage();
  const newData = { ...existingData, ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
}

export function getFromStorage(): StorageData {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return {
      mbtiType: '',
      favorites: [],
      history: []
    };
  }
  return JSON.parse(data);
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}