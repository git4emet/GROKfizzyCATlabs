import { createFileRoute } from "@tanstack/react-router";
import { AtlasPage } from "@/components/atlas/atlas-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <AtlasPage />;
}
