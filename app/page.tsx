import { redirect } from "next/navigation";

/** The root path just bounces straight into the wiki. */
export default function RootPage() {
  redirect("/wiki");
}
