'use server'
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(req: Request) {

  const {userId, projectId, owner} = await req.json();
  console.log(projectId);
  console.log(userId);
  
  if(userId && !projectId) {
    console.log("primeira");
   
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


  } else if(projectId && userId){
    console.log("segunda");
    
    try{
      
      let projects = await prisma.project.findMany({
        where: {
          project_id: projectId,
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
  } else if(owner){
    console.log("segunda");
    
    try{
      
      let projects = await prisma.project.findMany({
        where: {
          owner: owner
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