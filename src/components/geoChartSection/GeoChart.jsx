import { geoMercator, geoPath, max, mean, min, scaleLinear, select } from 'd3';
import React, { memo, useEffect, useRef } from 'react';
import useResizeObserver from '../../hooks/useResizeObserver';
import styles from '../../../styles/GeoChart.module.css';

const MIN_COLOR = '#bbdefb';
const MEAN_COLOR = '#1e88e5';
const MAX_COLOR = '#0d47a1';
const SELECT_COLOR = '#e0e0e0';

const GeoChart = memo(({ data, onClick }) => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const minProp = min(
      data.features,
      feature => feature.properties.consumption
    );
    const maxProp = max(
      data.features,
      feature => feature.properties.consumption
    );
    const meanProp = mean(
      data.features,
      feature => feature.properties.consumption
    );
    const colorScale = scaleLinear()
      .domain([minProp, meanProp, maxProp])
      .range([MIN_COLOR, MEAN_COLOR, MAX_COLOR]);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator().fitExtent(
      [
        [30, 0],
        [width, height],
      ],
      data
    );
    const pathGenerator = geoPath().projection(projection);

    const svg = select(svgRef.current);
    const wrapper = select(wrapperRef.current);

    const handleOnClick = e => {
      const i = svg.selectAll('.province').nodes().indexOf(e.target);
      svg.selectAll('.province').each(function (d, j) {
        if (j === i) {
          select(this).transition().style('fill', SELECT_COLOR);
        } else {
          select(this).transition().style('fill', this.fill);
        }
      });
    };

    const tooltipScale = scaleLinear()
      .domain([minProp, maxProp])
      .range([0, 100]);
    const handleMouseEnter = (e, d) => {
      wrapper
        .selectAll('.tooltip') //
        .data([d.properties])
        .join('div')
        .attr('class', 'tooltip')
        .html(
          `${d.properties.name}<br />${Math.ceil(
            tooltipScale(d.properties.consumption)
          )}`
        )
        .style('opacity', 1)
        .style('transform', `translate(${e.offsetX}px,${e.offsetY}px)`);
    };

    svg
      .selectAll('.province')
      .data(data.features)
      .join('path')
      .on('click', (e, feature) => {
        onClick(feature.properties.name, feature.properties.code);
        handleOnClick(e);
      })
      .on('mousemove', handleMouseEnter)
      .on('mouseleave', () => wrapper.select('.tooltip').style('opacity', 0))
      .attr('class', 'province')
      .transition()
      .attr('fill', feature => colorScale(feature.properties.consumption))
      .attr('d', feature => pathGenerator(feature));
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <svg ref={svgRef} className={styles.svg}></svg>
    </div>
  );
});

GeoChart.displayName = 'GeoChart';

export default GeoChart;
