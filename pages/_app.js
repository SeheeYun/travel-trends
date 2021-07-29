import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from 'react';
import Layout from '../src/components/layout';
import TourApi from '../src/service/tour-api';
import '../styles/globals.css';

const tourApi = new TourApi(process.env.NEXT_PUBLIC_API_KEY);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Layout>
      <CssBaseline />
      <Component {...pageProps} tourApi={tourApi} />
    </Layout>
  );
}

export default MyApp;
