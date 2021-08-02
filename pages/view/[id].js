import Head from 'next/head';
import { useRouter } from 'next/router';
import tourApi from '../../src/service/tour-api';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import HeadBanner from '../../src/components/HeadBanner';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: -80,
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    borderRadius: '4px',
    marginBottom: 60,
    padding: '30px 20px',
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const View = ({
  data: { title, firstimage, homepage, tel, telname, overview },
}) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{title} - Travel Trends</title>
        <meta name="description" content={'asd'} />
      </Head>
      <HeadBanner image={firstimage} />
      <Container className={classes.container}>
        <section className={classes.section}>
          <Typography component="h2" variant="h5" className={classes.bold}>
            {title}
          </Typography>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableRow>
                <TableCell component="th">주소</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">홈페이지</TableCell>
                <TableCell align="right">{homepage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">전화번호</TableCell>
                <TableCell align="right">
                  {telname} {tel}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <Typography className={classes.text}>{overview}</Typography>
        </section>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  const data = await tourApi.getItem(context.params.id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data },
  };
}

export default View;
