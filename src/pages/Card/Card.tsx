import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { API } from '../../helpers/API';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { itemActions } from '../../slices/item.slice';
import { cartActions } from '../../slices/cart.slice';
import { IItem } from '../../interfaces/Item.interface';
import Preloader from '../../components/Preloader/Preloader';
import './Card.css';

/**
 * карточка товара
 */

const Card = () => {
   const { id } = useParams();
   const item = useSelector((s: TypeRootState) => s.item.items.find((i) => i.id === Number(id))); // продукт
   const [checked, setChecked] = useState<boolean>(false); // выбран ли размер
   const [clicked, setClicked] = useState<boolean>(false); // состояние нажатия кнопки
   const dispatch = useDispatch<TypeDispatch>();

   /** увеличить количество */
   const handleAddCount = () => dispatch(itemActions.add(item!));

   /** уменьшить количество */
   const handleReduceCount = () => dispatch(itemActions.remove(item!));

   /** добавление товара в корзину */
   const handleAddToCart = () => {
      dispatch(cartActions.add(item!));
      localStorage.setItem(id!.toString(), JSON.stringify(item));
      setClicked(true);
   };

   /** загрузка информации о продукте */
   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get<IItem>(`${API}/items/${id}`);
            dispatch(itemActions.add(data));
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);

   return item ? (
      <section className='catalog-item'>
         <h2 className='text-center'>{item.title}</h2>
         <div className='row'>
            <div className='col-5'>
               <img src={item.images[0]} className='img-fluid' alt={`фото-item.title`} />
            </div>
            <div className='col-7'>
               <table className='table table-bordered'>
                  <tbody>
                     <tr>
                        <td>Артикул</td>
                        <td>{item.sku}</td>
                     </tr>
                     <tr>
                        <td>Производитель</td>
                        <td>{item.manufacturer}</td>
                     </tr>
                     <tr>
                        <td>Цвет</td>
                        <td>{item.color}</td>
                     </tr>
                     <tr>
                        <td>Материалы</td>
                        <td>{item.material}</td>
                     </tr>
                     <tr>
                        <td>Сезон</td>
                        <td>{item.season}</td>
                     </tr>
                     <tr>
                        <td>Повод</td>
                        <td>{item.reason}</td>
                     </tr>
                  </tbody>
               </table>
               <div className='text-center'>
                  <p>
                     Размеры в наличии:
                     {item.sizes.map((size) => (
                        <span
                           className={checked ? 'catalog-item-size selected' : 'catalog-item-size'}
                           key={size.size}
                           onClick={() => setChecked(!checked)}
                        >
                           {size.available ? size.size : ''}
                        </span>
                     ))}
                  </p>
                  {/** если нет доступных размеров */}
                  {item.sizes && (
                     <p>
                        Количество:
                        <span className='btn-group btn-group-sm pl-2'>
                           <button className='btn btn-secondary' onClick={handleReduceCount}>
                              -
                           </button>
                           <span className='btn btn-outline-primary'>{item.count}</span>
                           <button className='btn btn-secondary' onClick={handleAddCount}>
                              +
                           </button>
                        </span>
                     </p>
                  )}
               </div>
               {/** если нет доступных размеров */}
               {item.sizes && (
                  <button
                     className={`btn ${
                        clicked ? 'btn-success' : 'btn-danger'
                     } btn-block btn-lg btn-add-to-cart`}
                     disabled={!checked}
                     onClick={handleAddToCart}
                  >
                     {clicked ? '✓ Успешно добавлено' : 'Добавить в корзину'}
                  </button>
               )}
            </div>
         </div>
      </section>
   ) : (
      <Preloader />
   );
};

export default Card;
