import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, toolId, toolName, tonWalletAddress } = await req.json();

    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: "Missing Telegram credentials" },
        { status: 500 }
      );
    }

    const message = `
📩 <b>New TON Wallet Access Request</b>
<b>Email:</b> ${email}
<b>Tool:</b> ${toolName || toolId}
<b>TON Wallet:</b> ${tonWalletAddress}
🕒 ${new Date().toLocaleString()}
    `;

    const telegramApi = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    await fetch(telegramApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
