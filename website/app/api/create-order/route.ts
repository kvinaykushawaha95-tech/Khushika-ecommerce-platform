import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET() {
  return NextResponse.json({
    message: "API is working",
  });
}

export async function POST(request: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const body = await request.json();

    const amount = body.amount;

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "khushika_" + Date.now(),
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Razorpay Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}