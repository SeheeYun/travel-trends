import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div id="root">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
