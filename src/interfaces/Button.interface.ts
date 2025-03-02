import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   href?: string;
   className?: string;
   onClick: () => void;
}
