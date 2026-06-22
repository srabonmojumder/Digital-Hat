import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Digital Hat — home"
      className={`logo ${className}`.trim()}
    >
      <span className="logoMark">DH</span>
      <span className="logoText">
        Digital<span className="logoTextAccent">Hat</span>
      </span>
    </Link>
  );
}
