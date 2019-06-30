import React, { Component } from "react";
import * as d3 from 'd3';
import './visualizer.css';
import { of, Subject, BehaviorSubject } from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

class Visualizer extends Component {

    unsubscribe = new Subject();
    dimensionSubject = null;
    frequencyData = this.getFrequency();
    svg = null;
    width = 0;
    height = 0;
    colorScale = null;
    circleX = null;
    dots = null;
    timer = null;

    componentDidMount() {
        this.dimensionSubject = new BehaviorSubject({
            width: window.innerWidth,
            height: window.innerHeight
        })
        this.drawChart();
        this.dimensionSubject.pipe(
            takeUntil(this.unsubscribe),
            debounceTime(500)
        ).subscribe(() => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.updateChartDimensions();
        });
        window.addEventListener("resize", () => this.dimensionSubject.next());
    }

    componentWillUnmount() {
        this.svg.remove();
        this.timer.stop();
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.updateDimensions.complete();
        window.removeEventListener('resize', this.updateDimensions);
    }

    drawChart() {
        var self = this;
        self.colorScale = d3.scaleLinear()
            .domain([0, 150])
            .range(["#2c7bb6", "#d7191c"]);

        self.circleX = d3.scaleLinear()
            .domain([0, self.frequencyData.length])
            .range([0, self.width]);

        self.svg = d3.select('#svg').append('svg')
            .attr('width', self.width)
            .attr('height', self.height);

        self.dots = self.svg.selectAll('circle')
            .data(self.frequencyData)
            .enter().append('circle')
            .attr('r', function (d) { return self.width / self.frequencyData.length / 2 + .3; })
            .attr('cx', function (d, i) { return self.circleX(i); })
            .attr('cy', function (d) { return self.height / 2 - d; })
            .attr('fill', function (d, i) { return self.colorScale(d); });


        self.timer = d3.timer(() => {
            self.frequencyData = this.getFrequency();

            self.svg.selectAll('circle')
                .data(self.frequencyData)
                .attr('cy', function (d) { return self.height / 2 - d; })
                .attr('fill', function (d, i) { return self.colorScale(d); });
        });
    }

    updateChartDimensions() {
        this.svg.remove();
        this.drawChart();
    }

    getFrequency() {
        var result = [];
        for (var i = 0; i < 500; i++) {
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