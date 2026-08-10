"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di"; 
import { GrActions } from "react-icons/gr";
import { useEstadoGlobal } from '@/components/state_provider/page';


export default function Header() {
    // 1. Cria o estado do toggle (ex: para modo escuro ou menu aberto)
    const [isActive, setIsActive] = useState(false);

    // 2. Sincroniza o estado do React com a tag HTML do DOM
    useEffect(() => {
        const htmlElement = document.documentElement; // Seleciona a tag <html>
        
        if (isActive) {
        htmlElement.classList.add('dark');
        } else {
        htmlElement.classList.remove('dark');
        }
    }, [isActive]);

    const { valor, setValor } = useEstadoGlobal();


    return (
        <header className="p-2 shadow-2xs fixed w-full bg-background h-16 top-0 z-50" >
            <nav className="max-w-7xl h-full mx-auto flex items-center justify-end gap-12 px-6 py-2">
                <Link href='/' className='mr-auto cursor-pointer'>
                    <h1 className="text-2xl font-bold max-[24rem]:text-[1rem] items-center">cesarFSjunior</h1>
                </Link>
                <Link href="/about" className="hover:text-foreground border-b-2 border-transparent hover:border-foreground transition-colors duration-300 max-md:hidden">
                    About
                </Link>
                <a href='https://github.com/CesarFSJunior' target='_blank' rel='noopener noreferrer' className='max-md:hidden'>
                    <DiGithubBadge className="inline-block w-8 h-8 text-foreground" />
                </a>
                <GrActions className="inline-block w-6 h-6 text-foreground cursor-pointer max-md:hidden" onClick={() => setIsActive(!isActive)} />
                <div data-testid="menu-toggle" className="relative w-6 h-6 flex items-center justify-center md:hidden cursor-pointer" onClick={() => setValor(!valor)}>
                    <span className={`absolute w-full border-t-2 border-foreground transform origin-center transition duration-300
                        ${valor
                        ? 'rotate-45'
                        : 'translate-y-1'}`} />
                    <span className={`absolute w-full border-t-2 border-foreground transform origin-center transition duration-300
                        ${valor
                        ? '-rotate-45'
                        : '-translate-y-1'}`} />
                </div>
            </nav>
        </header>
    )
}

