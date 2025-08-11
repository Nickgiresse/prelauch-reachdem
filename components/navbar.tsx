"use client"
import Link from "next/link"


interface NavbarProps {
    href: string;
    nom?: string;
}

const Navbar = ({ href, nom }: NavbarProps) => {
   
    
    return (
        <nav className="m-4">
            <Link 
                href={href} 
                className={ "font-medium hover:font-bold hover:text-black text-gray-400"}
            >
                {nom}
            </Link>            
        </nav>
    )
}

export default Navbar;