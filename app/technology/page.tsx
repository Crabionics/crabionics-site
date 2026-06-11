import { redirect } from "next/navigation";

// Technology now lives within the consolidated Platform & Technology page.
export default function TechnologyPage() {
  redirect("/platform");
}
