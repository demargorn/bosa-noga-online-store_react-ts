import { useNavigate } from 'react-router';
import { IItem } from '@/interfaces/Item.interface';
import './Item.css';

/**
 * компонент карточки товара
 */

const Item = (props: IItem) => {
   const navigate = useNavigate();

   return (
      <div className='col-4 item'>
         <div className='card catalog-item-card'>
            <img src={props.images[0]} className='card-img-top img-fluid' alt={props.title} />
            <div className='card-body'>
               <p className='card-text'>{props.title}</p>
               <p className='card-text'>{props.price} руб.</p>
               <button
                  className='btn btn-outline-primary'
                  onClick={() => navigate(`/catalog/${props.id}`)}
               >
                  Заказать
               </button>
            </div>
         </div>
      </div>
   );
};

export default Item;
