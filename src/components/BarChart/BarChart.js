import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as d3tip from "d3-v6-tip";

const dateFormatter = require('../../utils/dateFormat')

const BarChart = ({data}) => {
 
    let buildChart = () => {
        const MARGIN = { LEFT: 90, RIGHT: 10, TOP: 40, BOTTOM: 100 }
        const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
        const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

        d3.select('#barChart').selectAll('svg').remove()
        const svg = d3.select("#barChart")
        .append("svg") 
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

        const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

        const tip = d3tip.tip()
        .attr('class', 'd3-tip')
        .html((e, d) => {
            let text = `<strong>Profit:</strong> <span style='color:lightblue;float:right'>${d.profit}</span><br>`
            text += `<strong>Spread:</strong> <span style='color:lightblue;float:right'>${d.prem}%</span><br>`
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
        .text("Date")

        // Y label
        g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (HEIGHT / 2))
        .attr("y", -70)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Sats Profit ($)")

        // ***--- KEEPING THIS HERE FOR FUTURE CSV TESTING ---***
        // d3.csv(datum).then(data => {
            // const t = d3.transition().duration(750)

        //     data.forEach(d => {
        //     d.profit = Number(d.profit)
        // })
        const x = d3.scaleBand()
            .domain(data.map(d => dateFormatter(d.date)))
            .range([0, WIDTH])
            .paddingInner(0.3)
            .paddingOuter(0.2)
        
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.profit)])
            .range([HEIGHT, 0])

        const xAxisCall = d3.axisBottom(x)
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")

        const yAxisCall = d3.axisLeft(y)
            .ticks(5)
            .tickFormat(d => d + " sats")
        g.append("g")
            .attr("class", "y axis")
            .call(yAxisCall)

        const rects = g.selectAll("rect")
            .data(data)
        
        rects.enter().append("rect")
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .attr("y", d => y(d.profit))
            .attr("x", (d) => x(dateFormatter(d.date)))
            .attr("width", x.bandwidth)
            .attr("height", d => HEIGHT - y(d.profit))
            .attr("fill", "orange")
        // })
    }
   
    useEffect(() => {
        buildChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    
    return (
        <div className='barChart'>
            <h2>Bar Chart</h2>
            <div id='barChart'></div>
            <p><em>Provides historical look at daily profit.  Tool tips include the number of trades and the average spread on the given day.</em></p>
        </div>
    )
}

export default BarChart;