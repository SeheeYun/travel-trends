import { axisBottom, max, scaleBand, scaleLinear, select, stack } from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import styles from '../../styles/BarChart.module.css';

const KEYS = [
  '대중교통',
  '레저스포츠',
  '렌터카',
  '면세점',
  '문화서비스',
  '쇼핑',
  '숙박업',
  '여행업',
  '카지노',
  '항공사',
];
const COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#af52bf',
  '#3f51b5',
  '#2196f3',
  '#00bcd4',
  '#009688',
  '#8bc34a',
  '#cddc39',
];

function BarChart({ data }) {
  const sliceData = [
    ...data.slice(0, 6),
    ...data.slice(8, 10),
    ...data.slice(14, 17),
  ];
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    const svg = select(svgRef.current);

    const stackGenerator = stack().keys(KEYS);
    const layers = stackGenerator(sliceData);
    const extent = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1])),
    ];

    const xScale = scaleBand() //
      .domain(sliceData.map(d => d['지역']))
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
        return COLORS[layers.indexOf(layer)];
      })
      .selectAll('rect')
      .data(layer => layer)
      .join('rect')
      .attr('x', sequence => {
        return xScale(sequence.data['지역']);
      })
      .attr('width', xScale.bandwidth())
      .attr('y', sequence => yScale(sequence[1]))
      .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]));
  }, [data, dimensions]);

  return (
    <div className={styles.wrapper_1}>
      <div ref={wrapperRef} className={styles.wrapper_2}>
        <svg ref={svgRef} className={styles.svg}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div className={styles.legend}>
        {KEYS.map(key => (
          <div style={{ backgroundColor: COLORS[KEYS.indexOf(key)] }} key={key}>
            <p>{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
