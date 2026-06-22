import type { ReactNode } from "react";

/** Long-form text styling (see styles/components/_prose.scss). */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
}
