// components/BarChart.js
"use client"
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData, classN }) => {
  return (
    <div className={classN}>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              border:{
                display: false
              },
              ticks:{
                color: "#585159",
                font: {
                  size: 18,
                  weight: 700,
                  lineHeight:1.4
                }
              },
              grid: {
                display:false,
                drawOnChartArea:false,
                drawTicks: false
              }
            },
            y: {
              border:{
                display: false
              },
              ticks:{
                display: false
              },
              grid: {
                display:false,
                drawOnChartArea:false,
                drawTicks: false
              }   
            }
          },
          plugins: {
            tooltip: {
              enabled: false
            },
            title: {
              display: false
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;