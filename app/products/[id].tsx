"use client"; // Required for App Router
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';


const ProductDetail = () => {
  const { id } = useParams(); // Extract `id` from the URL
  const params = useParams();
  const fetchProductById = async (id: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    return response.json();
  };
  const { isLoading, error, data: product } = useQuery({
    queryKey: ["products", params.id],
    queryFn: () => fetchProductById(id as string), // Pass `id` to the fetch function
    enabled: !!id, // Only run query when `id` is available
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <img src={product.image} alt={product.title} />
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
  );
};

export default ProductDetail;
