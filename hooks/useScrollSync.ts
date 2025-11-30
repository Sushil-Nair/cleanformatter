"use client";

import { useEffect, RefObject } from "react";

export function useScrollSync(
  refA: RefObject<HTMLTextAreaElement | HTMLDivElement | null>,
  refB: RefObject<HTMLTextAreaElement | HTMLDivElement | null>
) {
  useEffect(() => {
    const elA = refA.current;
    const elB = refB.current;

    if (!elA || !elB) return;

    if (!elA || !elB) return;

    let activeSource: "A" | "B" | null = null;

    const sync = (
      source: "A" | "B",
      target: HTMLTextAreaElement | HTMLDivElement,
      sourceEl: HTMLTextAreaElement | HTMLDivElement
    ) => {
      if (activeSource && activeSource !== source) return;
      activeSource = source;

      const ratio =
        sourceEl.scrollTop / (sourceEl.scrollHeight - sourceEl.clientHeight);

      target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);

      // Unlock immediate sync
      requestAnimationFrame(() => {
        activeSource = null;
      });
    };

    const handleScrollA = () => sync("A", elB, elA);
    const handleScrollB = () => sync("B", elA, elB);

    elA.addEventListener("scroll", handleScrollA);
    elB.addEventListener("scroll", handleScrollB);

    return () => {
      elA.removeEventListener("scroll", handleScrollA);
      elB.removeEventListener("scroll", handleScrollB);
    };
  }, [refA, refB]);
}
