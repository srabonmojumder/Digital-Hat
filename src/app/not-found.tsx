import { Compass } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="page">
      <EmptyState
        icon={Compass}
        title="404 — Page not found"
        message="The page you're looking for doesn't exist or may have moved."
      />
    </div>
  );
}
