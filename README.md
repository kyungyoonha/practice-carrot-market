### pscale 명령어

- DB 생성
  - pscale database carrot-market --region ap-northeast
- 로그인
  - pscale auth login
- prisma 와 pscale 연동 => pscale connect carrot-market
  - 따로 url, dbname, id, pw 등을 할 필요 없음
  - pscale connect carrot-market 하면 바로 127.0.0.1:3306 으로 서버 실행됌
  - env => DATABASE_URL="mysql://127.0.0.1:3306/carrot-market"
- 변경사항 반영(스키마 생성)
  - npx prisma generate
- 푸쉬(반영 및 prisma에 올림)
  - npx prisma db push
- 관리자 패널
  - npx prisma studio

# referentialIntegrity = "prisma" 설정 필요

- Vitess 는 foreign key constraint 를 지원하지 않기 때문에 없는 유저로 커멘트 생성해도 에러가 발생하지 않음
- referentialIntegrity = "prisma" 설정을 해주면 에러 발생시켜준다

# Twilio (임시 번호로 문자 보내기)

- 15달러 무료 사용가능
- gkb10a@gmail.com
- n---!!
- messaging > Services > create
- messaging > try it out > phone 생성 (한달에 1달러)

### DB에 이미 데이터가 들어가 있는 경우에 모델에 어떻게 새로운 컬럼을 추가할 수 있을까?

- npx prisma db push 하면 에러가 발생한다.
- 방법1)
  - db 데이터 다 삭제하고 수정한 거 저장
- 방법2)
  - default 값 생성
  - 기존 값들에 대해서 기본값을 설정해줘야한다.
  - Review라는 모델에 score을 추가하면 기존 Review 데이터의 score값으로 넣어줄 default 값을 설정해줘야한다.
- 방법3)
  - 새로 추가되는 컬럼은 not required으로 설정하기

### 같은 컬럼을 가진 모델여러개를 하나로 합칠 수 있을까?

- Sale, Purchase, Fav 전부 동일한 구조이다
- 하나로 묶고 kind로 구분해주기만 하면된다.
- 이거 정말 많이 고민했었는데 enum으로 해결가능!
- 카테고리 값으로 또 모델을 만들어야하나 고민했었는데 그냥 enum으로 특정 값들을 카테고리로 줄 수 있음!!

### SEED 데이터 생성하기

- npx prisma db seed
  - node-ts 필요
  - package.json에 명령어 추가해줘야한다

### User와 같이 기본적으로 Relation이 많은 모델의 경우는 한번 요청시에 모든걸 가져올시 엄청나게 많은 row를 읽어야한다

- User가 작성한 Post 안에는 리뷰가 또 달려있음
  - 유저가 작성한 모든 포스터와 포스터안의 모든 리뷰를 다가져오면 엄청난 낭비임
- 가져오는 것 모두 pagination이 필요하다

### planetScale 제일 큰 장점

- serverless
- 무료로 한달에 1억 row read 가능
- dashboard에서 직관적으로 얼마나 사용했는지 확인 가능

### CloudFlare Images 제일 큰 장점

- 100,000개당 5달러 / 월
- 100,000 호출시 1달러
- no egress cost
  - Bandwidth 요금 없음 (대역폭에 비용을 청구하지 않음)
  - 아무리 무거운 이미지를 업로드 하더라도 걱정하지 않아도 됌
- 최적화나 리사이징에도 추가 요금 없음
- 미친 개쩐다
- 리사이징도 따로 할필요 없이 url에 사이즈만 명시해주면 알아서 변경해서 내려줌
- 크리에이터 직접 업로드
  - File(Browser) ----> CloudFlare (바로)
  - File(Browser) ----> Our Server ----> CloudFlare (x)
    - 서버를 거치면 Bandwidth 요금을 내야한다
    - 이미지가 크면 코스트가 비쌈

### NEXT JS: \_document.tsx 와 \_app.tsx 차이

- \_app.tsx는 유저가 페이지를 불러올때마다 브라우저에서 실행됌

### NEXT JS + 구글 폰트 사용해야하는 이유?

