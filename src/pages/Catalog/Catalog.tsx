import { useEffect } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../helpers/API';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { getItems } from '../../slices/cart.slice';
import { IItem } from '../../interfaces/Item.interface';
import Preloader from '../../components/Preloader/Preloader';
import Item from '../../components/Item/Item';

const Catalog = () => {
   const items = useSelector((s: TypeRootState) => s.cart.items);
   const dispatch = useDispatch<TypeDispatch>();

   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get<IItem>(`${API}/items`);
            dispatch(getItems(data));
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);

   return (
      <section className='catalog'>
         <h2 className='text-center'>Каталог</h2>
         {!items.length && <Preloader />}
         {items.length > 0 && (
            <>
               <form className='catalog-search-form form-inline'>
                  <input className='form-control' placeholder='Поиск' />
               </form>
               <ul className='catalog-categories nav justify-content-center'>
                  <li className='nav-item'>
                     <NavLink
                        to='/#'
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                     >
                        Все
                     </NavLink>
                  </li>
                  <li className='nav-item'>
                     <NavLink
                        to='/#'
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                     >
                        Женская обувь
                     </NavLink>
                  </li>
                  <li className='nav-item'>
                     <NavLink
                        to='/#'
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                     >
                        Мужская обувь
                     </NavLink>
                  </li>
                  <li className='nav-item'>
                     <NavLink
                        to='/#'
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                     >
                        Обувь унисекс
                     </NavLink>
                  </li>
                  <li className='nav-item'>
                     <NavLink
                        to='/#'
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                     >
                        Детская обувь
                     </NavLink>
                  </li>
               </ul>
               <div className='row'>
                  {items.flat().map((i) => (
                     <Item key={i.id} {...i} />
                  ))}
               </div>
               <div className='text-center'>
                  <button className='btn btn-outline-primary'>Загрузить ещё</button>
               </div>
            </>
         )}
      </section>
   );
};

export default Catalog;
