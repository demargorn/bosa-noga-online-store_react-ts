import { IButton } from '../../interfaces/Button.interface';

const Button = (props: IButton) => {
   return (
      <button type='button' className='btn btn-outline-primary'>
         {props.children}
      </button>
   );
};

export default Button;
