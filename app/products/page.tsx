  "use client";
  import React from "react";
  import { useQuery } from "@tanstack/react-query";
  import Link from "next/link";
  import Image from "next/image";

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

  const url = "https://fakestoreapi.com/products";
  const fetchProducts = async () => {
    const response = await fetch(url);
    return response.json(); // returns an array of products directly
  };

  const Products = () => {
    const {
      isLoading,
      error,
      data: products,
    } = useQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      staleTime: 10000, // Cache data for 10 seconds
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div className="p-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products &&
            products.map((product: Product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="shadow-lg border-1 rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover"
                  />
                  <div className="card p-3 h-[100px] border-1">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h2>
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-4 text-yellow-500">
                        {product.rating.rate.toFixed(1)}{" "}
                        <span className="text-gray-400">
                          ({product.rating.count} reviews)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  };

  export default Products;
