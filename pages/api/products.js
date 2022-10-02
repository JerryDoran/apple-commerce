import { client } from '../../lib/sanity';

const query = `*[_type == "product"]{
    _id,
    ...
  } | order(_createdAt asc)`;

export default async function handler(req, res) {
  const products = await client.fetch(query);

  return res.status(200).json({ products });
}
