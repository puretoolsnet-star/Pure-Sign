export type StampShape = "rect" | "round";

export type DocumentStampMeta = {
  shape: StampShape;
  /** Rect stamp text or round seal center label. */
  label: string;
  /** Text along the top arc of a round seal. */
  ringText: string;
  color: string;
  lightImprint: boolean;
};