"use client";
import { useCartStore } from '../stores/cartStore';  // Import cart store
import Image from 'next/image';

const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCartStore();

  if (totalItems === 0) return <p className='text-3xl text-center mt-12'>Your cart is empty</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Shopping Cart</h1>
      <div className="flex flex-col gap-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border border-slate-100 p-3">
            <div className="w-24 h-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="object-cover w-full h-full"  // Ensure the image fills the container
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg">{item.title}</h2>
              <p>${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-black">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                <span className="mx-2 bg-slate-200 text-black p-1 rounded-lg">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <button className="bg-red-600 text-white p-2 rounded" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-14">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 mt-5">Clear Cart</button>
      </div>
    </div>
  );
};

export default CartPage;
