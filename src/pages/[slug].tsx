import Head from "next/head";
import { api } from "~/utils/api";

export default function ProfilePage() {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "julilan",
  });
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>404</div>;

  console.log(data);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>{data.username}</div>
      </main>
    </>
  );
}
