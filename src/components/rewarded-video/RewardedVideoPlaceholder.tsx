"use client";

import { isRewardedVideoEnabled } from "@/lib/rewarded-video/config";

/**
 * Reserved mount point for a future Rewarded Video SDK surface.
 * Renders nothing while the feature flag is off.
 */
export function RewardedVideoPlaceholder() {
  if (!isRewardedVideoEnabled()) {
    return null;
  }

  return <div data-rewarded-video-host className="hidden" aria-hidden />;
}