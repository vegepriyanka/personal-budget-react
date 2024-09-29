import React  from "react";
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

function HomePage() {
    const [budgetData, setBudgetData] = React.useState([]);

    let data = []

    let margin = { top: 10, right: 30, bottom: 30, left: 40 };
    let width = 450;
    let height = 450;
    let svg;
    let colors;
    let radius = Math.min(width, height) / 2 - margin.left;

    let dataSource = {
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#ba68c8',
              '#81c784',
              '#64b5f6',
              '#ffb74d',
              '#4bc0c0',
              '#9966ff',
            ],
          },
        ],
        labels: [],
      };

    function createChart() {
        var ctx = document.getElementById('myChart');
        var pieChart = new Chart(ctx, {
          type: 'pie',
          data: dataSource,
        });
    }

     function createSvg() {
        svg = d3
          .select("#d3chart")
          .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .append("g")
          .attr(
            "transform",
            "translate(" + width / 2 + "," + height / 2 + ")"
          );
      }
    
      function createColors(data) {
        let index = 0;
        const defaultColors = ['#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#ba68c8',
          '#81c784',
          '#64b5f6',
          '#ffb74d',
          '#4bc0c0',
          '#9966ff'
      ]
        const colorsRange = [];
        data.forEach((element) => {
          if (element.color) colorsRange.push(element.color);
          else {
            colorsRange.push(defaultColors[index]);
            index++;
          }
        });
        colors = d3
          .scaleOrdinal()
          .domain(data.map((d) => d.value.toString()))
          .range(colorsRange);
      }
    
      function drawChart() {
        var pie = d3
          .pie()
          .sort(null)
          .value((d) => {
            return d.value;
          });
        var pieData = pie(data);
    
        var arc = d3
          .arc()
          .innerRadius(radius * 0.5) 
          .outerRadius(radius * 0.8);
    
        var outerArc = d3
          .arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);
    
        svg
          .selectAll("allSlices")
          .data(pieData)
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("fill", (d) => colors(d.data.value))
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
    
        svg
          .selectAll("allPolylines")
          .data(pieData)
          .enter()
          .append("polyline")
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr("points", (d) => {
            var posA = arc.centroid(d); 
            var posB = outerArc.centroid(d);
            var posC = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; 
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
            return [posA, posB, posC];
          });
    
        svg
          .selectAll("allLabels")
          .data(pieData)
          .enter()
          .append("text")
          .text((d) => {
            return d.data.label;
          })
          .attr("transform", (d) => {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", (d) => {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          });
      }


    React.useEffect(() => {
        axios.get('http://localhost:3001/budget').then((resp) => {
            console.log(resp);
            if(resp && resp.data && resp.data.myBudget){
                setBudgetData(resp.data.myBudget);
            }
            for (var i = 0; i < resp.data.myBudget.length; i++) {
                dataSource.datasets[0].data[i] = resp.data.myBudget[i].budget;
                dataSource.labels[i] = resp.data.myBudget[i].title;
            }
            createChart(dataSource);
            for(var i =0;i<dataSource.labels.length;i++){
                var obj = {
                  label : dataSource.labels[i],
                  value: dataSource.datasets[0].data[i]
                }
                data.push(obj);
            }
            console.log(data);
            createSvg();
            createColors(data);
            drawChart();
        }).catch((err) => {
            console.error(err);
        })
    },[]);
  return (
    <main className="center" id="main">
    
    <section className="page-area" id="page-area" aria-label="Section describes the features of the budget app">
            
        
        <article aria-label="article describes budget tracking feature">
            
            <h2>Stay on track</h2>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </article>

        <article>
            <h2>Alerts</h2>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </article>

        <article>
            <h2>Results</h2>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear...
                because they know it is all good and accounted for.
            </p>
        </article>

        <article>
            <h2>Free</h2>
            <p>
                This app is free!!! And you are the only one holding your data!
            </p>
        </article>

        <article>
            <h2>Stay on track</h2>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </article>

        <article>
            <h2>Alerts</h2>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </article>

        <article>
            <h2>Results</h2>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear...
                because they know it is all good and accounted for.
            </p>
        </article>

        <article>
            <h2>Chart</h2>
            <p>
                
                <canvas id="myChart" width="500" height="500" aria-label="My Personal Budget in chart format">
                </canvas>
            </p>
        </article>
        <div id="d3chart" style={{height: "500px"}} >
            <h2>D3 Chart</h2>
        </div>
    </section>
</main>
  );
}

export default HomePage;
