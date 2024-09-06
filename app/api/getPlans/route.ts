'use server'
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@utils/supabase/server');

const prisma = new PrismaClient();



export async function POST(req: Request) {
  //initialize supabase
  const supabase = createClient();
  //get the aurthenticated user
  const {data: {user} } = await supabase.auth.getUser();
  //destructuring body 
  const {userId} = await req.json();

  if(userId && (userId === user.id)) {
   
    try{
      
      let plan = await prisma.plan.findMany({
        where: {
          user_id: user.id
        }
      });

      if(plan.length > 0) {
        return Response.json({plan});
      } else {

        let plan = await prisma.plan.create({
          data: {
            user_id: user?.id,
            user_email: user?.email,
            type: "Hobby"
          }
        });
        return Response.json({plan});

      }
    } catch (error) {
      return Response.json({error: true, msg: "Plan creation error."})
    }


  } else {
    return Response.json({error: true, msg: "Inputs missing."})
  }

};