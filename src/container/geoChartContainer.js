import React, { memo, useEffect } from 'react';
import GeoChart from '../components/geoChart';
import GeoRank from '../components/geoRank';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import geoJson from '../data/getGeoJson';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../store/store';

const JEJU_NAME = geoJson.features[16].properties.name;
const JEJU_CODE = geoJson.features[16].properties.code;

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    borderRadius: '4px',
    marginBottom: 60,
    padding: '30px 20px',
    '&>div': {
      height: 400,
      [theme.breakpoints.down('sm')]: {
        height: 300,
      },
      '&>div': {
        height: '100%',
      },
    },
    '& h2': {
      marginBottom: 10,
    },
  },
}));

const GeoChartContainer = memo(() => {
  const classes = useStyles();
  const { items, onClick } = useStore();

  useEffect(() => {
    if (!(items.length === 0)) return;
    onClick(JEJU_NAME, JEJU_CODE);
  }, []);

  return (
    <section className={classes.section}>
      <Typography component="h2">가장 많이 찾은 지역</Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={6}>
          <GeoChart data={geoJson} onClick={onClick} />
        </Grid>
        <Grid item md={6}>
          <Hidden smDown>
            <GeoRank data={geoJson} />
          </Hidden>
        </Grid>
      </Grid>
      <Typography component="p" variant="caption" align="right">
        데이터 출처: 한국관광공사
      </Typography>
    </section>
  );
});

GeoChartContainer.displayName = 'GeoChartContainer';

export default GeoChartContainer;
