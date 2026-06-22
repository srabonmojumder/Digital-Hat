import Link from "next/link";
import type { ComponentType } from "react";

export function EmptyState({
  icon: Icon,
  title,
  message,
  actionHref = "/",
  actionLabel = "Back to Home",
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="empty">
      <span className="emptyIcon">
        <Icon />
      </span>
      <h2 className="emptyTitle">{title}</h2>
      <p className="emptyText">{message}</p>
      <Link href={actionHref} className="btn btn--primary emptyBtn">
        {actionLabel}
      </Link>
    </div>
  );
}
