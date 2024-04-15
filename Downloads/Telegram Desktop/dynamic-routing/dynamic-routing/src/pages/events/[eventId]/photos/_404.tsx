import Link from "next/link";
import { inter } from "@/fonts";
export default function NotFound() {
  return (
    <div className={inter.className}>
      <h1>Photo does not exist</h1>
      <Link href="/events">Return to events page</Link>
    </div>
  );
}
