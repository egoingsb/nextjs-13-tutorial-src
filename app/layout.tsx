import Link from "next/link";
import "./globals.css";
import { Controls } from "./Controls";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // https://nextjs.org/docs/app/building-your-application/data-fetching/caching#fetch
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
    next: { revalidate: 0 },
  });
  const data = await resp.json();
  return (
    <html lang="en">
      <body>
        <h1>
          <Link href="/">Web</Link>
        </h1>
        <ol>
          {/* @ts-ignore */}
          {data.map((topic) => (
            <li>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ol>
        {children}
        <Controls></Controls>
      </body>
    </html>
  );
}
