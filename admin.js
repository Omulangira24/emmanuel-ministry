/* ===========================
   IMPORTS (MUST BE AT TOP)
=========================== */

import { getAuth, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


console.log("✅ ADMIN JS IS RUNNING");


/* ===========================
   AUTH PROTECTION
=========================== */

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});


/* ===========================
   PUBLISH SERMON
=========================== */

const publishButton = document.getElementById("publish");

if (publishButton) {

  publishButton.addEventListener("click", async () => {

    const title = document.getElementById("title").value;
    const sermon = document.getElementById("message").value;

    if (!title || !sermon) {
      document.getElementById("status").innerHTML =
        "Please fill all fields.";
      return;
    }

    try {

      await addDoc(collection(db, "sermons"), {
        title: title,
        sermon: sermon,
        date: new Date()
      });

      document.getElementById("status").innerHTML =
        "✅ Sermon published successfully!";

      document.getElementById("title").value = "";
      document.getElementById("message").value = "";

      loadSermons();

    } catch (error) {

      document.getElementById("status").innerHTML =
        error.message;

    }

  });

}


/* ===========================
   LOAD SERMONS
=========================== */

async function loadSermons() {

  const sermonList = document.getElementById("sermonList");
  if (!sermonList) return;

  try {

    const snapshot = await getDocs(collection(db, "sermons"));

    if (snapshot.empty) {
      sermonList.innerHTML = "<p>No sermons yet.</p>";
      return;
    }

    sermonList.innerHTML = "";

    snapshot.forEach((documentData) => {

      const sermon = documentData.data();
      const id = documentData.id;

      sermonList.innerHTML += `
        <div class="dashboard-card">
          <h3>${sermon.title}</h3>
          <p>${sermon.sermon}</p>
          <button onclick="deleteSermon('${id}')">Delete</button>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading sermons:", error);
  }
}


/* ===========================
   DELETE SERMON
=========================== */

window.deleteSermon = async function(id) {

  if (!confirm("Delete this sermon?")) return;

  await deleteDoc(doc(db, "sermons", id));

  loadSermons();
};


/* ===========================
   LOAD PRAYER REQUESTS
=========================== */

async function loadPrayerRequests() {

  const prayerList = document.getElementById("prayerList");
  if (!prayerList) return;

  try {

    const snapshot = await getDocs(
      collection(db, "prayerRequests")
    );

    if (snapshot.empty) {
      prayerList.innerHTML = "<p>No prayer requests yet.</p>";
      return;
    }

    prayerList.innerHTML = "";

    snapshot.forEach((documentData) => {

      const prayer = documentData.data();

      prayerList.innerHTML += `
        <div class="dashboard-card">
          <h3>${prayer.name}</h3>
          <p><strong>Email:</strong> ${prayer.email}</p>
          <p>${prayer.prayer}</p>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading prayer requests:", error);
    prayerList.innerHTML = "Error loading prayer requests.";
  }

}


/* ===========================
   INITIAL LOAD
=========================== */

loadSermons();
loadPrayerRequests();