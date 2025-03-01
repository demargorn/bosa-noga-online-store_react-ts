import { NavLink } from 'react-router';

const Catalog = () => {
   return (
      <section className='catalog'>
         <h2 className='text-center'>Каталог</h2>
         <form className='catalog-search-form form-inline'>
            <input className='form-control' placeholder='Поиск' />
         </form>
         <ul className='catalog-categories nav justify-content-center'>
            <li className='nav-item'>
               <NavLink
                  to='/#'
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
               >
                  Все
               </NavLink>
            </li>
            <li className='nav-item'>
               <NavLink
                  to='/#'
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
               >
                  Женская обувь
               </NavLink>
            </li>
            <li className='nav-item'>
               <NavLink
                  to='/#'
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
               >
                  Мужская обувь
               </NavLink>
            </li>
            <li className='nav-item'>
               <NavLink
                  to='/#'
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
               >
                  Обувь унисекс
               </NavLink>
            </li>
            <li className='nav-item'>
               <NavLink
                  to='/#'
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
               >
                  Детская обувь
               </NavLink>
            </li>
         </ul>
         <div className='row'>
            <div className='col-4'>
               <div className='card catalog-item-card'>
                  <img
                     src='./public/products/sandals_myer.jpg'
                     className='card-img-top img-fluid'
                     alt="Босоножки 'MYER'"
                  />
                  <div className='card-body'>
                     <p className='card-text'>Босоножки 'MYER'</p>
                     <p className='card-text'>34 000 руб.</p>
                     <a href='/products/1.html' className='btn btn-outline-primary'>
                        Заказать
                     </a>
                  </div>
               </div>
            </div>
            <div className='col-4'>
               <div className='card catalog-item-card'>
                  <img
                     src='./public/products/sandals_keira.jpg'
                     className='card-img-top img-fluid'
                     alt="Босоножки 'Keira'"
                  />
                  <div className='card-body'>
                     <p className='card-text'>Босоножки 'Keira'</p>
                     <p className='card-text'>7 600 руб.</p>
                     <a href='/products/1.html' className='btn btn-outline-primary'>
                        Заказать
                     </a>
                  </div>
               </div>
            </div>
            <div className='col-4'>
               <div className='card catalog-item-card'>
                  <img
                     src='./public/products/superhero_sneakers.jpg'
                     className='card-img-top img-fluid'
                     alt='Супергеройские кеды'
                  />
                  <div className='card-body'>
                     <p className='card-text'>Супергеройские кеды</p>
                     <p className='card-text'>1 400 руб.</p>
                     <a href='/products/1.html' className='btn btn-outline-primary'>
                        Заказать
                     </a>
                  </div>
               </div>
            </div>
            <div className='col-4'>
               <div className='card catalog-item-card'>
                  <img
                     src='./public/products/sandals_myer.jpg'
                     className='card-img-top img-fluid'
                     alt="Босоножки 'MYER'"
                  />
                  <div className='card-body'>
                     <p className='card-text'>Босоножки 'MYER'</p>
                     <p className='card-text'>34 000 руб.</p>
                     <a href='/products/1.html' className='btn btn-outline-primary'>
                        Заказать
                     </a>
                  </div>
               </div>
            </div>
            <div className='col-4'>
               <div className='card catalog-item-card'>
                  <img
                     src='./public/products/sandals_keira.jpg'
                     className='card-img-top img-fluid'
                     alt="Босоножки 'Keira'"
                  />
                  <div className='card-body'>
                     <p className='card-text'>Босоножки 'Keira'</p>
                     <p className='card-text'>7 600 руб.</p>
                     <a href='/products/1.html' className='btn btn-outline-primary'>
                        Заказать
                     </a>
                  </div>
               </div>
            </div>
            <div className='col-4'>
               <div className='card catalog-item-card'>
                  <img
                     src='./public/products/superhero_sneakers.jpg'
                     className='card-img-top img-fluid'
                     alt='Супергеройские кеды'
                  />
                  <div className='card-body'>
                     <p className='card-text'>Супергеройские кеды</p>
                     <p className='card-text'>1 400 руб.</p>
                     <a href='/products/1.html' className='btn btn-outline-primary'>
                        Заказать
                     </a>
                  </div>
               </div>
            </div>
         </div>
         <div className='text-center'>
            <button className='btn btn-outline-primary'>Загрузить ещё</button>
         </div>
      </section>
   );
};

export default Catalog;
