import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import chartData from '../src/data/data.json';
import MapChart from '../src/components/MapChart';

const useStyles = makeStyles(theme => ({
  section_1: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: 300,
    maxWidth: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section_1_title: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
      fontSize: theme.typography.h5.fontSize,
    },
    [theme.breakpoints.up('md')]: {
      width: 550,
      fontSize: theme.typography.h3.fontSize,
    },
  },
  section_2: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    height: 340,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>국내 여행 트렌드</title>
        <meta
          name="description"
          content="국내 여행 트렌드에 대한 데이터 시각화 사이트입니다."
        />
      </Head>
      <Container className={classes.section_1}>
        <Typography component="h1" className={classes.section_1_title}>
          훌훌 털고 떠날 그 날을 위해, 국내 여행 트렌드 살펴보기
        </Typography>
      </Container>
      <Container className={classes.section_2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} className={classes.paper}>
              <Typography>가장 많이 찾은 지역</Typography>
              <MapChart data={chartData} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} className={classes.paper}>
              <Typography>지역별 추천 여행지</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <Typography>서울의 더 많은 추천 여행지</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <Typography>지역별 관광 트렌드</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
