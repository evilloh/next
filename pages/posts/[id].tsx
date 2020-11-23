import { useRouter } from "next/router";
import Link from "next/link";
import type { Post } from "../index";
import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";

export default function BlogPost({
  post,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <section>
      <h1> Titolino: {post.title} </h1>
      <Link href="/">About this blog</Link>
    </section>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const emptyPost: Post = {
    title: "Post not found",
    body: "",
    id: 0,
    userId: 0,
  };

  if (!params?.id) {
    return {
      props: {
        post: emptyPost,
      },
    };
  }
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.id
  );

  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};
