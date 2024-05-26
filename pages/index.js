import Container from '@material-ui/core/Container';
import Head from 'next/head';
import HeadBanner from '../src/components/HeadBanner';
import webScraping from '../src/service/web_scraping';
import GeoChartSection from '../src/components/geoChartSection/GeoChartSection';
import ItemsSection from '../src/components/itemsSection/ItemsSection';
import KeywordChartSection from '../src/components/keywordChartSection/KeywordChartSection';

const HEAD_IMAGE = '/images/tip250t009837.jpeg';
const HEAD_TITLE = '훌훌 털고 떠날 그 날을 위해, 국내 여행 트렌드 살펴보기';
const META_DESC = '국내 여행 트렌드에 대한 데이터 시각화 사이트입니다.';

const Home = ({ data }) => {
  return (
    <>
      <Head>
        <title>Travel Trends</title>
        <meta name="description" content={META_DESC} />
      </Head>
      <HeadBanner image={HEAD_IMAGE} title={HEAD_TITLE} />
      <Container style={{ marginTop: -80 }}>
        <GeoChartSection />
        <ItemsSection />
        <KeywordChartSection data={data} />
      </Container>
    </>
  );
};
export default Home;

export async function getStaticProps() {
  try {
    const data = await webScraping.scrapeData();
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        data: null,
      },
    };
  } finally {
    webScraping.closeBrowser();
  }
}
