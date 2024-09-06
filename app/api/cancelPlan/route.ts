'use server'
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@utils/supabase/server');
const Stripe = require('stripe');

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  //initialize supabase
  const supabase = createClient();
  //get the aurthenticated user
  const {data: {user} } = await supabase.auth.getUser();
  //destructuring body 
  const {plan} = await req.json();

  if(plan && user?.id) {

    try {
      const subscription = await stripe.subscriptions.update(
        plan?.sub_id,
        { cancel_at_period_end: true }
      );

      let updatedPlan = await prisma.plan.updateMany({
        where: {
          user_id: user.id
        },
        data: {
          cancel_date: new Date(subscription.cancel_at* 1000)
        }
      });

      
      return Response.json({updatedPlan})

    } catch (err) {
      
      return Response.json({error: err, msg: "Plan cancelation error."})
    }


  } else {
    return Response.json({error: true, msg: "Inputs missing."})
  }

};