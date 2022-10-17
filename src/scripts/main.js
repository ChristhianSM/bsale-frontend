import { totalShoppingCart } from "../helpers/helpers.js";
import { getAllCategories } from "../services/categories.js";
import { getAllProducts, getProductsByCategory, getProductsByQuery } from "../services/products.js";

// Variables
const searchForm = document.querySelector('.search-form');
const btnSearch = document.querySelector('#search-btn');
const inputSearch = document.querySelector('#search-box');
const shoppingCart = document.querySelector('.shopping-cart');
const btnCart = document.querySelector('#cart-btn');
const navbar = document.querySelector('.navbar');
const containerProducts = document.querySelector('.container-products');
const containerShoppingCart = document.querySelector('.container-products-cart');
const totalCart = document.querySelector('.total');

let products = [];
let cart = [];

// Eventos
btnSearch.addEventListener("click", () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
})

btnCart.addEventListener("click", () =>{
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
})

document.addEventListener("DOMContentLoaded", async () => {
  showShoppingCart();
  await getCategories();
  getProducts();
  listenCategories();
  listenSearch();
})

// Funciones
function showShoppingCart(cart = []) {
  containerShoppingCart.innerHTML = "";
  if (cart.length === 0) {
    const cartEmpty = document.createElement("i");
    cartEmpty.className = "fas fa-shopping-cart";
    const content = document.createElement("p");
    content.textContent = "Shopping Cart Empty"
    containerShoppingCart.appendChild(cartEmpty)
    containerShoppingCart.appendChild(content)
  }else{
    cart.forEach( product => {
      const box = document.createElement("div");
      box.classList.add("box");
  
      const btnDelete = document.createElement("i");
      btnDelete.className = "fas fa-trash";
  
      btnDelete.onclick = () => {
        deleteProduct(product.id);
      }
  
      const image = document.createElement("img");
      image.src = product.url_image;
  
      const content = document.createElement("div");
      content.classList.add("content");
  
      const title = document.createElement("h3");
      title.textContent = product.name;
  
      const price = document.createElement("span");
      price.textContent = `Price: ${product.price - product.price * product.discount / 100} - `;
  
      const quantity = document.createElement("span");
      quantity.textContent = `Quantity: ${product.quantity}`;
  
      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(quantity);
  
      box.appendChild(btnDelete);
      box.appendChild(image);
      box.appendChild(content);
  
      containerShoppingCart.appendChild(box);
    })
  }
  totalCart.textContent = `Total: $ ${totalShoppingCart(cart)}`
}
async function getCategories() {
  const categories = await getAllCategories();
  categories.forEach( category => {
    const divCategory = document.createElement("div");
    divCategory.classList.add("btn-category");
    divCategory.dataset.category = category.id
    divCategory.textContent = category.name;

    navbar.appendChild(divCategory)
  })
}
async function getProducts() {
  products = await getAllProducts();
  showProductsInHtml(products);
}
function showProductsInHtml(products){
  containerProducts.innerHTML = "";
  products.forEach( product => {
    const box = document.createElement("div");
    box.classList.add("box");

    const discount = document.createElement("div");
    discount.classList.add("discount");
    discount.textContent = `${product.discount}%`

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
    const containerPrice = document.createElement("div");
    containerPrice.classList.add("container-price")
    const price = document.createElement("p");
    price.classList.add("price")
    if (!(product.discount === 0)) {
      price.textContent = `$ ${product.price}`;
    }
    const priceWithDiscount = document.createElement("p");
    priceWithDiscount.classList.add("price-discount");
    priceWithDiscount.textContent = `$ ${product.price  - product.price * product.discount / 100}`

    const btnAddProduct = document.createElement("a");
    btnAddProduct.classList.add("btn")
    btnAddProduct.onclick = () => {
      addProductToCart(product.id);
    }
    btnAddProduct.textContent = "add to cart"

    if (!(product.discount === 0)) {
      box.appendChild(discount);
    }

    containerPrice.appendChild(price);
    containerPrice.appendChild(priceWithDiscount);
    box.appendChild(image);
    box.appendChild(title);
    box.appendChild(stars);
    box.appendChild(containerPrice);
    box.appendChild(btnAddProduct);

    containerProducts.appendChild(box)
  })
}
function listenCategories() {
  const btnsCategory = document.querySelectorAll(".btn-category")
  btnsCategory.forEach( btnCategory => {
    btnCategory.addEventListener("click", async () => {
      const idCategory = btnCategory.dataset.category;
      const data = await getProductsByCategory(idCategory);
      products = data;
      showProductsInHtml(products);
    })
  })
}
function listenSearch() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  })
  inputSearch.addEventListener("input", async () => {
    if (inputSearch.value === "") {
      products = await getAllProducts();
    }else{
      const data = await getProductsByQuery(inputSearch.value);
      products = data;
    }
    showProductsInHtml(products)
  })
}
function addProductToCart(idProduct){
  let findProduct = products.find( product => product.id === idProduct);

  //Buscamos si el producto ya esta agregado
  const productExist = cart.some( product => product.id === idProduct);
  if (!productExist) {
    findProduct.quantity = 1;
    cart.push(findProduct);
  }else {
    cart = cart.map( product => {
      if (product.id === idProduct) product.quantity += 1;
      return product
    })
  }
  
  showShoppingCart(cart);
}
function deleteProduct(idProduct){
  cart = cart.filter( product => product.id !== idProduct);
  showShoppingCart(cart);
}