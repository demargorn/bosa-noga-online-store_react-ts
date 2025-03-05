import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store';
import router from './router/router';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </StrictMode>
);
