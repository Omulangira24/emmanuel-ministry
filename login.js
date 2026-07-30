import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const loginButton = document.querySelector("button");

loginButton.addEventListener("click", () => {

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "admin.html";
        })
        .catch((error) => {
            document.getElementById("message").innerHTML =
                error.message;
        });

});