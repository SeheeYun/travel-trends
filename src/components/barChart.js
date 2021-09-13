import { axisBottom, max, scaleBand, scaleLinear, select, stack } from 'd3';
import React, { memo, useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: 350,
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
    marginTop: 16,
    marginBottom: 36,
  },
  svg: {
    overflow: 'visible',
    '& text': {
      fontSize: '14px',
    },
  },
}));

const BarChart = memo(({ data, keys, colors }) => {
  const classes = useStyles();

  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    const svg = select(svgRef.current);

    const keysArr = Object.keys(keys).filter(key => keys[key] === true);
    const stackGenerator = stack().keys(keysArr);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1])),
    ];

    const xScale = scaleBand() //
      .domain(data.map(d => d['지역']))
      .range([0, width])
      .padding(0.25);
    const yScale = scaleLinear() //
      .domain(extent)
      .range([height, 0]);

    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', layer => {
        return colors[Object.keys(keys).indexOf(layer.key)];
      })
      .selectAll('rect')
      .data(layer => layer)
      .join('rect')
      .attr('x', sequence => {
        return xScale(sequence.data['지역']);
      })
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('y', sequence => yScale(sequence[1]))
      .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]));
  }, [dimensions, keys]);

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
});
export default BarChart;
