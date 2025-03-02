import { useNavigate } from 'react-router';
import { IItem } from '../../interfaces/Item.interface';
import Button from '../Button/Button';

const Item = (props: IItem) => {
   const navigate = useNavigate();

   return (
      <div className='col-4'>
         <div className='card catalog-item-card'>
            <img src={props.images[0]} className='card-img-top img-fluid' alt={props.title} />
            <div className='card-body'>
               <p className='card-text'>{props.title}</p>
               <p className='card-text'>{props.price} руб.</p>
               <Button onClick={() => navigate('/catalog')}>Заказать</Button>
            </div>
         </div>
      </div>
   );
};

export default Item;
