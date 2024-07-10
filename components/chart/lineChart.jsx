"use client"
import React from "react";
import {Chart} from "chart.js";
import "chart.js/auto";
import { Line } from "react-chartjs-2";


function LineChart({ chartData, classN }) {
  Chart.register(
    {
      id: 'uniqueid5', //typescript crashes without id
      afterDraw: function (chart, easing) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.tooltip._active[0];
          const ctx = chart.ctx;
          const x = activePoint.element.x;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'rgba(173, 168, 174, .7)';
          ctx.stroke();
          ctx.restore();
        }
      }
    })

  return (
    <div className={classN}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            x: {
              border:{
                display: true
              },
              ticks:{
                maxTicksLimit: 7,
                color: "#585159",
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  lineHeight:1.4
                }
              },
              grid: {
                display:true,
                drawOnChartArea:false,
                drawTicks: true
              }
            },
            y: {
              border:{
                display: false
              },
              ticks:{
                maxTicksLimit: 5,
                stepSize: 50,
                autoSkip: true,
                display: true,
                color: "#585159",
                padding: 10,
                font: {
                  size: 16,
                  weight: 300,
                  lineHeight:1.4
                }
              },
              grid: {
                display:true,
                drawOnChartArea:true,
                drawTicks: true
              }   
            }
          },
          plugins: {
            tooltip: {
              displayColors: false,
              enabled: true,
              intersect: false,
              mode:'index',
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
}
export default LineChart;