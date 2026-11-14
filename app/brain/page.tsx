import { redirect } from "next/navigation";

/** Preview route only. Not the production authenticated Brain service. */
export default function BrainPage() {
  redirect("/brain/index.html");
}
