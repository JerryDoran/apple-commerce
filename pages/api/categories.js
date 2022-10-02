// import groq from 'next-sanity';
import { client } from '../../lib/sanity';

const query = `*[_type == "category"]{
    _id,
    ...
  }`;

export default async function handler(req, res) {
  const categories = await client.fetch(query);

  return res.status(200).json({ categories });
}
