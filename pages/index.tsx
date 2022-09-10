import type { NextPage } from "next";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import Image from "next/image";
import riceCake from "../public/local.jpeg";
import client from "@libs/server/client";

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data
          ? data.products?.map((product) => (
              <Item
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price}
                hearts={product._count?.favs}
              />
            ))
          : "Loading..."}

        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
      <Image src={riceCake} placeholder="blur" quality={5} alt="" />
    </Layout>
  );
};

/*
### SSR + SWR 콤보
- swr에 캐시데이터를 미리 보낼 수 있음
- 처음 시작부터 캐시 데이터를 가진다.
- 다른페이지 갔다와도 api따로 요청할 필요없음
- fallback 에다가 key를 주면된다.
- 처음에 뜰때 한번에 모든 데이터가 다보임
- Loading 이 없어진다.
*/
const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

//
/*
### getServerSideProps 쓰는이유
- 처음에 뜰때 한번에 모든 데이터가 다보임
- Loading 이 없어진다.
- 만약에 api 호출하다 에러뜨면 페이지 전체를 볼 수 없게된다.
*/

export async function getServerSideProps() {
  console.log("SSR");
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
