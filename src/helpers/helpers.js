export const getAllCategories = async () => {
  const response = await fetch("http://localhost:5000/api/categories");
  const { status, data, message} = await response.json();

  if (!(status === 200)) console.log(message);
  return data.categories
}

export const getAllProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  const { status, data, message} = await response.json();

  if (!(status === 200)) console.log(message);
  return data.products
}

export const totalShoppingCart = (cart) => {
  return cart.reduce( (accumulator, current) => accumulator + current.price * current.quantity, 0);
}