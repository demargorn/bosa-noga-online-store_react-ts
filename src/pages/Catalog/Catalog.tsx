import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../helpers/API';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { getItems, clear } from '../../slices/products.slice';
import { IItem } from '../../interfaces/Item.interface';
import { getState, remember } from '../../slices/search.slice';
import Preloader from '../../components/Preloader/Preloader';
import Item from '../../components/Item/Item';
import Button from '../../components/Button/Button';
import './Catalog.css';

const Catalog = () => {
   const items = useSelector((s: TypeRootState) => s.products.items); // элементы каталога
   const search = useSelector((s: TypeRootState) => s.search); // хранилище поиска
   const [activeCategory, setActiveCategory] = useState<string>('All');
   const dispatch = useDispatch<TypeDispatch>();

   // const category = () => {
   //    switch (activeCategory) {
   //       case 'Women':
   //          return 13;
   //       case 'Men':
   //          return 12;
   //       case 'Uni':
   //          return 14;
   //       case 'Children':
   //          return 15;
   //    }
   //}

   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();

      // отправляем запрос с поисковой фразой
      (async () => {
         try {
            const { data } = await axios.get<Array<IItem>>(`${API}/items?q=${search.search}`);
            dispatch(clear());
            dispatch(getItems(data));
         } catch (error) {
            console.log(error);
         }
      })();

      dispatch(getState());
   };

   // контролируем input
   const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      dispatch(remember(target.value));
   };

   // загружаем еще шесть
   const handleGetMoreProducts = async () => {
      let url;

      switch (activeCategory) {
         case 'Women':
            url = '?categoryId=13';
            break;
         case 'Men':
            url = '?categoryId=12';
            break;
         case 'Uni':
            url = '?categoryId=14';
            break;
         case 'Children':
            url = '?categoryId=15';
            break;
         default:
            url = '?';
      }

      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items${url}&offset=6 `);
         dispatch(getItems(data));
      } catch (e) {
         console.log(e);
      }
   };

   // загрузить/показать всё
   const handleShowAllShoes = async () => {
      setActiveCategory('All');
      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };

   // загрузить/показать женскую обувь
   const handleShowWomenShoes = async () => {
      setActiveCategory('Women');
      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items?categoryId=13`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };

   // загрузить/показать мужскую обувь
   const handleShowMenShoes = async () => {
      setActiveCategory('Men');
      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items?categoryId=12`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };
   // загрузить/показать обувь унисекс
   const handleShowUniShoes = async () => {
      setActiveCategory('Uni');
      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items?categoryId=14`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };
   // загрузить/показать детcкую обувь
   const handleShowChildrenShoes = async () => {
      setActiveCategory('Children');
      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items?categoryId=15`);
         dispatch(clear());
         dispatch(getItems(data));
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleShowAllShoes();
   }, []);

   return (
      <section className='catalog'>
         <h2 className='text-center'>Каталог</h2>
         {!items.length && <Preloader />}
         {items.length > 0 && (
            <>
               <form className='catalog-search-form form-inline' onSubmit={handleFormSubmit}>
                  <input
                     className='form-control'
                     value={search.search}
                     onChange={handleInputChange}
                     placeholder='Поиск'
                  />
               </form>
               <ul className='catalog-categories nav justify-content-center'>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowAllShoes}
                        className={activeCategory === 'All' ? 'nav-link active' : 'nav-link'}
                     >
                        Все
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowWomenShoes}
                        className={activeCategory === 'Women' ? 'nav-link active' : 'nav-link'}
                     >
                        Женская обувь
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowMenShoes}
                        className={activeCategory === 'Men' ? 'nav-link active' : 'nav-link'}
                     >
                        Мужская обувь
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowUniShoes}
                        className={activeCategory === 'Uni' ? 'nav-link active' : 'nav-link'}
                     >
                        Обувь унисекс
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={handleShowChildrenShoes}
                        className={activeCategory === 'Children' ? 'nav-link active' : 'nav-link'}
                     >
                        Детская обувь
                     </a>
                  </li>
               </ul>
               <div className='row'>
                  {items.map((i) => (
                     <Item key={i.id} {...i} />
                  ))}
               </div>
               {!items.length && <Preloader />}
               {items.length > 5 && (
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
