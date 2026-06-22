import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/** Shared shell for static / policy pages: breadcrumb + title + content. */
export function StaticPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="staticPage">
      <Breadcrumb items={[{ label: title }]} />
      <h1 className="staticPageTitle">{title}</h1>
      <span className="staticPageAccent" />
      <div className="staticPageBody">{children}</div>
    </div>
  );
}
