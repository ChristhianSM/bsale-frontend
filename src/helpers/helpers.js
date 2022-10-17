
export const totalShoppingCart = (cart) => {
  return cart.reduce( (accumulator, current) => accumulator + current.price * current.quantity, 0);
}