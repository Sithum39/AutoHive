// src/utils/cart.js
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const addToCart = (product) => {
  let cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage")); // Navbar එක update වෙන්න Event එකක් trigger කරමු
};

export const removeFromCart = (productId) => {
  let cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));
};
