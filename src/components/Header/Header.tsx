import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import axios from 'axios';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { API } from '../../helpers/API';
import { productActions } from '../../slices/products.slice';
import { searchActions } from '../../slices/search.slice';
import { IItem } from '../../interfaces/Item.interface';

const Header = () => {
   const [active, setActive] = useState<boolean>(false); // состояние виджета поиска
   const cart = useSelector((s: TypeRootState) => s.cart.items); // корзина товаров
   const search = useSelector((s: TypeRootState) => s.search);
   const dispatch = useDispatch<TypeDispatch>();
   const navigate = useNavigate();

   const handlerToggleSearch = () => setActive(!active);

   const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      dispatch(searchActions.remember(target.value));
   };

   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();

      navigate('/catalog');

      (async () => {
         try {
            const { data } = await axios.get<Array<IItem>>(`${API}/items?q=${search.search}`);
            dispatch(productActions.clear());
            dispatch(productActions.getItems(data));
         } catch (error) {
            console.log(error);
         }
      })();

      handlerToggleSearch();
      dispatch(searchActions.getState());
   };

   return (
      <header className='container'>
         <div className='row'>
            <div className='col'>
               <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                  <NavLink to='/' className='navbar-brand'>
                     <img src='/header-logo.png' alt='bosa-noga-logo' />
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
                           onSubmit={handleFormSubmit}
                        >
                           <input
                              className='form-control'
                              onChange={handleInputChange}
                              placeholder='Поиск'
                           />
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
