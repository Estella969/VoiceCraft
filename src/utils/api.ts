import { Scene } from '../types';

const API_BASE_URL = '/api';

export async function generate(
  prompt: string,
  options: { scene: Scene; lang: string; tone?: string }
): Promise<ReadableStream<any>> {
  const { scene, lang, tone } = options;
  const response = await fetch(`${API_BASE_URL}/ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      scene,
      lang,
      tone,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate response: ${errorText}`);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  return response.body;
} 