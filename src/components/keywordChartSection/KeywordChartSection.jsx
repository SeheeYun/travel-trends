import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import KeywordChart from './KeywordChart';

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

const KeywordChartSection = memo(({ data }) => {
  const classes = useStyles();

  return (
    <section className={`${classes.section} ${classes.section_3}`}>
      <Typography component="h2">국내여행 쇼핑 인기검색어</Typography>
      {data && <KeywordChart KeywordData={data} />}
      <Typography component="p" variant="caption" align="right">
        데이터 출처: 네이버 데이터랩
      </Typography>
    </section>
  );
});

KeywordChartSection.displayName = 'KeywordChartSection';

export default KeywordChartSection;
