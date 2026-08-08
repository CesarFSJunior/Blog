"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di"; 
import { GrActions } from "react-icons/gr";


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


    return (
        <header className="p-2 shadow-2xs fixed w-full bg-background h-16 top-0" >
            <div className="max-w-7xl mx-auto flex items-center justify-end gap-12 px-6 py-2">
                <Link href='/' className='mr-auto cursor-pointer'>
                    <h1 className="text-2xl font-bold">cesarFSjunior</h1>
                </Link>
                <Link href="/about" className="hover:text-foreground border-b-2 border-transparent hover:border-foreground transition-colors duration-300 h-">
                    About
                </Link>
                <a href='https://github.com/CesarFSJunior' target='_blank' rel='noopener noreferrer'>
                    <DiGithubBadge className="inline-block w-8 h-8 text-foreground" />
                </a>
                <GrActions className="inline-block w-6 h-6 text-foreground cursor-pointer" onClick={() => setIsActive(!isActive)} />
            </div>
        </header>
    )
}

