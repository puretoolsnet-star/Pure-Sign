import { isRewardedVideoEnabled } from "@/lib/rewarded-video/config";

export type RewardedVideoResult = "skipped" | "completed" | "unavailable";

/**
 * Placeholder for a future Rewarded Video SDK integration.
 * When disabled (default), runs `onUnlocked` immediately with no UI or delay.
 */
export async function runRewardedVideoGate(
  onUnlocked: () => void | Promise<void>,
): Promise<RewardedVideoResult> {
  if (!isRewardedVideoEnabled()) {
    await onUnlocked();
    return "skipped";
  }

  // SDK wiring goes here (show ad, await completion, then unlock).
  await onUnlocked();
  return "unavailable";
}