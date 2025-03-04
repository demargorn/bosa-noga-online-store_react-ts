import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { TypeRootState } from '../../store/store';

const Header = () => {
   const [active, setActive] = useState(false);
   const cart = useSelector((s: TypeRootState) => s.cart.items); // корзина товаров
   const navigate = useNavigate();

   const handlerToggleSearch = () => setActive(!active);

   return (
      <header className='container'>
         <div className='row'>
            <div className='col'>
               <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                  <NavLink to='/' className='navbar-brand'>
                     <img src='/public/header-logo.png' alt='bosa-noga-logo' />
                  </NavLink>
                  <div className='collapse navbar-collapse' id='navbarMain'>
                     <ul className='navbar-nav mr-auto'>
                        <li className='nav-item active'>
                           <NavLink
                              to='/'
                              className={({ isActive }) =>
                                 isActive ? 'nav-link active' : 'nav-link'
                              }
                           >
                              Главная
                           </NavLink>
                        </li>
                        <li className='nav-item'>
                           <NavLink
                              to='/catalog'
                              className={({ isActive }) =>
                                 isActive ? 'nav-link active' : 'nav-link'
                              }
                           >
                              Каталог
                           </NavLink>
                        </li>
                        <li className='nav-item'>
                           <NavLink
                              to='/about'
                              className={({ isActive }) =>
                                 isActive ? 'nav-link active' : 'nav-link'
                              }
                           >
                              О магазине
                           </NavLink>
                        </li>
                        <li className='nav-item'>
                           <NavLink
                              to='/contacts'
                              className={({ isActive }) =>
                                 isActive ? 'nav-link active' : 'nav-link'
                              }
                           >
                              Контакты
                           </NavLink>
                        </li>
                     </ul>
                     <div>
                        <div className='header-controls-pics'>
                           <div
                              data-id='search-expander'
                              title='поиск'
                              className='header-controls-pic header-controls-search'
                              onClick={handlerToggleSearch}
                           ></div>
                           <div
                              className='header-controls-pic header-controls-cart'
                              title='корзина'
                              onClick={() => navigate('/cart')}
                           >
                              {cart.length > 0 && (
                                 <div className='header-controls-cart-full'>{cart.length}</div>
                              )}
                              <div className='header-controls-cart-menu'></div>
                           </div>
                        </div>
                        <form
                           data-id='search-form'
                           className={`header-controls-search-form form-inline ${
                              active ? 'visible' : 'invisible'
                           }`}
                        >
                           <input className='form-control' placeholder='Поиск' />
                        </form>
                     </div>
                  </div>
               </nav>
            </div>
         </div>
      </header>
   );
};

export default Header;
