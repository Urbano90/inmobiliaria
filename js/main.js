

let menuBtn = document.querySelector(".menu--btn");
let menu = document.querySelector(".img-menu");
let cerrar = document.querySelector(".img-cerrar");
let navbar = document.getElementById("navbar"); /* puede ser tambien con la clase como lo de arriba */
let nombre = document.getElementById("nombre").value;
let correo = document.getElementById("correo").value;

let enviarMensaje = document.getElementById("enviarMensaje");


/****Hacemos que se cambien los iconos del menu y cerrar menu al presionar los icon*****/
menu.addEventListener("click", function() {
    navbar.classList.toggle("active");
    document.querySelector(".img-menu").style.display = "none";
    document.querySelector(".img-cerrar").style.display = "block";
    
});

cerrar.addEventListener("click", function () {
    navbar.classList.remove("active");
    document.querySelector(".img-menu").style.display = "block";
    document.querySelector(".img-cerrar").style.display = "none";
});


/****cambiamos el icono del cerrar menu a menu al hacer click el navbar ****/
navbar.addEventListener("click", function() {
    navbar.classList.remove("active");
    document.querySelector(".img-cerrar").style.display="none";
    document.querySelector(".img-menu").style.display = "block";
});




/***Si el scroll es mayor que 0 activa la classe header que tiene el box-sadow */
window.onscroll = () => {
    if(window.scrollY > 0) {
        document.querySelector(".header").classList.add("active");
    } else {
        document.querySelector(".header").classList.remove("active");
    }
    navbar.classList.remove("active");
};

window.onload = () => {
    if(window.scrollY > 0) {
        document.querySelector(".header").classList.add("active");
    } else {
        document.querySelector(".header").classList.remove("active");
    }
   
};

  enviarMensaje.addEventListener("click", function(e) {
    if(nombre === "" || correo === "" || mensaje === "") {
       alert("rellene los campos");
     }
     else {
        (nombre.value === "" || correo === "" || mensaje === "");
     }
     e.preventDefault();
  })
    

