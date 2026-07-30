import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const sermonsList = document.getElementById("sermons-list");

async function loadSermons() {

    const querySnapshot = await getDocs(collection(db, "sermons"));

    querySnapshot.forEach((doc) => {

        const sermon = doc.data();

        sermonsList.innerHTML += `
        <div class="card">
            <h2>${sermon.title}</h2>
            <p>${sermon.sermon}</p>
        </div>
        `;

    });

}

loadSermons();