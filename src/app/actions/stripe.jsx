"use server"
import { headers } from "next/headers";
const CURRENCY = "USD";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "../../../queries/courses";

export async function createCheckoutSession(data){
    const ui_mode = "hosted_page";
    const headerList = await headers();
    const courseId = typeof data?.get === "function" ? data.get("courseId") : data?.courseId;

    if (!courseId) {
        throw new Error("Course ID is required");
    }

    const course = await getCourseDetails(courseId);

    if(!course){
        throw new Error("Course not found");
    }
    const courseName = course?.title;
    const coursePrice = course?.price;  

    const origin = headerList.get("origin") || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "auto",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,

                    product_data: {
                        name:courseName,
                    },
                    unit_amount: formatAmountForStripe(coursePrice,CURRENCY)
                },
            },
        ],

        ...(ui_mode === "hosted_page" && {
            success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
            cancel_url: `${origin}/courses`
        }),

        ui_mode
    });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };

}

/// End Method 

export async function createPaymentIntent(data){
    const paymentIntent = await stripe.paymentIntents.create({
        amount: formatAmountForStripe(19,
            CURRENCY
        ),
        automatic_payment_methods: {enabled:true},
        currency: CURRENCY
    });
    return { client_secret: paymentIntent.client_secret };

}
/// End Method 