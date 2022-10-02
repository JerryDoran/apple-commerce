export const fetchCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
  );

  const data = await response?.json();
  const { categories } = data;

  return categories;
};
