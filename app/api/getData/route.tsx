'use server'
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const getDaysAgo = (days:number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};


export async function POST(req: Request) {

  const {projectId, period} = await req.json();

  if(projectId && period) {
   
    try{

      const lastPeriod = getDaysAgo(period)
      const previewsPeriod = getDaysAgo(period*2)

      let data = await prisma.page_views.findMany({
        where: {
          project_id: projectId,
          view_time: {gte: lastPeriod}
        }
      });

      let previousData = await prisma.page_views.findMany({
        where: {
          project_id: projectId,
          view_time: {
            gte: previewsPeriod,
            lte: lastPeriod
          }
        }
      });



      if(data && previousData) {
        return Response.json({data, previousData})
      } else {
        return Response.json({error: true, msg: "Data retrieval error."})
      }
    } catch (error) {
      console.log(error);
      
      return Response.json({error: true, msg: "Data retrieval error."})
    }


  } else {
    return Response.json({error: true, msg: "Inputs missing."})
  }

};