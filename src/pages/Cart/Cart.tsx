import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import sha256 from 'crypto-js/sha256';
import { API } from '@/helpers/API';
import { TypeDispatch, TypeRootState } from '@/store/store';
import { cartActions } from '@/slices/cart.slice';
import { IItem } from '@/interfaces/Item.interface';
import OrderSuccess from '@/components/OrderSuccess/OrderSuccess';
import './Cart.css';

/**
 * корзина товаров
 */

/** интерфейс формы */
interface IFormData {
   phone: string;
   address: string;
   checkbox: boolean;
}

/** интерфейс item в заказе */
interface IOrderItem {
   id: number;
   price: number;
   count?: number;
}

/** интерфейс заказа */
interface IOrder {
   owner: {
      phone: string;
      address: string;
   };
   items: Array<IOrderItem>;
}

const Cart = () => {
   /** состояние формы */
   const [formData, setFormData] = useState<IFormData>({
      phone: '',
      address: '',
      checkbox: false,
   });
   const cart = useSelector(
      (s: TypeRootState) => s.cart.items
   ); /** корзина товаров тут для работы cartActions */
   const [data, setData] = useState<AxiosResponse<string>>(); /** состояние ответа от сервера */
   const dispatch = useDispatch<TypeDispatch>();
   const navigate = useNavigate();

   /** получаем массив из local storage */
   const storage: Array<string> = Object.values(localStorage);
   const arr: Array<IItem> = storage.map((s) => JSON.parse(s));

   /** контроль input */
   const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;

      setFormData({
         ...formData,
         [name]: value,
      });
   };

   /** удалить товар из корзины */
   const handleDeleteItem = (item: IItem) => {
      dispatch(cartActions.deleteItem(item));
   };

   /** контроль checkbox */
   const handlerCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = target;

      setFormData({
         ...formData,
         [name]: checked,
      });
   };

   /** функция создания заказа */
   function createOrder(): IOrder {
      const owner = {
         phone: sha256(formData.phone).toString() /** шифруем телефон */,
         address: sha256(formData.address).toString() /** шифруем адрес */,
      };
      const products = arr.map((a) => [
         {
            id: a.id,
            price: a.price,
            count: a.count,
         },
      ]);

      return { owner, items: [...products.flat()] };
   }

   /** отправка формы */
   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();

      const order = JSON.stringify(createOrder());

      /** конфиг для axios */
      const config: AxiosRequestConfig<string> = {
         headers: {
            'Content-Type': 'application/json',
         } as RawAxiosRequestHeaders,
      };

      (async () => {
         try {
            const response: AxiosResponse<string> = await axios.post(`${API}/order`, order, config);
            setData(response);
         } catch (e) {
            console.log(e);
         }
      })();
      /** очищаем форму */
      setFormData({
         phone: '',
         address: '',
         checkbox: false,
      });
      /** очищаем корзину и local store */
      dispatch(cartActions.clean());
   };

   return (
      <>
         <h2 className='text-center'>Корзина</h2>

         {!data && arr.length === 0 && (
            <div className='card-body cart-empty'>
               <span className='cart-empty-title'>Корзина пуста </span> <br />
               <span className='cart-empty-text'>
                  Воспользуйтесь поиском, чтобы найти всё, что нужно
               </span>
               <button
                  onClick={() => navigate('/')}
                  className='btn btn-danger btn-block btn-lg btn-add-to-cart btn-empty-cart'
               >
                  Начать покупки
               </button>
            </div>
         )}

         {!data && arr.length > 0 && (
            <section className='cart'>
               <table className='table table-bordered'>
                  <thead>
                     <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Название</th>
                        <th scope='col'>Размер</th>
                        <th scope='col'>Кол-во</th>
                        <th scope='col'>Стоимость</th>
                        <th scope='col'>Итого</th>
                        <th scope='col'>Действия</th>
                     </tr>
                  </thead>

                  <tbody>
                     {arr.map((a, i) => (
                        <tr key={a.id}>
                           <td scope='row'>{i + 1}</td>
                           <td>
                              <Link to={`/catalog/${a.id}`}>{a.title}</Link>
                           </td>
                           <td>{a.sizes[0].size}</td>
                           <td>{a.count}</td>
                           <td>{a.price} руб.</td>
                           <td>{a.price * a.count!} руб.</td>
                           <td>
                              <button
                                 className='btn btn-outline-danger btn-sm'
                                 onClick={() => handleDeleteItem(a)}
                              >
                                 Удалить
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>

                  <tfoot>
                     <tr>
                        <td colSpan={5} className='text-right'>
                           Общая стоимость
                        </td>
                        <td>{arr.reduce((acc, c) => (acc += c.price * c.count!), 0)} руб.</td>
                     </tr>
                  </tfoot>
               </table>
            </section>
         )}

         {data && <OrderSuccess />}
         {arr.length > 0 && (
            <section className='order'>
               <h2 className='text-center'>Оформить заказ</h2>
               <div className='card'>
                  <form className='card-body' onSubmit={handleFormSubmit}>
                     <div className='form-group'>
                        <label htmlFor='phone'>Телефон</label>
                        <input
                           id='phone'
                           name='phone'
                           placeholder='Ваш телефон'
                           value={formData.phone}
                           onChange={handleInputChange}
                           className='form-control'
                           required
                        />
                     </div>
                     <div className='form-group'>
                        <label htmlFor='address'>Адрес доставки</label>
                        <input
                           id='address'
                           name='address'
                           placeholder='Адрес доставки'
                           value={formData.address}
                           onChange={handleInputChange}
                           className='form-control'
                           required
                        />
                     </div>
                     <div className='form-group form-check'>
                        <input
                           id='agreement'
                           type='checkbox'
                           name='checkbox'
                           onChange={handlerCheckboxChange}
                           className='form-check-input'
                        />
                        <label className='form-check-label' htmlFor='agreement'>
                           Согласен с правилами доставки
                        </label>
                     </div>
                     <button
                        type='submit'
                        className='btn btn-outline-secondary'
                        disabled={!formData.checkbox}
                     >
                        Оформить
                     </button>
                  </form>
               </div>
            </section>
         )}
      </>
   );
};

export default Cart;
