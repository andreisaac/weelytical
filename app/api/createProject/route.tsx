'use server'
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const d = await req.json();
  const {domain, projectName, owner, type} = d;

  
  if(domain && projectName && owner && type) {
   
    let project = await prisma.project.create({
      data: { name: projectName, domain, owner, type, valid: true, members: [owner] },
      select: { project_id: true },
    });
      
      if(project) {
        return Response.json({projectDomain: project.project_id})
      } else {
        return Response.json({error: true, msg: "Project creation error."})
      }

  } else {
    return Response.json({error: true, msg: "Inputs missing."})
  }

};