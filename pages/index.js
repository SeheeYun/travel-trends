import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Head from 'next/head';
import { feature } from 'topojson';
import geoChartData from '../src/data/skorea-provinces.json';
import barchartData from '../src/data/barchart-data.json';
import { useEffect, useState } from 'react';
import GeoChart from '../src/components/GeoChart';
import Items from '../src/components/Items';
import tourApi from '../src/service/tour-api';
import HeadBanner from '../src/components/HeadBanner';

const KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';
const geoJson = feature(
  geoChartData,
  geoChartData.objects[KOREA_PROVINCE_OBJECT]
);
const JEJU_NAME = geoJson.features[16].properties.name;
const JEJU_CODE = geoJson.features[16].properties.code;
const HEAD_IMAGE = '/images/tip250t009837.jpeg';
const HEAD_TITLE = '훌훌 털고 떠날 그 날을 위해, 국내 여행 트렌드 살펴보기';
const META_DESC = '국내 여행 트렌드에 대한 데이터 시각화 사이트입니다.';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: -80,
    '& h2': {
      marginBottom: 10,
    },
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    borderRadius: '4px',
    marginBottom: 60,
    padding: '30px 20px',
  },
  section_1: {
    '&>div': {
      height: 400,
    },
  },
  section_2: {
    position: 'relative',
    '&::before': {
      content: '""',
      borderTop: '0px solid transparent',
      borderLeft: '25px solid transparent',
      borderRight: '25px solid transparent',
      borderBottom: '25px solid #fff',
      position: 'absolute',
      left: '15%',
      top: -25,
    },
  },

  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function Home({}) {
  const classes = useStyles();
  const [province, setProvince] = useState(JEJU_NAME);
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
    getItems(JEJU_CODE);
  }, []);

  return (
    <>
      <Head>
        <title>Travel Trends</title>
        <meta name="description" content={META_DESC} />
      </Head>
      <HeadBanner image={HEAD_IMAGE} title={HEAD_TITLE} />
      <Container className={classes.container}>
        <section className={`${classes.section} ${classes.section_1}`}>
          <Typography component="h2">가장 많이 찾은 지역</Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <GeoChart data={geoJson} onClick={onClick} />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
        </section>
        <section className={`${classes.section} ${classes.section_2}`}>
          <Typography component="h2" className={classes.title}>
            <Typography component="span" className={classes.bold}>
              {province}
            </Typography>
            의 추천 여행지
          </Typography>
          <Items items={items} />
        </section>
      </Container>
    </>
  );
}

export default Home;
