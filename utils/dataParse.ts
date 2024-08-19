    
import {pageView, chart} from "@utils/types";

const formatDate = (n:number) => {
  if(n< 10) {
    return "0"+n;
  } else {
    return n;
  }
}

export const parseToChartViews = (data:pageView[], period:number, label:string) => {
  
if(period > 1){
//This functions returns the array with the days or date to filter
const getDateLabels = function(date?: boolean) {
  const labelArr = [];
  let workDate = new Date();
  //insert the first elements to the array
  //then the for loopt will insert the remaining values
  if(date){
    labelArr.unshift(workDate.toString());
  } else {
    labelArr.unshift((workDate.getDate())+"/"+formatDate(workDate.getMonth()+1));
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
            labelArr.unshift("31/"+formatDate(workDate.getMonth()+1));
            console.log("31/"+formatDate(workDate.getMonth()+1))
          }
      } else {
        workDate.setMonth((workDate.getMonth()-1));
        workDate.setDate(30);
          if(date){
            labelArr.unshift(workDate.toString());
          } else {
            labelArr.unshift("30/"+ formatDate(workDate.getMonth()+1));
          }
      }
    } else {
      workDate.setDate((workDate.getDate()-1));
      if(date){
            labelArr.unshift(workDate.toString());
          } else {
             labelArr.unshift(formatDate(workDate.getDate())+"/"+formatDate(workDate.getMonth()+1));
          }
    }
  }
  return labelArr;
};

//get the array of dd/mm strings
const labels = getDateLabels();

//function to retrieve the array with views per date to use in the charte obj
const filterData = (visitors:boolean) => {

  const arr:pageView[][] = [];
  const finalArr:number[] = [];
  const uniqueVisitor = new Set();

  data.filter((item)=>{
    const itemDate = new Date(item.view_time);
    const itemDay = itemDate.getDate();
    //get the viewsLabel dates to use in the filter
    getDateLabels(true).map((it, index)=>{
      const idDate = new Date(it);
      const itDay = idDate.getDate();
      //If the array index doesnt exist, add and empty array
      !arr[index] ?  arr[index] = [] : null;
      //If needed to filter by visitor use the unique visitor Set 
      if(visitors) {
        if(!uniqueVisitor.has(item.visitor_id)){
          if(itemDay === itDay) {
            arr[index].push(item);
            uniqueVisitor.add(item.visitor_id)
          }
        }
      } else {
        if(itemDay === itDay) {
          arr[index].push(item);
        }
      } 
    });
  });

  arr.map((item, index)=>{
    finalArr[index] = item.length;
  });

  console.log(visitors);
  
  return finalArr;
}

//Insert pageView by day in the viewsLabel


