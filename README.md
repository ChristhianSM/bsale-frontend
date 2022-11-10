# BSale Licoreria

Tienda virtual, donde podras encontrar diferentes productos tales como: Bebidas Energeticas, Piscos, Rones, Snacks, Cervezas y más.
Aplicacion adaptada a los diferentes dispositivos mobiles tales como celulares, tablets y computadoras de escritorio.

## Explicacion del proyecto 
Se planteo contruir una tienda online basada en productos que se encuentran alojados en una base de datos Mysql, para ello se desarrollo una REST API que se conecta a esta base de datos y un front para poder consumir dichos recursos mediante fetch, este proyecto tiene la funcionalidad de mostrar al usuario todos los productos traidos de la base de datos, tambien se podra visualizar las categorias de la tienda, asi como realizar filtros trayendo los productos que pertenecen a dicha categoria. El usuario podra buscar productos por medio de un termino de busqueda, podra agregar productos a su carrito de compras.

## Que puedo hacer en BSale Licoreria :

* Visualizar todos los productos que la tienda ofrece
* Agregar, eliminar y actualizar cantidad de productos al carrito de compras.
* Busqueda de productos por Palabra.
* Busqueda de productos por categoria (Pisco, Ron, Snack, etc).
* Eliminacion de filtros.

## Construido con
* HTML
* CSS
* JavaScript

## Temas comprendidos

* Vanilla Js
* Consumo de apis (fetch)

## Demo: 

<div align="center" style="margin-bottom:30px">
  <img src="https://github.com/ChristhianSM/bsale-frontend/blob/main/src/assets/imagen1.PNG" width="400" title="hover text">
  <img src="https://github.com/ChristhianSM/bsale-frontend/blob/main/src/assets/imagen2.PNG" width="400" title="hover text">
  <img src="https://github.com/ChristhianSM/bsale-frontend/blob/main/src/assets/imagen3.PNG" width="400" title="hover text">
</div>
`

### Instalacion

1. Clone el repositorio 
   ```sh
   git clone https://github.com/ChristhianSM/bsale-frontend.git
   ```
2. Ingrese a la carpeta del proyecto, luego a la carpeta src, abra el archivo index.html e inicie un servidor local con Live Server. Puede cambiar la variable BASE_URI en el archivo config.js.
   ```js
   const BASE_URI = 'https://api-bsaletest.herokuapp.com/';
   ```

### LICENCIA

Licencia MIT Copyright (c) 2022, Christhian Silupú Moscol.
