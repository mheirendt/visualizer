import React, { Component } from "react";
import * as d3 from 'd3';
import './visualizer.css';

class Visualizer extends Component {


    height = 0;
    width = 0
    frequencyData = this.getFrequency();
    svg = null;
    svgHeight = '300';
    svgWidth = '1200';
    barPadding = '1';
    colorScale = null;
    circleX = null;
    dots = null;
    timer = null;

    componentDidMount() {
        this.drawChart();
    }

    componentWillUnmount() {
        this.svg.remove();
        this.timer.stop();
    }


    drawChart() {
        var self = this;
        this.height = window.innerHeight;
        this.width = window.innerWidth;

        this.colorScale = d3.scaleLinear()
            .domain([0, 150])
            .range(["#2c7bb6", "#d7191c"]);

        this.circleX = d3.scaleLinear()
            .domain([0, self.frequencyData.length])
            .range([0, self.width]);

        this.svg = d3.select('#svg').append('svg')
            .attr('width', self.width)
            .attr('height', self.height);

        this.dots = this.svg.selectAll('circle')
            .data(self.frequencyData)
            .enter().append('circle')
            .attr('r', function (d) { return self.width / self.frequencyData.length / 2 + .3; })
            .attr('cx', function (d, i) { return self.circleX(i); })
            .attr('cy', function (d) { return self.height / 2 - d; })
            .attr('fill', function (d, i) { return self.colorScale(d); });


        this.timer = d3.timer(() => {
            self.frequencyData = this.getFrequency;
            //   analyser.getByteFrequencyData(frequencyData);

            this.svg.selectAll('circle')
                .data(self.frequencyData)
                .attr('cy', function (d) { return self.height / 2 - d; })
                .attr('fill', function (d, i) { return self.colorScale(d); });
        });
    }

    getFrequency() {
        var result = [];
        for (var i = 0; i < 500; i++) {
            // result.push(0);
            result.push(Math.floor(Math.random() * Math.floor(300)));
        }
        return result;
    }


    render() {
        return <div className="visualizer">
            <div id='svg'></div>
        </div>
    }
}

export default Visualizer;