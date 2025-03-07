import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { API } from '../../helpers/API';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { cartActions } from '../../slices/cart.slice';
import { IItem } from '../../interfaces/Item.interface';
import './Cart.css';

interface IFormData {
   phone: string;
   address: string;
   checkbox: false;
}

// interface IOrder {
//    owner: {
//       phone: string;
//       address: string;
//    };
//    items: [
//       {
//          id: number;
//          price: number;
//          count: number;
//       }
//    ];
// }

/**
 * корзина товаров
 */

const Cart = () => {
   const [formData, setFormData] = useState<IFormData>({
      phone: '',
      address: '',
      checkbox: false,
   });

   const cart = useSelector((s: TypeRootState) => s.cart.items); /** корзина */
   const dispatch = useDispatch<TypeDispatch>();

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
      localStorage.removeItem(item.id.toString());
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
   function createOrder() {
      return cart.map((c) => {
         return {
            owner: {
               phone: formData.phone,
               address: formData.address,
            },
            items: [
               {
                  id: c.id,
                  price: c.price,
                  count: c.count,
               },
            ],
         };
      });
   }

   /** отправка формы */
   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();

      (async () => {
         try {
            const { data } = await axios.post<IFormData>(`${API}/order`, {
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(createOrder()),
            });
            console.log(data);
            return data;
         } catch (e) {
            console.log(e);
         }
      })();
   };

   return (
      <>
         <section className='cart'>
            <h2 className='text-center'>Корзина</h2>
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
                  {cart.map((c, i) => (
                     <tr key={c.id}>
                        <td scope='row'>{i + 1}</td>
                        <td>
                           <Link to={`/catalog/${c.id}`}>{c.title}</Link>
                        </td>
                        <td>{c.sizes[0].size}</td>
                        <td>{c.count}</td>
                        <td>{c.price}</td>
                        <td>{c.price * c.count!} руб.</td>
                        <td>
                           <button
                              className='btn btn-outline-danger btn-sm'
                              onClick={() => handleDeleteItem(c)}
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
                     <td>{cart.reduce((acc, c) => (acc += c.price * c.count!), 0)} руб.</td>
                  </tr>
               </tfoot>
            </table>
         </section>
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
                        // required
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
                        // required
                     />
                  </div>
                  <div className='form-group form-check'>
                     <input
                        id='agreement'
                        type='checkbox'
                        name='checkbox'
                        checked={formData.checkbox}
                        onChange={handlerCheckboxChange}
                        className='form-check-input'
                        // required
                     />
                     <label className='form-check-label' htmlFor='agreement'>
                        Согласен с правилами доставки
                     </label>
                  </div>
                  <button type='submit' className='btn btn-outline-secondary'>
                     Оформить
                  </button>
               </form>
            </div>
         </section>
      </>
   );
};

export default Cart;
