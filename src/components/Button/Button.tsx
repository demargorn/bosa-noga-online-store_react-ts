import { IButton } from '../../interfaces/Button.interface';

const Button = (props: IButton) => {
   return (
      <button type='button' className='btn btn-outline-primary' onClick={props.onClick}>
         {props.children}
      </button>
   );
};

export default Button;