const charte:chart = {
  label,
  labels,
  datasets: [
      {
      data: label === "Page Views" ? filterData(false) : filterData(true),
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

}else{

  const getLastDayLabels = () => {
    let workDate = new Date();
    const labelArr = []
    labelArr.unshift(formatDate(workDate.getHours())+":00");
    for(let i = 0; i < 24; i++){
      workDate.setHours(workDate.getHours()-1)
      labelArr.unshift(formatDate(workDate.getHours())+":00");
    }
    return labelArr;
  };
  
  const getLastDayDates = () => {
    let workDate = new Date();
    const labelArr = []
    labelArr.unshift(workDate.toString());
    for(let i = 0; i < 24; i++){
      workDate.setHours(workDate.getHours()-1)
      labelArr.unshift(workDate.toString());
    }
    return labelArr;
  }
  
  
  const filterData = (visitors:boolean) => {
    const arr:pageView[][] = [];
    const finalArr:number[] = [];
    const uniqueVisitor = new Set();
    const day = 1000*60*60*23;
    data.map((item)=>{
      const itemDate = new Date(item.view_time);
      const itemHour = itemDate.getHours();
      const itemTime = itemDate.getTime();
      getLastDayDates().map((it, index)=>{
        const itDate = new Date(it);
        const itHour = itDate.getHours();
        const itTime= itDate.getTime();
        const diffTime = Math.abs(itemTime-itTime);
        //If the array index doesnt exist, add and empty array
        !arr[index] ?  arr[index] = [] : null;
        //If needed to filter by visitor use the unique visitor Set 
        if(visitors){
          if(!uniqueVisitor.has(item.visitor_id)) {
            if((itemHour == itHour) && (diffTime < day)){
              arr[index].push(item);
              uniqueVisitor.add(item.visitor_id)
            }
          }
        } else {
          //if visitors false add the pageView 
          if((itemHour == itHour) && (diffTime < day)){
              arr[index].push(item);
          }
        }
      })
    })
    arr.map((item, index)=>{
      finalArr[index] = item.length;
    });
  
    console.log(visitors);
    
    return finalArr;
  };
  
  
  
  
  const charte:chart = {
    label,
    labels: getLastDayLabels(),
    datasets: [
        {
        data: label === "Page Views" ? filterData(false) : filterData(true),
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
}


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


export const pageCount = (data:pageView[]) => {
  const visitCounts:{[key:string]: number} = {};

  data.forEach(item => {
      if (visitCounts[item.page]) {
          visitCounts[item.page]++;
      } else {
          visitCounts[item.page] = 1;
      }
  });

  const result = Object.keys(visitCounts).map(page => ({
      label: page,
      total: visitCounts[page]
  }));

  // Sort by total count in descending order
  result.sort((a, b) => b.total - a.total);

  return result;
};

export const referrerCount = (data:pageView[]) => {
  const referrerCounts:{[key:string]: number} = {};

  data.forEach(item => {
      if (referrerCounts[item.referrer]) {
          referrerCounts[item.referrer]++;
      } else {
          referrerCounts[item.referrer] = 1;
      }
  });

  const result = Object.keys(referrerCounts).map(referrer => ({
      label: referrer,
      total: referrerCounts[referrer],
      referrer: true
  }));

  // Sort by total count in descending order
  result.sort((a, b) => b.total - a.total);

  return result;
};

import cData from "@utils/countries/countryData.json";

export const countryCount = (data:pageView[]) => {
  const countriesCounts:{[key:string ]: number} = {};
  const visitors = new Set();

  data.forEach(item => {
    if(!visitors.has(item.visitor_id)) {
      visitors.add(item.visitor_id)
      if (countriesCounts[item.countries?.name||"country"]) {
        countriesCounts[item.countries?.name||"country"]++;
      } else {
          countriesCounts[item.countries?.name||"country"] = 1;
      }
    }
      
  });

  const result = Object.keys(countriesCounts).map(countries => ({
      label: countries,
      total: countriesCounts[countries]
  }));

  // Sort by total count in descending order
  result.sort((a, b) => b.total - a.total);

  let finalArr:{label: string, flag: string, total: number}[] = [];
  result.map((item,index)=>{
    cData.map((cItem, cIndex)=>{
      if(item.label === cItem.ISO2) {
        finalArr.unshift({label: cItem.name, total:item.total, flag: cItem.SVG})    
      }
    })
  })

  return finalArr;
};

export const systemCount = (data:pageView[]) => {
  const systemCounts:{[key:string ]: number} = {};
  const visitors = new Set();

  data.forEach(item => {
    if(!visitors.has(item.visitor_id)) {
      visitors.add(item.visitor_id)
      if (systemCounts[item.operating_systems?.name||"Windows"]) {
        systemCounts[item.operating_systems?.name||"Windows"]++;
      } else {
          systemCounts[item.operating_systems?.name||"Windows"] = 1;
      }
    }
      
  });

  const result = Object.keys(systemCounts).map(system => ({
      label: system,
      total: systemCounts[system]
  }));

  // Sort by total count in descending order
  result.sort((a, b) => b.total - a.total);

  return result;
};

export const browserCount = (data:pageView[]) => {
  const browserCounts:{[key:string ]: number} = {};
  const visitors = new Set();

  data.forEach(item => {
    if(!visitors.has(item.visitor_id)) {
      visitors.add(item.visitor_id)
      if (browserCounts[item.browsers?.name||"Windows"]) {
        browserCounts[item.browsers?.name||"Windows"]++;
      } else {
          browserCounts[item.browsers?.name||"Windows"] = 1;
      }
    }
      
  });

  const result = Object.keys(browserCounts).map(browser => ({
      label: browser,
      total: browserCounts[browser]
  }));

  // Sort by total count in descending order
  result.sort((a, b) => b.total - a.total);

  return result;
};

export const getFavicon = (referrer:string) => {
    try{

      let baseDomain = new URL(referrer).origin;
      let faviconUrl = `${baseDomain}/favicon.ico`;
  
      return faviconUrl;
    } catch (error) {
      return ""
    } 

}