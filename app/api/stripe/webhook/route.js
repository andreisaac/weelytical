import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {

    const body = await req.text();

    const signature = headers().get('stripe-signature');

    let data;
    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;
    
    try {
        switch (eventType) {
            case "invoice.payment_succeeded": {
                const subscription = event.data.object;
                const customerId = subscription.customer;
                const customer = await stripe.customers.retrieve(customerId);
                console.log(subscription);

                if (customer.email) {

                    let plan = await prisma.plan.updateMany({
                        where: { user_email: customer.email },
                        data: { type: "Pro Plan", sub_id: subscription.subscription }
                    });

                } else {
            
                    throw new Error('No user found');
                }



                // Extra: >>>>> send email to dashboard <<<<
                // Extra: >>>>> send email to dashboard <<<<
                // Extra: >>>>> send email to dashboard <<<<
                // Extra: >>>>> send email to dashboard <<<<
                break;
            }
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                
                const subscription = event.data.object;
                const customerId = subscription.customer;
                const customer = await stripe.customers.retrieve(customerId);
    
                
                if (customer.email) {

                    let plan = await prisma.plan.updateMany({
                        where: { user_email: customer.email },
                        data: { type: "Pro Plan", sub_id: subscription.subscription  }
                    });
        
                } else {
          
                    throw new Error('No user found');
                }



                // Extra: >>>>> send email to dashboard <<<<
                // Extra: >>>>> send email to dashboard <<<<
                // Extra: >>>>> send email to dashboard <<<<
                // Extra: >>>>> send email to dashboard <<<<

                break;
            }

            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = event.data.object;
                const customerId = subscription.customer;
                const customer = await stripe.customers.retrieve(customerId);
                
                if (customer.email) {
                    let plan = await prisma.plan.updateMany({
                        where: { user_email: customer.email },
                        data: { type: "Hobby", sub_id: null, cancel_date: null }
                    });

                } else {

                    throw new Error('No user found');
                }
            
                

                break;
            }

            default:
            // Unhandled event type
        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}