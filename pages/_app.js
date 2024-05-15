import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout';
import '../styles/globals.css';
import ItemsContext from '../src/context/ItemsContext';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ItemsContext>
      <Layout isLoading={isLoading}>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ItemsContext>
  );
}

export default MyApp;
