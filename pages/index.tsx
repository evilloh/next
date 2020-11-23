import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BlogTitle = styled.h1`
  color: #0070f3;
  text-decoration: none;
`;

const title: string = "Next.js + Typescript";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ posts });
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <BlogTitle>
          Welcome aat <a href="https://nextjs.org">Next.js!</a>
        </BlogTitle>
        <ul>
          {posts.map((post) => (
            <Link href="/posts/[id]" as={"/posts/" + post.id} key={post.id}>
              <li key={post.id}>
                <h4> {post.title} </h4>
              </li>
            </Link>
          ))}
        </ul>
      </Main>
    </Container>
  );
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
  };
};
