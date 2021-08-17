import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from 'react';
import Layout from '../src/components/Layout';
import Store from '../src/store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Store>
      <Layout>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </Store>
  );
}

export default MyApp;
