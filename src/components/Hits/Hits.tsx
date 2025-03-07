import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TypeDispatch, TypeRootState } from '../../store/store';
import { fetchHits } from '../../slices/hits.slice';
import Preloader from '../Preloader/Preloader';
import Item from '../Item/Item';

/**
 * раздел "Хиты продаж"
 */

const Hits = () => {
   const hits = useSelector((s: TypeRootState) => s.hits.hits); /** элементы хитов */
   const dispatch = useDispatch<TypeDispatch>();

   /** загрузка хитовых товаров при загрузке страницы */
   useEffect(() => {
      dispatch(fetchHits());
   }, []);

   return (
      <section className='top-sales'>
         <h2 className='text-center'>Хиты продаж!</h2>
         {hits.length === 0 && <Preloader />}
         <div className='row'>
            {hits.map((h) => (
               <Item key={h.id} {...h} />
            ))}
         </div>
      </section>
   );
};

export default Hits;
