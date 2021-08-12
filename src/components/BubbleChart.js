import { format, hierarchy, pack, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // height: 350,
    // [theme.breakpoints.down('xs')]: {
    //   height: 250,
    // },
    // marginTop: 16,
    // marginBottom: 36,
  },
  svg: {
    overflow: 'visible',
    width: '100%',
    height: '100%',
    // '& text': {
    //   fontSize: '14px',
    // },
  },
}));

let data = {
  children: [
    { id: 1, title: 'oneField', size: 150 },
    { id: 2, title: 'Teaser', size: 30 },
    { id: 3, title: 'Crazy', size: 70 },
  ],
};

function BubbleChart({}) {
  const classes = useStyles();

  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    const svg = select(svgRef.current);

    // const node = svg;
    // const svg = d3.select('svg'),
    //   width = +svg.attr('width'),
    //   height = +svg.attr('height');

    // const color = d3.scaleOrdinal(d3.schemeCategory20);

    const bubble = pack(data).size([width, height]).padding(1.5);
    const nodes = hierarchy(data).sum(function (d) {
      return d.id;
    });
    console.log(nodes);

    let getSelect = svg
      .selectAll('circle')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children;
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    getSelect
      .append('circle')
      .attr('id', function (d) {
        return d.data.id;
      })
      .attr('r', function (d) {
        return d.r;
      })
      .style('fill', function (d) {
        return 'red';
      });

    getSelect
      .append('text')
      .attr('dy', '.3em')
      .attr('font-size', '10px')
      .style('text-anchor', 'middle')
      .text(function (d) {
        return d.data.id + ': ' + d.data.title;
      });

    getSelect.append('title').text(function (d) {
      return d.data.id + '\n' + format(d.value);
    });
  }, [dimensions, data]);

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <svg ref={svgRef} className={classes.svg}></svg>
    </div>
  );
}

export default BubbleChart;
