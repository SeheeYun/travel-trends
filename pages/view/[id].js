import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import HeadBanner from '../../src/components/headBanner';
import parse from 'html-react-parser';
import axios from 'axios';

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
    '& th': {
      minWidth: 90,
    },
    '& td': {
      color: theme.palette.primary.main,
    },
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  text: {
    margin: '16px 0',
  },
  table: {
    maxWidth: theme.breakpoints.values.sm,
    margin: '0 auto',
    marginBottom: 16,
  },
}));

const View = ({
  data: { title, firstimage, homepage, tel, telname, overview, addr1 },
}) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{title} - Travel Trends</title>
        <meta name="description" content={overview} />
      </Head>
      <HeadBanner image={firstimage} />
      <Container className={classes.container}>
        <section className={classes.section}>
          <Typography component="h2" variant="h5" className={classes.bold}>
            {title}
          </Typography>
          <Typography className={classes.text}>
            {overview && parse(overview)}
          </Typography>
          <TableContainer>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">주소</TableCell>
                  <TableCell align="right">{addr1}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">홈페이지</TableCell>
                  <TableCell align="right">
                    {homepage && parse(homepage)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">전화번호</TableCell>
                  <TableCell align="right">
                    {telname} {tel}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography component="p" variant="caption" align="right">
            데이터 출처: 한국관광공사
          </Typography>
        </section>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?';

  try {
    const data = await axios.get(url, {
      params: {
        serviceKey: key,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        defaultYN: 'Y',
        firstImageYN: 'Y',
        addrinfoYN: 'Y',
        mapinfoYN: 'Y',
        overviewYN: 'Y',
        contentId: context.params.id,
      },
    });
    if (data.data.response.header.resultCode === '0000') {
      return { props: { data: data.data.response.body.items.item } };
    } else {
      throw new Error(
        `공공데이터포털 에러 코드: ${data.data.response.header.resultCode}`
      );
    }
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}

export default View;
