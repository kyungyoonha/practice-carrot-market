import Document, { Head, Html, Main, NextScript } from "next/document";

// _document.tsx 서버 실행될때 한번만 실행
// _app.tsx는 유저가 페이지를 불러올때마다 브라우저에서 실행됌

class CustomDucument extends Document {
  render(): JSX.Element {
    console.log("DOCUMENT IS RUNNING");
    return (
      <Html lang="ko">
        <Head>
          {/* 
          ### NEXT JS + 구글 폰트 사용해야하는 이유?
            - 구글 폰트로 설정하면 빌드할때 .next 파일안에 다 다운받아서 static으로 만들어준다. 
            - 유저가 페이지 열때 다시 폰트를 다운 받을 필요 없음 
            - 로딩 굉장히 빨라진다.
            - .next/server/pages/index.html 보면 폰트가 다 들어가져있음
          */}
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDucument;
