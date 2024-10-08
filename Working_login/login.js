import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, get, ref , child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "-----API KEY-------",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "79471128063",
    appId: "",
    measurementId: ""
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();
  const auth = getAuth(app);
  const dbref = ref(db);
 
 let Email = document.getElementById('login-email');
 let Password = document.getElementById('login-password');
 let LoginForm = document.getElementById('loginForm');
 
 let SignInUser = evt => {
    evt.preventDefault();

    // Log the value of Email to check if it's defined and capturing the correct value
    console.log("Email value:", Email.value);

    signInWithEmailAndPassword(auth, Email.value, Password.value)
    .then((Credential) =>{
        get(child(dbref, 'UserAuthList/' + Credential.user.uid)).then((snapshot) => {
            if(snapshot.exists){
                sessionStorage.setItem("user-info", JSON.stringify({
                    firstname : snapshot.val().firstname,
                    lastname : snapshot.val().lastname,
                    email : snapshot.val().email // Changed 'Email' to lowercase 'email'
                }));
                sessionStorage.setItem("user-creds", JSON.stringify(Credential.user));
                //window.location.href = '/html/index.html'; add your path after login
            } else {
                console.log("User data not found in the database.");
            }
        }).catch((error) => {
            console.log("Error retrieving user data:", error);
        });
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    });
}
 
 LoginForm.addEventListener('submit' , SignInUser );
 