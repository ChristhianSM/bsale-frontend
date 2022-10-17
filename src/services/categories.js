import { BASE_URI } from "../config.js";

export const getAllCategories = async () => {
  const response = await fetch(`${BASE_URI}/categories`);
  const { status, data, message} = await response.json();

  if (!(status === 200)) console.log(message);
  return data.categories
}