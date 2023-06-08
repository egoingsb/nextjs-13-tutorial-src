"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          const form = evt.target;
          //@ts-ignore
          const title = form.title.value;
          //@ts-ignore
          const body = form.body.value;
          const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              body: body,
            }),
          });
          const result = await resp.json();
          //   https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
          router.refresh();
          router.push(`/read/${result.id}`);
        }}
      >
        <h2>Create</h2>
        <p>
          <input type="title" name="title" />
        </p>
        <p>
          <textarea name="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </>
  );
}
