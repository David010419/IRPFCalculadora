export type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "irpf-cookie-consent-v1";
const EVENT_NAME = "irpf-consent-changed";

export function getStoredConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // almacenamiento no disponible (modo privado, cuota superada, etc.)
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
}

export function resetStoredConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // almacenamiento no disponible (modo privado, cuota superada, etc.)
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
}

export function subscribeConsent(
  callback: (value: ConsentValue | null) => void
): () => void {
  function handler(event: Event) {
    callback((event as CustomEvent<ConsentValue>).detail);
  }
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
