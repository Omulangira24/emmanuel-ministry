import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const sendPrayer = document.getElementById("sendPrayer");

sendPrayer.addEventListener("click", async () => {

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const prayer = document.getElementById("prayer").value;

    if (name === "" || email === "" || prayer === "") {
        alert("Please fill in all fields.");
        return;
    }

    try {

        await addDoc(collection(db, "prayerRequests"), {

            name: name,

            email: email,

            prayer: prayer,

            createdAt: serverTimestamp()

        });

        alert("🙏 Your prayer request has been sent successfully!");

        document.getElementById("name").value = "";

        document.getElementById("email").value = "";

        document.getElementById("prayer").value = "";

    } catch (error) {

        alert("Error: " + error.message);

    }

});