const BASE_URL = 'https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main';

async function safeFetch(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ui-blocks-cli' },
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res;
  } catch (err) {
    clearTimeout(timeout);
    throw new Error(`Fetch failed: ${url}\n${err.message}`);
  }
}

export async function fetchRegistry() {
  const res = await safeFetch(`${BASE_URL}/blocks.json`);
  return await res.json();
}

export async function fetchComponentFile(fileName) {
  const res = await safeFetch(`${BASE_URL}/templates/${fileName}`);
  return await res.text();
}

