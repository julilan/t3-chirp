import { api } from "~/utils/api";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PostView } from "~/components/postview";
import { PageLayout } from "~/components/layout";
import { generateServerSideHelpers } from "~/server/helpers/serverSideHelper";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export default SinglePostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateServerSideHelpers();
  const id = context.params?.id as string;

  await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
