# pscale DB 생성

- pscale database carrot-market --region ap-northeast

# pscale 명령어

- pscale auth login

# prisma 와 pscale 연동 
# pscale connect carrot-market
- 따로 url, dbname, id, pw 등을 할 필요 없음
- pscale connect carrot-market 하면 바로 127.0.0.1:3306 으로 서버 실행됌
- env => DATABASE_URL="mysql://127.0.0.1:3306/carrot-market"

# referentialIntegrity = "prisma" 설정 필요

- Vitess 는 foreign key constraint 를 지원하지 않기 때문에 없는 유저로 커멘트 생성해도 에러가 발생하지 않음
- referentialIntegrity = "prisma" 설정을 해주면 에러 발생시켜준다

# prisma 푸시

- npx prisma db push

# prisma 관리자 패널

- npx prisma studio

# npx prisma generate

- node_modules/@prisma/client/index.d.ts/User 내가만든 스키마 생성됌

# Twilio (임시 번호로 문자 보내기)

- 15달러 무료 사용가능
- gkb10a@gmail.com
- n---!!
- messaging > Services > create
- messaging > try it out > phone 생성 (한달에 1달러)
