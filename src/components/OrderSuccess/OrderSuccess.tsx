import { useNavigate } from 'react-router';
import './OrderSuccess.css';

/**
 * компонент "Успешный заказ"
 */

const OrderSuccess = () => {
   const navigate = useNavigate();

   return (
      <div className='success'>
         <h2 className='text-center'>Заказ успешно создан</h2>
         <button
            type='submit'
            onClick={() => navigate('/')}
            className='btn btn-danger btn-block btn-lg btn-add-to-cart b-success'
         >
            На главную
         </button>
      </div>
   );
};

export default OrderSuccess;
