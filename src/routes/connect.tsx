import { createFileRoute } from "@tanstack/react-router";
import { AdapterPage } from "@/components/adapter/adapter-page";

export const Route = createFileRoute("/connect")({
  component: ConnectPage,
});

function ConnectPage() {
  return <AdapterPage />;
}
