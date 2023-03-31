import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as d3tip from "d3-v6-tip";

const dateFormatter = require('../../utils/dateFormat');
// const dotSize = require('../../utils/dotSize');

let ScatterPlot = ({data}) => {
    let buildPlot = () => {
        const MARGIN = { LEFT: 90, RIGHT: 10, TOP: 40, BOTTOM: 100 }
        const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
        const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

        let flag = true;

        d3.select('#scatterPlot').selectAll('svg').remove()
        const svg = d3.select("#scatterPlot")
        .append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

        const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

        const tip = d3tip.tip()
        .attr('class', 'd3-tip')
        .html((e, d) => {
            let text = `<strong>Date:</strong> <span style='color:lightblue;float:right'>${dateFormatter(d.date)}</span><br>`
            text += `<strong>Spread:</strong> <span style='color:lightblue;float:right'>${d.prem}</span><br>`
            text += `<strong>Trades:</strong> <span style='color:lightblue;float:right'>${d.trades}</span><br>`
            return text
        })
        g.call(tip)

        // X label
        g.append("text")
        .attr("class", "x axis-label")
        .attr("x", WIDTH / 2.25)
        .attr("y", HEIGHT + 70)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Premium")

        // Y label
        const yLabel = g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (HEIGHT / 2))
        .attr("y", -70)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")

        const x = d3.scaleBand()
            .range([0, WIDTH])
            .paddingInner(0.3)
            .paddingOuter(0.7)

        const y = d3.scaleLinear()
            .range([HEIGHT, 0])

        const xAxisGroup = g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${HEIGHT})`)

        const yAxisGroup = g.append("g")
            .attr("class", "y axis")

            // let orderedPrem = data.prem.sort()
            // console.log(orderedPrem)
            // d3.interval(() => {
            //     flag = !flag;
            //     const newData = flag ? data : data.slice(1)
            //     update(newData)
            // }, 2000)
           
            // update(data)
        // })
        
        data = data.map((d) => {
            return {
                date: d.date,
                profit: d.profit,
                prem: Number(d.prem).toFixed(2) + '%',
                trades: d.trades
            }
        })

        // function update(data) {
            // const value = flag ? "profit" : "revenue"
            const t = d3.transition().duration(750)
            const spread = [];

            for(let i = 0; i < data.length; i++) {
                spread.push((data[i].prem))
            }

            spread.sort()
            
            x.domain(spread.map(d => d))
            y.domain([0, d3.max(data, d => d.trades)])
            
            const xAxisCall = d3.axisBottom(x)
            g.append("g")
                xAxisGroup.transition(t).call(xAxisCall)
                // xAxisGroup.call(xAxisCall)
                .selectAll("text")
                .attr("y", "10")
                .attr("x", "-5")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-40)")
            
            const yAxisCall = d3.axisLeft(y)
                .ticks(5)
                .tickFormat(d => d + " trades")
                yAxisGroup.transition(t).call(yAxisCall)
                // yAxisGroup.call(yAxisCall)
            
            //Join new data with old elements
            const rects = g.selectAll("circle")
                .data(data, d => d.prem)
            //Exit old elements not present in new data
            rects.exit()
                .attr("fill", "red")
                .transition(t)
                    .attr("height", 0)
                    .attr("cy", y(0))
                    .remove()

            //Update old elements present in new data
            // rects.transition(t)
            //     .attr("cy", d => y(d.trades))
            //     .attr("cx", (d) => x(d.prem) + (x.bandwidth() / 2))

            // Enter new elements present in new data
            rects.enter().append("circle")
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .attr("cx", (d) => x(d.prem))
                .attr("fill", "orange")
                .attr("cy", y(0))
                .attr("r", 5)
                .transition(t)
                    .attr("cy", d => y(d.trades))
                    .attr("height", d => HEIGHT - y(d.trades))

            const text = flag ? "Trades" : "Revenue ($)"
            yLabel.text(text)
        // }
        // update(data)
    }  

    useEffect(() => {
        buildPlot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    
    return (
        <div className='scatterPlot'>
            <h2>SCATTER PLOT</h2>
            <div id='scatterPlot'></div>
            <p><em>Compares the daily spread average to the total number of trades on the given day.  Larger dots indicate higher profit totals for the day.</em></p>
        </div>
    )
}

export default ScatterPlot;