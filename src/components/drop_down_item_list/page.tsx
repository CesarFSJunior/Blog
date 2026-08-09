import { ReactNode } from 'react';

// 1. Defina a interface das props do componente
interface ListItemProps {
  children: ReactNode; // Permite receber qualquer elemento JSX como filho
}

export default function ListItem({ children }: ListItemProps) {
    
    return (
        <li className='w-full items-center px-2 py-2 cursor-pointer flex justify-left rounded-md hover:bg-[color-mix(in_srgb,var(--background)_90%,black)] [&_a]:border-b-2 [&_a]:border-transparent hover:[&_a]:border-foreground [&_a]:transition-colors [&_a]:duration-300'>
            {children}
        </li>
    )
}