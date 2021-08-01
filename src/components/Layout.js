import Footer from './Footer';
import Header from './Header';

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
