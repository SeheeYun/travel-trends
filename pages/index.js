import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Head from 'next/head';
import { useEffect } from 'react';
import Items from '../src/components/Items';
import tourApi from '../src/service/tour-api';
import HeadBanner from '../src/components/HeadBanner';
import { useStore } from '../src/store/store';
import geoJson from '../src/data/getGeoJson';
import GeoChart from '../src/components/GeoChart';
import GeoRank from '../src/components/GeoRank';
import barChartJson from '../src/data/barchart-data.json';
import BarChart from '../src/components/BarChart';

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
      [theme.breakpoints.down('sm')]: {
        height: 300,
      },
      '&>div': {
        height: '100%',
      },
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
  section_3: {
    '&>div': {
      height: 400,
      // [theme.breakpoints.down('sm')]: {
      //   height: 300,
      // },
    },
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function Home({}) {
  const classes = useStyles();
  const { province, items, onSetItems, onSetProvince } = useStore();
  const rankItems = geoJson.features
    .map(feature => feature.properties)
    .sort((a, b) => {
      return b.consumption - a.consumption;
    });

  const getItems = async areaCode => {
    try {
      const data = await tourApi.getItemList(areaCode);
      onSetItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = (name, areaCode) => {
    onSetProvince(name);
    getItems(areaCode);
  };

  useEffect(() => {
    if (!(items.length === 0)) return;
    onClick(JEJU_NAME, JEJU_CODE);
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
          <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={12} md={6}>
              <GeoChart data={geoJson} onClick={onClick} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Hidden smDown>
                <GeoRank items={rankItems} />
              </Hidden>
            </Grid>
          </Grid>
          <Typography component="p" variant="caption" align="right">
            데이터 출처: 한국관광공사
          </Typography>
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
        <section className={`${classes.section} ${classes.section_3}`}>
          <Typography component="h2">가장 많이 찾은 지역</Typography>
          <BarChart data={barChartJson} />
          <Typography component="p" variant="caption" align="right">
            데이터 출처: 한국관광공사
          </Typography>
        </section>
      </Container>
    </>
  );
}

export default Home;
