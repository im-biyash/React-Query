'use client'
import React from 'react'
import { FaCartArrowDown } from "react-icons/fa";
import { useCartStore } from '../stores/cartStore'; 
import Link from "next/link"

const Navbar = () => {
  const { totalItems } = useCartStore();
  return (
    <div className="py-5 w-full flex items-center justify-evenly">
      <ul className='flex items-center justify-between gap-3'>
        <li>Home</li>
        <li>Products</li>
      </ul>
      <div className="relative">
        <Link href="/cart" className="text-2xl relative">
          <FaCartArrowDown />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
