"use client";

import { useSyncExternalStore } from "react";

const eventName = "czn-storage-change";
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(eventName, callback); };
};

export function useStoredValue(key: string, fallback: string) {
  return useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  }, () => fallback);
}

export function storeValue(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* storage can be blocked */ }
  window.dispatchEvent(new Event(eventName));
}
