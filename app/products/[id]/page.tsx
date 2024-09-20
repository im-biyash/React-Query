"use client";
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import useCartStore from  "../../stores/cartStore"



interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const fetchProduct = async (id: number) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};

const ProductPage = () => {
  const { id } = useParams();
  const productId = id ? parseInt(id as string) : -1;
  const[value,setValue] = useState(1)
  
  const decrease = () => setValue((prev) => Math.max(1, prev - 1));
  const increase = () => setValue((prev) => prev + 1);
  
  const {addToCart} = useCartStore();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error instanceof Error ? error.message : "An error occurred"}</p>;
  if (!product) return <p>Product not found</p>;

  const handleCart = () =>{
    addToCart({
      id:product.id,
      title:product.title,
      price:product.price,
      image: product.image,
      quantity:1
    })
  };

  return (
    <div className="container mx-auto py-3 flex items-center justify-center min-h-screen">
      <div className="lg:w-4/5 w-full lg:flex  flex-wrap items-center">
        {/* Image Section */}
        <div className="lg:w-1/2 w-[300px] lg:h-[400px] h-64 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            width={500} // Adjust width as needed
            height={450} // Adjust height as needed
            className="w-full h-full object-cover rounded"
          />
        </div>
        {/* Details Section */}
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col justify-between">
          <div>
            <h1 className="text-xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <div className="flex mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className={`w-4 h-4 ${
                    product.rating?.rate >= index + 1
                      ? "text-indigo-500"
                      : "text-gray-400"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-gray-600 ml-3">
                {product.rating?.rate} ({product.rating?.count} reviews)
              </span>
            </div>
            <p className="leading-relaxed mb-6">{product.description}</p>
          </div>
          {/* Quantity and Action Buttons */}
          <div className="flex flex-col mt-6 pb-5 border-b-2  mb-5">
            <div className="flex items-center mb-4">
              <span className="mr-3">Size</span>
              <select className=" text-black rounded border appearance-none  py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div className="flex items-center mb-4">
              <h1 className="mr-3">Quantity:</h1>
              <button
                className="text-black font-bold p-1 w-8 h-8 rounded-lg bg-red-400"
                onClick={decrease}
              >
                -
              </button>
              <input
                className="w-12 border rounded text-center text-black mx-2"
                type="text"
                readOnly
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
              />
              <button
                className="text-black font-bold p-1 w-8 h-8 rounded-lg bg-green-400"
                onClick={increase}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <span className="title-font font-medium text-2xl  mr-4">
              ${product.price.toFixed(2)}
            </span>
            <button
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
             onClick={handleCart} >
              Add to Cart
            </button>
            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
