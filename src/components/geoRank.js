import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { memo, useState } from 'react';
import { max, scaleLinear } from 'd3';

const MEAN_COLOR = '#1e88e5';
const SELECT_COLOR = '#e0e0e0';
const TD_WIDTH = 200;
const TD_HEIGHT = 30;
const ROW_HEIGHT = 68;

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    '& span': {
      fontSize: '14px',
    },
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        〈 이전 페이지
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        다음 페이지 〉
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles(theme => ({
  root: {
    '& th': {
      minWidth: 120,
    },
    '& td': {
      '&>div': {
        position: 'relative',
        height: TD_HEIGHT,
        width: TD_WIDTH,
        backgroundColor: SELECT_COLOR,
        display: 'inline-block',
        '& p': {
          position: 'absolute',
          left: -32,
          top: -8,
        },
      },
    },
  },
}));

const GeoRank = memo(({ data }) => {
  const classes = useStyles2();
  const items = data.features
    .map(feature => feature.properties)
    .sort((a, b) => {
      return b.consumption - a.consumption;
    });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  const maxProp = max(items, item => item.consumption);
  const xScale = scaleLinear() //
    .domain([0, maxProp])
    .range([0, TD_WIDTH]);
  const textScale = scaleLinear() //
    .domain([0, maxProp])
    .range([0, 100]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Table>
      <TableBody className={classes.root}>
        {(rowsPerPage > 0
          ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : items
        ).map(item => (
          <TableRow key={item.name}>
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell align="right">
              <div>
                <p>{Math.ceil(textScale(item.consumption))}</p>
                <div
                  style={{
                    width: xScale(item.consumption),
                    height: '100%',
                    backgroundColor: MEAN_COLOR,
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableRow style={{ height: emptyRows * ROW_HEIGHT }}>
            <TableCell />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[]}
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
});

export default GeoRank;
