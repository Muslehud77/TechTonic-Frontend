import Head from "next/head";

type layoutProps = {
  children: React.ReactNode;
  posts: React.ReactNode;
};

const layout = ({ children ,posts}: layoutProps) => {
  return (
    <>
      {" "}
      <Head>
        <title>Feed</title>
        <meta name="description" content="A feed page displaying posts." />
      </Head>
      {children} {posts}
    </>
  );
};

export default layout;
