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
  const {userId, projectId, owner} = await req.json();

  if(userId && (userId === user.id) && !projectId) {
   
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


  } else if(projectId && userId && (userId === user.id)){
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