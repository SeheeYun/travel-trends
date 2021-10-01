import React, { memo, useState } from 'react';
import barChartJson from '../data/barchart-data.json';
import BarChart from '../components/barChart';
import BarChartCheckbox from '../components/barChartCheckbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const KEYS = {
  대중교통: true,
  레저스포츠: true,
  렌터카: true,
  면세점: true,
  문화서비스: true,
  쇼핑: true,
  숙박업: true,
  여행업: true,
  카지노: true,
  항공사: true,
};
const COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#af52bf',
  '#3f51b5',
  '#2196f3',
  '#00bcd4',
  '#009688',
  '#8bc34a',
  '#cddc39',
];

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    borderRadius: '4px',
    marginBottom: 60,
    padding: '30px 20px',
    '& h2': {
      marginBottom: 10,
    },
  },
}));

const BarChartContainer = memo(() => {
  const classes = useStyles();
  const [keys, setKeys] = useState(KEYS);

  const onChangeKeys = e => {
    setKeys(keys => {
      return { ...keys, [e.target.name]: e.target.checked };
    });
  };

  return (
    <section className={`${classes.section} ${classes.section_3}`}>
      <Typography component="h2">지역별 관광 트렌드</Typography>
      <BarChartCheckbox
        keys={keys}
        colors={COLORS}
        onChangeKeys={onChangeKeys}
      />
      <BarChart data={barChartJson} keys={keys} colors={COLORS} />
      <Typography component="p" variant="caption" align="right">
        데이터 출처: 한국관광공사
      </Typography>
    </section>
  );
});

BarChartContainer.displayName = 'BarChartContainer';

export default BarChartContainer;
