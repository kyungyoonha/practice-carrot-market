import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Script from "next/script";

// declare global {
//   interface Window {
//     fbAsyncInit: unknown;
//   }
// }

/*
### Script strategory = beforeInteractive | afterInteractive | lazyOnload
- beforeInteractive 로딩 되기전에 다 불러움
  - 느림
- faterInteractive 로딩 되고나서 불러옴 
  - default 값임
  - 대부분에 <Script> 로 불러오는 것들은 beforeInteractive할 필요 없음
  - 페이지가 뜨고나서 스크립트를 불러오면 된다.
  - 따라서 보통 이걸 많이 씀
- lazyOnload
  - 다른 모든 데이터와 소스들을 전부다 불러오고 나서 스크립트 불러옴
  - 최후의 호출
  - 별로 중요하지 않은 기능들은 나중에 불러올때 
*/

function MyApp({ Component, pageProps }: AppProps) {
  console.log("APP IS RUNNING");
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
      {/* 카카오 SDK 불러옴 */}
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      {/* 
      페이스북 SDK 불러옴
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v13.0",
            });
          };
        }}
      /> */}
    </SWRConfig>
  );
}

export default MyApp;