- 구글 폰트로 설정하면 빌드할때 .next 파일안에 다 다운받아서 static으로 만들어준다.
- 유저가 페이지 열때 다시 폰트를 다운 받을 필요 없음
- 로딩 굉장히 빨라진다.
- .next/server/pages/index.html 보면 폰트가 다 들어가져있음

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

### SSR + SWR 콤보 (getServerSideProps)

- swr에 캐시데이터를 미리 보낼 수 있음
- 처음 시작부터 캐시 데이터를 가진다.
- 다른페이지 갔다와도 api따로 요청할 필요없음
- fallback 에다가 key를 주면된다.
- 처음에 뜰때 한번에 모든 데이터가 다보임
- Loading 이 없어진다.
- 단점
  - 데이터를 받아오는데 5초가 걸리다면 5초동안 아무것도 안뜸

### iron-session 역할

- 쿠키를 가져와서 파스하고 그안에 데이터를 req안에 넣어준다.
- req.session.user안에 넣어줌

### Next JS: getStaticProps

- 빌드 될때 한번만 생성
- 데이터 호출을 따로 할 필요 없는 경우 사용
- 블로그 처럼 데이터가 변하지 않는 경우에 사용
- revalidate: 20,
  - 유저가 방문하고 20초 안에 다른 유저가 들어오면 같은 데이터 보임
  - 유저가 방문하고 20초 이후에 다른 유저가 들어오면 getStaticProps()가 한번 돌아가서 html다시 빌드함
  - 다른 데이터를 볼 수 있음
  - 데이터가 많이 바뀌지 않은 경우에 사용하면 좋다.
    - 니코사이트처럼 강의는 매번 올라가지 않음
    - 빌드를 계속 해줄 필요가 없음 일정 시간 지나면 새로 빌드해서 파일 만들어주므로 좋다.

### NEXT JS: Dynamic Import 사용하는 이유

- 페이지를 불러올때 모든 컴포넌트를 다 불러올 필요가 없는 경우
- 동적으로 컴포넌트를 추가하고 싶은 경우
- 다 만들고 최적화 할 때 사용하면 됌

### Plenetscale

- main을 production 브런치로 지정하면 다이렉트로 npx prisma db push 사용할 수 없음
- 실제 유저가 사용하므로 다이렉트로 변경되면 안됌
- 다른 브랜치를 만들어서 merge해줘야한다
- planetscale에서 (indexes) 브랜치 생성
  - 기존 연결 제거
  - pscale connect carrot-market indexes
  - 변경 후 푸쉬
  - npx prisma db push
  - 홈피에서 브랜치 머지
  - 홈피에서 브랜치 삭제
- 보통
  - main을 production 브랜치로 드고
  - dev 하나 만들어서 수정후 머지 (dev는 걔속 유지)
  - dev는 테스트 데이터 계속 유지
  - 브린치 새로만들면 스키마만 있고 데이터는 없다

### planetscale @@index([]) 생성해주는이유?

- mysql은 관계를 만들때 자동으로 인덱스를 생성해서 검색하는 속도가 매우 빠름
- planetscale은 인덱스를 생성하지 않으므로 모든 디비에서 처음부터 순서대로 찾음
- 인덱스가 있으면, 사전에서 알파벳순으로 들어가서 찾듯이 쉽게 찾을 수 있음
- 특히나 planetscale은 데이터를 읽는거에 과금이므로 더 조심
- @@index([관계id])

### vercel 베포

- 환경변수는 만들때 입력해줄 수 있음
- DATABASE_URL 은 plenetscale > connect > connect with prisma
- 배포에러

  - 문제-프로덕션에서 폰트를 정상적으로 불러오지 못함. (dev에서는 작동함)
  - 해결- https://fontsource.org/ 사용

  - 문제- 배포 후 OG가 정상적으로 그려지지 않음
  - 해결- 강의과정에서 진행한 middleware의 isBot 기능이 OG 데이터를 수집하려는 플랫폼을 막는 듯 함. isBot 기능 제거 후 작동.

  - 문제- 동적 라우팅의 sitemap 작성
  - 해결- https://cottonwood-moa.tistory.com/137
