import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import nodemailer from "nodemailer";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PW,
  },
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        // 원래라면 user를 먼저 생성하고 id 값을 넣어줘야하는데 여기서는 바로 생성가능
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHOPNE!,
    //   body: `Your login token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const sendEmail = await transporter
    //   .sendMail({
    //     from: `ABC <ruddbsqkend@gmail.com>`,
    //     to: email,
    //     subject: `Your token is ${payload}`,
    //     text: `your login token is ${payload}`,
    //     html: `
    //     <div style="text-align: center;">
    //       <h3 style="color: #FA5882">ABC</h3>
    //       <br />
    //       <p>your login token is ${payload}</p>
    //     </div>
    // `,
    //   })
    //   .then((result: any) => console.log(result))
    //   .catch((err: any) => console.log(err));
  }

  return res.json({
    ok: true,
  });
}

export default withHandler({ method: "POST", handler, isPrivate: false });
