"use client"

import Link from "next/link";
import ListItem from '../drop_down_item_list/page';
import { useEstadoGlobal } from '../state_provider/page';


export default function DropDown() {

    const { valor } = useEstadoGlobal()

    return ( 
        <section 
            className={`min-h-screen pt-16 w-full bg-background absolute origin-top md:hidden transition duration-100 ease-out
                ${valor
                ? 'opacity-100 translate-y-0 pointer-events-auto z-40'
                : 'opacity-0 -translate-y-8 pointer-events-none'}`}
        >
            <ul className="min-h-[calc(100vh-4rem)] top-4 px-8 flex flex-col items-center gap-4" >
                <ListItem>
                    <Link href="/about">
                        About
                    </Link>
                </ListItem>
                <ListItem>
                    <a href='https://github.com/CesarFSJunior' target='_blank' rel='noopener noreferrer'>
                        Github
                    </a>
                </ListItem>
                <ListItem>
                    <a href='https://www.linkedin.com/in/cesar-francisco/' target='_blank' rel='noopener noreferrer'>
                        Linkedin
                    </a>
                </ListItem>
            </ul>
        </section>
    )
}

