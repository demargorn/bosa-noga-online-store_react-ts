import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../helpers/API';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { productActions } from '../../slices/products.slice';
import { searchActions } from '../../slices/search.slice';
import { IItem } from '../../interfaces/Item.interface';
import Preloader from '../../components/Preloader/Preloader';
import Item from '../../components/Item/Item';
import Button from '../../components/Button/Button';
import './Catalog.css';

const Catalog = () => {
   const items = useSelector((s: TypeRootState) => s.products.items); // элементы каталога
   const search = useSelector((s: TypeRootState) => s.search); // хранилище поиска
   const [activeCategory, setActiveCategory] = useState<string>('All'); // категория товаров
   const dispatch = useDispatch<TypeDispatch>();

   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();

      // отправляем запрос с поисковой фразой
      (async () => {
         try {
            const { data } = await axios.get<Array<IItem>>(`${API}/items?q=${search.search}`);
            dispatch(productActions.clear());
            dispatch(productActions.getItems(data));
         } catch (error) {
            console.log(error);
         }
      })();

      dispatch(searchActions.getState());
   };

   // контролируем input
   const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      dispatch(searchActions.remember(target.value));
   };

   // загрузить/показать обувь
   const handleGetShoes = async (category: string, address: string = '?') => {
      setActiveCategory(category);
      try {
         const { data } = await axios.get<Array<IItem>>(`${API}/items/${address}`);
         dispatch(productActions.clear());
         dispatch(productActions.getItems(data));
      } catch (error) {
         console.log(error);
      }
   };

   // загружаем еще
   const handleGetMoreProducts = async () => {
      let url;

      switch (activeCategory) {
         case 'Men':
            url = '?categoryId=12';
            break;
         case 'Women':
            url = '?categoryId=13';
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
         dispatch(productActions.getItems(data));
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      handleGetShoes('All');
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
                        onClick={() => handleGetShoes('All')}
                        className={activeCategory === 'All' ? 'nav-link active' : 'nav-link'}
                     >
                        Все
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={() => handleGetShoes('Women', '?categoryId=13')}
                        className={activeCategory === 'Women' ? 'nav-link active' : 'nav-link'}
                     >
                        Женская обувь
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={() => handleGetShoes('Men', '?categoryId=12')}
                        className={activeCategory === 'Men' ? 'nav-link active' : 'nav-link'}
                     >
                        Мужская обувь
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={() => handleGetShoes('Uni', '?categoryId=14')}
                        className={activeCategory === 'Uni' ? 'nav-link active' : 'nav-link'}
                     >
                        Обувь унисекс
                     </a>
                  </li>
                  <li className='nav-item'>
                     <a
                        onClick={() => handleGetShoes('Children', '?categoryId=15')}
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
