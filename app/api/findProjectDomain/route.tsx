'use server'
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const d = await req.json();
  const {domain} = d;

  
  if(domain) {
   
      const project = await prisma.project.findUnique({
        where: {
          domain: domain
        },
        select: {
          project_id: true
        },
      });
      
      if(project) {
        return Response.json({projectDomain: project.project_id})
      } else {
        return Response.json({error: true, msg: "No project found"})
      }

  } else {
    return Response.json({error: true, msg: "Domain required"})
  }

};