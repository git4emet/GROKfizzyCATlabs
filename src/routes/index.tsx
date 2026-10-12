import { createFileRoute } from "@tanstack/react-router";
import { AdapterPage } from "@/components/adapter/adapter-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <AdapterPage />;
}
