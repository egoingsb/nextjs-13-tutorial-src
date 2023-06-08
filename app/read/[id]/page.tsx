export default async function Read({ params }: { params: { id: string } }) {
  const resp = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "topics/" + params.id
  );
  const data = await resp.json();
  return (
    <>
      <h2>{data.title}</h2>
      {data.body}
    </>
  );
}
