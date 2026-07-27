import { NextResponse } from "next/server";
import Razorpay from "razorpay";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


export async function GET() {
  return NextResponse.json({
    message: "API is working",
  });
}


export async function POST(request: Request) {

  try {

    const text = await request.text();

    console.log("Received Body:", text);


    if (!text) {
      return NextResponse.json(
        {
          error: "No request body received"
        },
        {
          status: 400
        }
      );
    }


    const body = JSON.parse(text);


    const amount = body.amount;


    if (!amount) {
      return NextResponse.json(
        {
          error: "Amount is required"
        },
        {
          status: 400
        }
      );
    }


    const order = await razorpay.orders.create({

      amount: amount * 100,

      currency: "INR",

      receipt:
        "khushika_" + Date.now(),

    });


    return NextResponse.json({
      success: true,
      order,
    });


  }catch (error:any) {

  console.log("Razorpay Error:", error);

  return NextResponse.json(
    {
      success:false,
      error: error.message,
      fullError: error
    },
    {
      status:500
    }
  );

}

}