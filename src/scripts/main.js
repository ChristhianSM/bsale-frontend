import { getAllCategories, getAllProducts } from "../helpers/helpers.js";

// Variables
const searchForm = document.querySelector('.search-form');
const btnSearch = document.querySelector('#search-btn');
const shoppingCart = document.querySelector('.shopping-cart');
const btnCart = document.querySelector('#cart-btn');
const navbar = document.querySelector('.navbar');
const containerProducts = document.querySelector('.container-products');

let products = [];
let cart = [];

// Eventos
btnSearch.addEventListener("click", () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    // loginForm.classList.remove('active');
    // navbar.classList.remove('active');
})

btnCart.addEventListener("click", () =>{
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  // loginForm.classList.remove('active');
  // navbar.classList.remove('active');
})

document.addEventListener("DOMContentLoaded", async () => {
  showShoppingCart();
  getCategories();
  getProducts();
})

// Funciones
function showShoppingCart() {
  
}
async function getCategories() {
  const categories = await getAllCategories();
  categories.forEach( category => {
    const divCategory = document.createElement("div");
    divCategory.dataset.category = category.id
    divCategory.textContent = category.name;

    navbar.appendChild(divCategory)
  })
}

async function getProducts() {
  products = await getAllProducts();
  products.forEach( product => {
    const box = document.createElement("div");
    box.classList.add("box");

    const image = document.createElement("img");
    image.src = product.url_image;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const stars = document.createElement("div");
    stars.innerHTML = `
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half-alt"></i>
    `
    const price = document.createElement("div");
    price.textContent = product.price;

    const btnAddProduct = document.createElement("a");
    btnAddProduct.classList.add("btn")
    btnAddProduct.onclick = () => {
      addProductToCart(product.id);
    }
    btnAddProduct.textContent = "add to cart"

    box.appendChild(image);
    box.appendChild(title);
    box.appendChild(stars);
    box.appendChild(price);
    box.appendChild(btnAddProduct);

    containerProducts.appendChild(box)
  })
}

function addProductToCart(idProduct){
  const findProduct = products.find( product => product.id === idProduct);
  cart.push(findProduct);
}