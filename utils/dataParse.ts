    
import {pageView, chart} from "@utils/types";

export const parseToChartViews = (data:pageView[], period:number, label:string) => {
  const formatMonth = (month:number) => {
if((month+1)< 10) {
  return "0"+(month+1);
} else {
  return (month+1);
}
}

const getDateLabels = function(date?: boolean) {
  const d = new Date();
  const labelArr = [];
  let workDate = new Date();
  if(date){
    labelArr.unshift(workDate.toString());
  } else {
    labelArr.unshift((workDate.getDate())+"/"+formatMonth(workDate.getMonth()));
  }
  for(let i = 0; i < (period-1); i++){
    if((workDate.getDate()-1) < 1){
      if((workDate.getMonth()) == 2) {
        workDate.setMonth(1);
        workDate.setDate(28);
        if(date){
           labelArr.unshift(workDate.toString());
        } else {
           labelArr.unshift("28/02");
        }
      }
      else if((workDate.getMonth()) == 0){
        workDate.setMonth(11);
        workDate.setDate(31);
        if(date){
            labelArr.unshift(workDate.toString());
          } else {
            labelArr.unshift("31/12");
        }
      }
      else if(
        ((workDate.getMonth()-1) == 0) ||
        ((workDate.getMonth()-1) == 2) ||
        ((workDate.getMonth()-1) == 4) ||
        ((workDate.getMonth()-1) == 6) ||
        ((workDate.getMonth()-1) == 7) ||
        ((workDate.getMonth()-1) == 9)
      ) {
          workDate.setMonth((workDate.getMonth()-1));
          workDate.setDate(31);
          if(date){
            labelArr.unshift(workDate.toString());
          } else {
            labelArr.unshift("31/"+formatMonth(workDate.getMonth()));
            console.log("31/"+formatMonth(workDate.getMonth()))
          }
      } else {
        workDate.setMonth((workDate.getMonth()-1));
        workDate.setDate(30);
          if(date){
            labelArr.unshift(workDate.toString());
          } else {
            labelArr.unshift("30/"+ formatMonth(workDate.getMonth()));
          }
      }
    } else {
      workDate.setDate((workDate.getDate()-1));
      if(date){
            labelArr.unshift(workDate.toString());
          } else {
             labelArr.unshift((workDate.getDate())+"/"+formatMonth(workDate.getMonth()));
          }
    }
  }
  return labelArr;
};

//get the array of dd/mm strings
const labels = getDateLabels();


//initiate array by period
const viewsLabel:number[] = [];
for(let i = 0; i < period; i++){
viewsLabel.push(0);
}
//initiate array by period
let visitorsLabel: number[][] = [];
for(let i = 0; i < period; i++){
visitorsLabel.push([]);
}


//get the viewsLabel dates to use in the filter
const dateLabels = getDateLabels(true);
//Insert pageView by day in the viewsLabel
data.filter((item, index)=>{
const itemDate = new Date(item.view_time);
const itemDay = itemDate.getDate();

  dateLabels.map((it, id)=>{
    const idDate = new Date(it);
    const itDay = idDate.getDate();
    if(itDay == itemDay) {
    
      console.log(itemDay);
    if(label === "Page Views"){
      viewsLabel[id]++;
    } else {
      if(visitorsLabel[id].filter(visitor_id=>visitor_id===item.visitor_id).length>0) {
        
      } else {
        visitorsLabel[id].unshift(item.visitor_id);
      }
    }  
  }
    
  });



});

const visitorsLabelArr = () =>{
let labelss: number[] = [];
visitorsLabel.map((item, index) =>{
  labelss.push(item.length)
})
return labelss
}


const charte:chart = {
  label,
  labels,
  datasets: [
      {
      data: label === "Page Views" ? viewsLabel : visitorsLabelArr(),
      // you can set indiviual colors for each bar
      backgroundColor: "#F0DAC5",
      borderColor: "#FFAA5A",
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: "rgba(84, 55, 99, .7)",
      pointBorderWidth: 0,
      pointRadius: 0,
      }
  ]
}
return charte;

};


export const percentDif = (current:number, previous:number)=>{
  if (previous === 0) {
        return 100;
    }
    const difference = current - previous;
    const percentageDifference = (difference / previous) * 100;
    return Math.round(percentageDifference);
};

export const pageViewTotals = (arr:pageView[]) =>{
  const uniqueVisitors = new Set();
  const visitors = arr.filter(pageView => {
    const isDuplicate = uniqueVisitors.has(pageView.visitor_id);
    uniqueVisitors.add(pageView.visitor_id);
    return !isDuplicate;
  }).length;

  return {visitors, pageViews: arr.length}
}

export const onlineUsers = (arr:pageView[])=>{
  let d = new Date();
  d.setMinutes(d.getMinutes()-6);
  const uniqueVisitors = new Set();
  arr.map((item)=>{
    const itemDate = new Date(item.view_time);
    if(itemDate.getTime() > d.getTime()) {
      return uniqueVisitors.add(item.visitor_id);
    }
  })
  return uniqueVisitors.size;
}