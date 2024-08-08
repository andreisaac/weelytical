'use server'
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(req: Request) {

  const {userId} = await req.json();

  if(userId) {
   
    try{
      
      let projects = await prisma.project.findMany({
        where: {
          members: {
            array_contains: userId,
          },
        }
      });

      if(projects) {
        return Response.json({projects})
      } else {
        return Response.json({error: true, msg: "Project creation error."})
      }
    } catch (error) {
      return Response.json({error: true, msg: "Project creation error."})
    }


  } else {
    return Response.json({error: true, msg: "Inputs missing."})
  }

};