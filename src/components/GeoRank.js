import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef } from 'react';
import { max, scaleLinear, select } from 'd3';

const MEAN_COLOR = '#1e88e5';
const SELECT_COLOR = '#e0e0e0';
const TD_WIDTH = 250;
const TD_HEIGHT = 60;

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: theme.breakpoints.values.sm,
    margin: '0 auto',
    marginBottom: 16,
    '& th': {
      minWidth: 120,
    },
    '& td': {
      height: TD_HEIGHT,
      width: TD_WIDTH,
      position: 'relative',
    },
    '& svg': {
      width: '100%',
      height: '100%',
      backgroundColor: SELECT_COLOR,
    },
    '& p': {
      position: 'absolute',
      left: -16,
      top: 6,
    },
  },
}));

const GeoRank = ({ items }) => {
  const classes = useStyles();
  const wrapperRef = useRef();

  useEffect(() => {
    const maxProp = max(items, item => item.consumption);

    const xScale = scaleLinear() //
      .domain([0, maxProp])
      .range([0, TD_WIDTH]);
    const textScale = scaleLinear().domain([0, maxProp]).range([0, 100]);

    const wrapper = select(wrapperRef.current);
    wrapper
      .selectAll('svg')
      .data(items)
      .join('svg')
      .append('rect')
      .attr('height', '100%')
      .attr('width', item => xScale(item.consumption))
      .attr('fill', MEAN_COLOR);

    wrapper
      .selectAll('p')
      .data(items)
      .join('svg')
      .append('text')
      .text(item => Math.ceil(textScale(item.consumption)))
      .attr('fill', 'black');
  }, []);

  return (
    <Table className={classes.table}>
      <TableBody ref={wrapperRef}>
        {items.map(item => (
          <TableRow key={item.name}>
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell align="right">
              <p></p>
              <svg></svg>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GeoRank;
