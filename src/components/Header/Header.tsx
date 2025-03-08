import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { searchActions } from '../../slices/search.slice';

/**
 * компонент верхушка (header) страницы
 */

const Header = () => {
   const [active, setActive] = useState<boolean>(false); /** состояние виджета поиска */
   const cart = useSelector((s: TypeRootState) => s.cart.items); /** корзина товаров */
   const search = useRef<HTMLFormElement | null>(null); /** ссылка на форму поиска  */
   const dispatch = useDispatch<TypeDispatch>();
   const navigate = useNavigate();

   const handlerToggleSearch = () => {
      setActive(!active);
   };

   /** обработчик закрытия виджета поиска */
   const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
      const relatedTarget = e.relatedTarget as EventTarget | null;
      if (search.current && !search.current.contains(relatedTarget as Node)) {
         setActive(false);
      }
   };

   /** контролируем input */
   const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      dispatch(searchActions.remember(target.value));
   };

   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();

      navigate('/catalog');
      handlerToggleSearch(); /** изменить состояние виджета - закрыть */
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
                              {localStorage.length > 0 && (
                                 <div className='header-controls-cart-full'>
                                    {localStorage.length}
                                 </div>
                              )}
                              <div className='header-controls-cart-menu'></div>
                           </div>
                        </div>
                        <form
                           data-id='search-form'
                           className={`header-controls-search-form form-inline ${
                              active ? 'visible' : 'invisible'
                           }`}
                           ref={search}
                           onSubmit={handleFormSubmit}
                           onBlur={handleBlur}
                        >
                           <input
                              placeholder='Поиск'
                              onChange={handleInputChange}
                              className='form-control'
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
