import { BASE_URI } from "../config.js";

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URI}/products`);
  const { status, data, message} = await response.json();

  if (!(status === 200)) console.log(message);
  return data.products
}

export const getProductsByCategory = async(idCategory) => {
  const response = await fetch(`${BASE_URI}/products/category/${idCategory}`);
  const { status, data, message} = await response.json();

  if (!(status === 200)) console.log(message);
  return data
}

export const getProductsByQuery = async (query) => {
  const response = await fetch(`${BASE_URI}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({query})
  });
  const { status, data, message} = await response.json();

  if (!(status === 200)) console.log(message);
  return data
}