"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 클라이언트 컴포넌트는 async로 구현하면 무한 루프에 빠질 수 있음.
export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + params.id)
      .then((resp) => resp.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);
  return (
    <>
      <h2>Update</h2>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          const form = evt.target;
          //@ts-ignore
          const title = form.title.value;
          //@ts-ignore
          const body = form.body.value;
          const resp = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "topics/" + params.id,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: title,
                body: body,
              }),
            }
          );
          const result = await resp.json();
          router.refresh();
          router.push(`/read/${result.id}`);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </>
  );
}
