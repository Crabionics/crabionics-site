import { redirect } from "next/navigation";

// AquaOS now lives within the consolidated Platform & Technology page.
export default function AquaOSPage() {
  redirect("/platform");
}
