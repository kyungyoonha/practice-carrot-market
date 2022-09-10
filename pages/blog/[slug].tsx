import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

/*
### Next JS: getStaticPath
- 동적 url 쓰는 경우
- [slug].tsx로 접근하는 경우 nextJS는 얼마나 많은 path가 있는지 알려줘야한다.
*/

export function getStaticPaths() {
  // const files = readdirSync("./posts").map((file) => {
  //   const [name, extension] = file.split(".");
  //   return { params: { slug: name } };
  // });
  // return {
  //   paths: files,
  //   fallback: false,
  // };

  return {
    paths: [],
    fallback: "blocking",
  };
}

/*
### .md 파일 html 로 변경
*/
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: {
      data,
      post: value, // html 로 변경됌
    },
  };
};

export default Post;
