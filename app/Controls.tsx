"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Controls() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <>
      <ul>
        <li>
          <Link href="/create">create</Link>
        </li>
        {id ? (
          <>
            <li>
              <Link href={`/update/${id}`}>update</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  if (confirm("Really?")) {
                    fetch(process.env.NEXT_PUBLIC_API_URL + `/delete/${id}`, {
                      method: "DELETE",
                    })
                      .then((resp) => resp.json())
                      .then((result) => {
                        router.refresh();
                        router.push("/");
                      });
                  }
                }}
              >
                delete
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </>
  );
}
