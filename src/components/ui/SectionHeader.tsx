import Link from "next/link";

/** Section title (red left-accent) + optional red "See All" button. */
export function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="secHead">
      <h2 className="secTitle">{title}</h2>
      {href && (
        <Link href={href} className="btn btn--primary btn--sm">
          See All
        </Link>
      )}
    </div>
  );
}
