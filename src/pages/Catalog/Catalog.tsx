import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../helpers/API';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { getItems, clear } from '../../slices/products.slice';
import { IItem } from '../../interfaces/Item.interface';
import Preloader from '../../components/Preloader/Preloader';
import Item from '../../components/Item/Item';
import Button from '../../components/Button/Button';
import './Catalog.css';

const Catalog = () => {
   const items = useSelector((s: TypeRootState) => s.products.items); // элементы каталога
   const [isActive, setIsActive] = useState<boolean>(false);
   const dispatch = useDispatch<TypeDispatch>();

   // загружаем еще
   const handleGetMoreProducts = async () => {
      try {
         const { data } = await axios.get<IItem>(`${API}/items?categoryId=X&offset=6 `);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (e) {
         console.log(e);
      }
   };

   // загрузить/показать всё
   const handleShowAllShoes = async () => {
      try {
         const { data } = await axios.get<IItem>(`${API}/items`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };
   // загрузить/показать женскую обувь
   const handleShowWomenShoes = async () => {
      try {
         const { data } = await axios.get<IItem>(`${API}/items?categoryId=13`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };
   // загрузить/показать мужскую обувь
   const handleShowMenShoes = async () => {
      try {
         const { data } = await axios.get<IItem>(`${API}/items?categoryId=12`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };
   // загрузить/показать обувь унисекс
   const handleShowUnisexShoes = async () => {
      try {
         const { data } = await axios.get<IItem>(`${API}/items?categoryId=14`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };
   // загрузить/показать детcкую обувь
   const handleShowChildrenShoes = async () => {
      try {
         const { data } = await axios.get<IItem>(`${API}/items?categoryId=15`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleShowAllShoes();
   }, []);

   console.log(items);

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
                     <a
                        onClick={handleShowAllShoes}
                        className={isActive ? 'nav-link active' : 'nav-link'}
                     >
                        Все
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowWomenShoes}
                        className={isActive ? 'nav-link active' : 'nav-link'}
                     >
                        Женская обувь
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowMenShoes}
                        className={isActive ? 'nav-link active' : 'nav-link'}
                     >
                        Мужская обувь
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowUnisexShoes}
                        className={isActive ? 'nav-link active' : 'nav-link'}
                     >
                        Обувь унисекс
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowChildrenShoes}
                        className={isActive ? 'nav-link active' : 'nav-link'}
                     >
                        Детская обувь
                     </a>
                  </li>
               </ul>
               <div className='row'>
                  {items.flat().map((i) => (
                     <Item key={i.id} {...i} />
                  ))}
               </div>
               {!items.length && <Preloader />}
               {items.flat().length > 5 && (
                  <div className='text-center'>
                     <Button onClick={handleGetMoreProducts}>Загрузить ещё</Button>
                  </div>
               )}
            </>
         )}
      </section>
   );
};

export default Catalog;
