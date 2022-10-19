export const fetchLineItems = async (sessionId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/session?session_id=${sessionId}`
  );

  if (!response.ok) return;

  const data = await response.json();
  const products = data.session.data;

  return products;
};
