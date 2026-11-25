"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useNarrowViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}