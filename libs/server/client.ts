import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;

// hot 리로딩 될때마다 client 생성되는 것을 방지
// prisma 무료에는 client 연결 제한있음
