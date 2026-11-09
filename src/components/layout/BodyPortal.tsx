"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useClientMounted } from "@/lib/use-client-mounted";

const PORTAL_ROOT_ID = "puresign-portal-root";

function getPortalRoot(): HTMLElement {
  const existing = document.getElementById(PORTAL_ROOT_ID);
  if (existing) return existing;

  const created = document.createElement("div");
  created.id = PORTAL_ROOT_ID;
  created.setAttribute("aria-hidden", "true");
  created.className =
    "pointer-events-none fixed inset-0 z-[100] [&>*]:pointer-events-auto";
  document.body.appendChild(created);
  return created;
}

type BodyPortalProps = {
  open: boolean;
  children: ReactNode;
};

export function BodyPortal({ open, children }: BodyPortalProps) {
  const mounted = useClientMounted();

  if (!mounted || !open) {
    return null;
  }

  return createPortal(children, getPortalRoot());
}
