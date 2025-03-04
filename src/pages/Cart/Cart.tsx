import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { deleteItem } from '../../slices/cart.slice';

const Cart = () => {
   const cart = useSelector((s: TypeRootState) => s.cart.items); // корзина
   const dispatch = useDispatch<TypeDispatch>();

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
               {cart.map((c) => (
                  <>
                     <tbody>
                        <tr>
                           <td scope='row'>{cart.length}</td>
                           <td>
                              <Link to={`/catalog/${c.id}`}>{c.title}</Link>
                           </td>
                           <td>10 US</td>
                           <td>{c.count}</td>
                           <td>{c.price}</td>
                           <td>{c.price * c.count!} руб.</td>
                           <td>
                              <button
                                 className='btn btn-outline-danger btn-sm'
                                 onClick={() => dispatch(deleteItem(c))}
                              >
                                 Удалить
                              </button>
                           </td>
                        </tr>
                     </tbody>
                     <tfoot>
                        <tr>
                           <td colSpan={5} className='text-right'>
                              Общая стоимость
                           </td>
                           <td>{c.price * c.count!} руб.</td>
                        </tr>
                     </tfoot>
                  </>
               ))}
            </table>
         </section>
         <section className='order'>
            <h2 className='text-center'>Оформить заказ</h2>
            <div className='card'>
               <form className='card-body'>
                  <div className='form-group'>
                     <label htmlFor='phone'>Телефон</label>
                     <input className='form-control' id='phone' placeholder='Ваш телефон' />
                  </div>
                  <div className='form-group'>
                     <label htmlFor='address'>Адрес доставки</label>
                     <input className='form-control' id='address' placeholder='Адрес доставки' />
                  </div>
                  <div className='form-group form-check'>
                     <input type='checkbox' className='form-check-input' id='agreement' />
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
