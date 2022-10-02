export const fetchProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );

  const data = await response?.json();
  const { products } = data;

  return products;
};
