import { geoMercator, geoPath, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import { feature } from 'topojson';
import styles from '../../styles/Geochart.module.css';

const KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';

function Geochart({ data }) {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const geoJson = feature(data, data.objects[KOREA_PROVINCE_OBJECT]);
    const arr = geoJson.features;
    const res = arr.map(item => {
      return item.properties;
    });
    console.table(res);

    const svg = select(svgRef.current);

    // const min =

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator().fitSize([width, height], geoJson);
    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll('.province')
      .data(geoJson.features)
      .join('path')
      .attr('class', 'province')
      .attr('d', feature => pathGenerator(feature));
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <svg ref={svgRef} className={styles.svg}></svg>
    </div>
  );
}

export default Geochart;
