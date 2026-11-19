/** Future Rewarded Video SDK — off until explicitly enabled in env. */
export function isRewardedVideoEnabled(): boolean {
  const raw = process.env.NEXT_PUBLIC_REWARDED_VIDEO_ENABLED?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}