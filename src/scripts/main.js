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
const containerEmpty= document.querySelector('.container-empty');
const containerShoppingCart = document.querySelector('.container-products-cart');
const totalCart = document.querySelector('.total');
const filterText = document.querySelector('.filter');
const toast = document.getElementById('toasts');

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

// Evento para realizar cargas iniciales como obtener las categorias, los productos y escuchar eventos al iniciar la pagina web
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

  // Verificamos si el carrito de compras esta vacio, en caso de estar vacio, mostrar el mensaje "Shopping Cart Empty", si el carrito esta con productos, entonces renderizar dichos productos.
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

// Obtener las categorias de la base de datos.
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

// Obtener todos los productos de la bd y mostrarlos en el html.
async function getProducts() {
  products = await getAllProducts();
  showProductsInHtml(products);
}

// Mostrar los productos, en caso de que no haya productos, mostrar un mensaje en pantalla, si hay productos, renderizarlos en un grid.
function showProductsInHtml(products){
  containerProducts.innerHTML = "";
  if (products.length === 0) {
    containerEmpty.textContent = "No hay productos con dicha busqueda, por favor intente con otro termino de busqueda"
    document.querySelector(".product-wrapper").appendChild(containerEmpty);
  }else {
    containerEmpty.textContent = "";
    products.forEach( product => {
      const box = document.createElement("div");
      box.classList.add("box");
  
      const discount = document.createElement("div");
      discount.classList.add("discount");
      discount.textContent = `${product.discount}%`
  
      const image = document.createElement("img");
      image.src = product.url_image ? product.url_image :"../assets/no-disponible.png"; 
  
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
}

// Funcion para escuchar los eventos de click al presionar en alguna categoria, para asi poder llamar a la bd y obtener los productos unicamente de dicha categoria, luego mostrarlos en el html.
function listenCategories() {
  const btnsCategory = document.querySelectorAll(".btn-category")
  btnsCategory.forEach( btnCategory => {
    btnCategory.addEventListener("click", async () => {
      const idCategory = btnCategory.dataset.category;
      const data = await getProductsByCategory(idCategory);
      products = data;
      showProductsInHtml(products);

      // Mostramos el texto del filtro que seleccionamos
      filterText.classList.remove("none");
      filterText.textContent = btnCategory.textContent;
    })
  })
}

// Escuchar el input de busqueda, para asi traer los productos que complan unicamente con el termino de busqueda.
function listenSearch() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  })
  inputSearch.addEventListener("input", async () => {

    if (inputSearch.value === "") {
      // Si no hay termino de busqueda, ocultamos el texto
      filterText.classList.add("none");
      products = await getAllProducts();
    }else{
      // Mostramos el texto del termino de busqueda a filtrar
      filterText.classList.remove("none");
      filterText.textContent = inputSearch.value;

      const data = await getProductsByQuery(inputSearch.value);
      products = data;
    }
    showProductsInHtml(products)
  })
}

// Funcion para poder agregar un producto al carrito de compras, cuando se agrega un producto se lanza una notificacion de producto agregado, en caso de que el producto ya haya sido agregado con anterioridad, unicamente se actualizara la cantidad a comprar, tambien lanzado una notifiacion. 
function addProductToCart(idProduct){
  let findProduct = products.find( product => product.id === idProduct);

  //Buscamos si el producto ya esta agregado
  const productExist = cart.some( product => product.id === idProduct);
  if (!productExist) {
    findProduct.quantity = 1;
    cart.push(findProduct);
    showToast("Producto agregado correctamente", "success");
  }else {
    cart = cart.map( product => {
      if (product.id === idProduct) product.quantity += 1;
      return product
    })
    showToast("Producto actualizado correctamente", "success");
  }
  
  showShoppingCart(cart);
}

// Funcion para eliminar un producto de mi carrito de compras, lanzando notificiacion de eliminacion.
function deleteProduct(idProduct){
  showToast("Producto eliminado correctamente", "warning");
  cart = cart.filter( product => product.id !== idProduct);
  showShoppingCart(cart);
}

// Muestra una notificacion con un determinado mensaje.
function showToast (messaje, type){
  toast.textContent = messaje;
  toast.classList.add(type);
  setTimeout(() => {
    toast.textContent = "";
    toast.classList.remove(type);
  }, 2000);
}

