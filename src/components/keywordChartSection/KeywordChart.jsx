import { hierarchy, scaleLinear, select, treemap } from 'd3';
import React, { memo, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const MIN_COLOR = '#e3f2fd';
const MAX_COLOR = '#0d47a1';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    height: 400,
    marginBottom: 10,
    '& div': {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0 10px',
      textAlign: 'center',
      fontSize: '18px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },
  },
}));

const KeywordChart = memo(({ KeywordData }) => {
  const classes = useStyles();

  const wrapperRef = useRef();

  const reverseData = KeywordData.slice(0, 10).reverse();
  const data = {};
  data['children'] = reverseData.map(d => {
    return { name: d, value: reverseData.indexOf(d) + 2 };
  });

  useEffect(() => {
    const width = 100;
    const height = 100;
    const hierarchyy = hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    const treemapp = treemap().size([width, height]).padding(0);
    const root = treemapp(hierarchyy);

    const colorScale = scaleLinear()
      .domain([2, 11])
      .range([MIN_COLOR, MAX_COLOR]);

    const wrapper = select(wrapperRef.current);
    wrapper
      .selectAll('.div')
      .data(root.leaves())
      .join('div')
      .attr('class', 'div')
      .style('left', d => {
        return d.x0 + '%';
      })
      .style('top', d => {
        return d.y0 + '%';
      })
      .style('width', d => {
        return d.x1 - d.x0 + '%';
      })
      .style('height', d => {
        return d.y1 - d.y0 + '%';
      })
      .style('background', d => colorScale(d.value))
      .selectAll('p')
      .data(d => d)
      .join('p')
      .html(d => d.data.name)
      .style('color', d => (d.value > 8 ? 'white' : 'black'));
  }, [data]);

  return <div ref={wrapperRef} className={classes.wrapper} />;
});

KeywordChart.displayName = 'KeywordChart';

export default KeywordChart;
