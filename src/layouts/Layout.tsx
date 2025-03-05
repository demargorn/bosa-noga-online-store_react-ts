import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = () => {
   return (
      <div>
         <Header />
         <main className='container'>
            <div className='row'>
               <div className='col'>
                  <div className='banner'>
                     <img src='/banner.jpg' className='img-fluid' alt='к весне готовы!' />
                     <h2 className='banner-header'>К весне готовы!</h2>
                  </div>
                  <Outlet />
               </div>
            </div>
         </main>
         <Footer />
      </div>
   );
};

export default Layout;
