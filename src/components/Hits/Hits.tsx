import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { getHits } from '../../slices/products.slice';
import { API } from '../../helpers/API';
import { IItem } from '../../interfaces/Item.interface';
import Preloader from '../Preloader/Preloader';
import Item from '../Item/Item';

const Hits = () => {
   const hits = useSelector((s: TypeRootState) => s.products.hits); // элементы хитов
   const dispatch = useDispatch<TypeDispatch>();

   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get<IItem>(`${API}/top-sales`);
            dispatch(getHits(data));
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);

   return (
      <section className='top-sales'>
         <h2 className='text-center'>Хиты продаж!</h2>
         {hits.length === 0 && <Preloader />}
         <div className='row'>
            {hits.flat().map((h) => (
               <Item key={h.id} {...h} />
            ))}
         </div>
      </section>
   );
};

export default Hits;
