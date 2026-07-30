document.addEventListener("DOMContentLoaded", function(){

    console.log("Welcome to Min. Emmanuel Mulangira Website");

});



const button = document.getElementById("theme-toggle");

button.onclick = function(){

document.body.classList.toggle("dark-mode");

};


const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");


menuToggle.onclick = function(){

    navMenu.classList.toggle("active");

};

function login(){

let username = document.getElementById("username").value;

let password = document.getElementById("password").value;

if(username === "admin" && password === "12345"){

window.location.href = "admin.html";

}else{

document.getElementById("message").innerHTML =
"Incorrect username or password.";

}

}


document
.getElementById("sendPrayer")
.addEventListener("click", function(){

alert("Prayer request sent successfully!");

});

