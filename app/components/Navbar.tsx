"use client";
import Link from 'next/link';
import Image from 'next/image';
import MemeLogo from '../../public/assets/meme-logo.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path: string) => {
        // setIsOpen(false);
        window.location.href = path;
    };

    return (
        <nav className="bg-white shadow-md relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className='flex items-center gap-2' onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
                            <span className="text-sm logo-text font-bold tracking-wide">
                                Meme<span className="text-primary"> Generator Nepal</span>
                            </span>
                            <Image
                                src={MemeLogo}
                                alt="Logo"
                                width={40}
                                height={40}
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <FontAwesomeIcon icon={faBars} className={` ${isOpen ? 'hidden' : 'block'} h-6 w-6`} />

                            {/* Close icon */}
                            <FontAwesomeIcon icon={faX} className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} />
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/custommeme" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900" onClick={(e) => { e.preventDefault(); handleNavigation('/custommeme'); }}>
                                Custom Meme
                            </Link>
                            {/* <Link href="/blog" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
                                Blog
                            </Link> */}
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }}>
                                About
                            </Link>
                            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>
                                Contact
                            </Link>
                            <Link href="/faq" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900" onClick={(e) => { e.preventDefault(); handleNavigation('/faq'); }}>
                                FAQ
                            </Link>
                            <Link href="/privacy" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900" onClick={(e) => { e.preventDefault(); handleNavigation('/privacy'); }}>
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-white z-50 shadow-lg`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link
                        href="/about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        onClick={(e) => { setIsOpen(false); e.preventDefault(); handleNavigation('/about'); }}
                    >
                        About
                    </Link>
                    <Link
                        href="/blog"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        onClick={(e) => { setIsOpen(false); e.preventDefault(); handleNavigation('/blog'); }}
                    >
                        Blog
                    </Link>
                    <Link
                        href="/contact"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        onClick={(e) => { setIsOpen(false); e.preventDefault(); handleNavigation('/contact'); }}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/faq"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        onClick={(e) => { setIsOpen(false); e.preventDefault(); handleNavigation('/faq'); }}
                    >
                        FAQ
                    </Link>
                    <Link
                        href="/privacy"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        onClick={(e) => { setIsOpen(false); e.preventDefault(); handleNavigation('/privacy'); }}
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;