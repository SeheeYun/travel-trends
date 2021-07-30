import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { feature } from 'topojson';
import geoChartData from '../src/data/skorea-provinces.json';
import barchartData from '../src/data/barchart-data.json';
import { useEffect, useState } from 'react';
import GeoChart from '../src/components/GeoChart';
import Items from '../src/components/Items';
import tourApi from '../src/service/tour-api';

const KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';
const geoJson = feature(
  geoChartData,
  geoChartData.objects[KOREA_PROVINCE_OBJECT]
);

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
  grid_1: {
    marginBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    height: 400,
  },
  paper_1: {
    background: 'linear-gradient(45deg, #FE6B8B98 30%, #FF8E5398 90%)',
    boxShadow: '0 3px 5px 3px rgba(255, 105, 135, .3)',
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function Home({ seoulName, seoulCode }) {
  const classes = useStyles();
  const [province, setProvince] = useState(seoulName);
  const [items, setItems] = useState([]);

  const getItems = async areaCode => {
    try {
      const data = await tourApi.getItemList(areaCode);
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = (name, areaCode) => {
    setProvince(name);
    getItems(areaCode);
  };

  useEffect(() => {
    getItems(seoulCode);
  }, []);

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
        <Grid container spacing={0} className={classes.grid_1}>
          <Grid item xs={12} sm={6}>
            <Typography>가장 많이 찾은 지역</Typography>
            <Paper elevation={3} className={classes.paper}>
              <GeoChart data={geoJson} onClick={onClick} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>지역별 추천 여행지</Typography>
            <Paper elevation={3} className={classes.paper}>
              <Items items={items.slice(0, 3)} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} className={styles.paper}>
            <Paper className={`${classes.paper} ${classes.paper_1}`}>
              <Typography>
                <Typography component="span" className={classes.bold}>
                  {province}
                </Typography>
                의 더 많은 추천 여행지
              </Typography>
              <Items items={items.slice(3)} display="row" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography>지역별 관광 트렌드</Typography>
            <Paper elevation={3} className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Home.defaultProps = {
  seoulName: geoJson.features[0].properties.name,
  seoulCode: geoJson.features[0].properties.code,
};

export default Home;
