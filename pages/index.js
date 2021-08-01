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
  container_1: {
    backgroundImage:
      "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/tip250t009837.jpeg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: 'white',
    height: 600,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
  },
  container_1_title: {
    paddingLeft: 20,
    width: 550,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.down('sm')]: {
      width: 440,
      fontSize: theme.typography.h4.fontSize,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
      fontSize: theme.typography.h5.fontSize,
    },
  },

  container_2: {
    margin: '-80px 0px 0px',
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
    '&::before': {
      content: '""',
      marginTop: -60,
      marginLeft: 80,
      borderTop: '0px solid transparent',
      borderLeft: '30px solid transparent',
      borderRight: '30px solid transparent',
      borderBottom: '30px solid #fff',
      position: 'absolute',
    },
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

      <Container maxWidth={false} className={classes.container_1}>
        <Typography component="h1" className={classes.container_1_title}>
          훌훌 털고 떠날 그 날을 위해, 국내 여행 트렌드 살펴보기
        </Typography>
      </Container>

      <Container className={classes.container_2}>
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

Home.defaultProps = {
  seoulName: geoJson.features[0].properties.name,
  seoulCode: geoJson.features[0].properties.code,
};

export default Home;
