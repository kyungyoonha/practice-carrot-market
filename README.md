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

- 100,000개당 5달러
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
