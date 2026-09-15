'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from './Logo';
import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import MobileNav from './mobile-nav';

const MainNav = ({ items, children }) => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);



    return (
        <>
            <div className='flex gap-6 lg:gap-10'>
                <Link href="/">
                    <Logo />
                </Link>
                {
                    items?.length ? (
                        <nav className='hidden gap-6 lg:flex'>
                            {
                                items?.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.disable ? "#" : item.href}
                                        className={cn("flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm ")}
                                    >
                                        {item.title}
                                    </Link>
                                ))
                            }
                        </nav>
                    ) : null
                }

                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}

            </div>

            <nav className="flex items-center gap-3">
                <div className="items-center gap-3 hidden lg:flex">

                    <Link
                        href="/login"
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "px-4"
                        )}
                    >
                        Login
                    </Link>

                    {/* Register Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "sm",
                                })
                            )}
                        >
                            Register
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-56 mt-4"
                        >
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="">Student</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="">Instructor</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="cursor-pointer rounded-full outline-none"
                    >
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shafiul"
                            />
                            <AvatarFallback>EL</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-56 mt-4"
                    >
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="/account">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="/account/enrolled-courses">
                                My Courses
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="">
                                Testimonials & Certificates
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="">
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu */}
                <button
                    className="flex items-center space-x-2 lg:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <X /> : <Menu />} 
                </button>
            </nav>

        </>


    );
};

export default MainNav;