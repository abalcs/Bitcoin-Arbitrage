import React, { useEffect } from 'react';
import * as d3 from 'd3';
import datum from '../data/profit.csv';

let ScatterPlot = () => {

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
            .paddingOuter(0.2)

        const y = d3.scaleLinear()
            .range([HEIGHT, 0])

        const xAxisGroup = g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${HEIGHT})`)

        const yAxisGroup = g.append("g")
            .attr("class", "y axis")

        d3.csv(datum).then(data => {
            data.forEach(d => {
                d.revenue = Number(d.revenue)
                d.profit = Number(d.profit)
                d.prem = Number(d.prem)
                d.trades = Number(d.trades)
            })

            // d3.interval(() => {
            //     flag = !flag;
            //     const newData = flag ? data : data.slice(1)
            //     update(newData)
            // }, 2000)

            update(data)
        })

        function update(data) {
            const value = flag ? "profit" : "revenue"
            const t = d3.transition().duration(750)

            x.domain(data.map(d => d.prem))
            y.domain([0, d3.max(data, d => d.trades)])
            
            const xAxisCall = d3.axisBottom(x)
            g.append("g")
                xAxisGroup.transition(t).call(xAxisCall)
                .selectAll("text")
                .attr("y", "10")
                .attr("x", "-5")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-40)")
            
            const yAxisCall = d3.axisLeft(y)
                .ticks(5)
                .tickFormat(d => d + " trades")
                yAxisGroup.transition(t).call(yAxisCall)
            
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
            rects.transition(t)
                .attr("cy", d => y(d.trades))
                .attr("cx", (d) => x(d.prem) + (x.bandwidth() / 2))

            // Enter new elements present in new data
            rects.enter().append("circle")
                .attr("cx", (d) => x(d.prem))
                .attr("fill", "orange")
                .attr("cy", y(0))
                .attr("r", 5)
                .transition(t)
                    .attr("cy", d => y(d.trades))
                    .attr("height", d => HEIGHT - y(d.trades))

            const text = flag ? "Trades" : "Revenue ($)"
            yLabel.text(text)
        }
    }  

    useEffect(() => {
        buildPlot();
    }, [])
    
    return (
        <div className='scatterPlot'>
            <div id='scatterPlot'></div>
        </div>
    )
}

export default ScatterPlot;