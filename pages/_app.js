import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from 'react';
import Layout from '../src/components/layout';
import '../styles/globals.css';

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
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
