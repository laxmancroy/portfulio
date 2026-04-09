import { useState } from 'react';

import { AiOutlineMenu, AiOutlineHdd } from 'react-icons/ai';



const navBar = [
    {href: '#home', label: 'Home'},
    {href: '#about', label: 'About'},
    {href: '#skills', label: 'Skills'},
    {href: '#projects', label: 'Projects'},
    {href: '#blog', label: 'Blog'},
    {href: '#contact', label: 'Contact'},
];
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="shadow-md py-4" id="header">
            {/* Mobile Header */}
            <div className="container mx-auto flex justify-between align-middle px-2">
            <div>laxmancr</div>
            <div className="grid place-items-center md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}><AiOutlineMenu size="16" /></div>

            {/* Desktop Navigation bar */}
            <div className="hidden md:flex justify-between align-middle ">
                {
                    navBar.map((link) => (
                        <a href={link.href} key={link.href} className="px-4 hover:bg-zinc-300 focus:bg-blue-400 focus:text-white rounded-md">{link.label}</a>
                    ))
                }
            </div>

            {/* Mobile Menu Navigation bar */}
            {isMenuOpen && <div className="md:hidden bg-amber-300 flex flex-col absolute right-0 top-0 shadow-lg p-5 h-full overflow-hidden">
                <span className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}><AiOutlineHdd /></span>
                {
                    navBar.map((link) => (
                        <a href={link.href} key={link.href} className="px-4 hover:bg-zinc-300 my-3 mx-8 focus:bg-blue-400 focus:text-white rounded-md">{link.label}</a>
                    ))
                }
            </div>}
            </div> 
        </header>
    )
}