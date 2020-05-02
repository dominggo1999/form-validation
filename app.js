const form = document.querySelector(".input-section form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password-again");


// Not very well solution

// Function
const showError = (element,message) =>{
    let formControl = element.parentElement;
    let errorMessage = formControl.querySelector("span");

    formControl.className = "form-control error";
    errorMessage.innerText = message;
}

const showSuccess = (element) =>{
    let formControl = element.parentElement;
    formControl.className = "form-control success";
}

const checkEmail = (email) =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

// Event Listener
// Pertama saat form di submit maka event perlu di cancel, agar sebelum dikirim ke backend maka dapat di validasi di front end
// e.preventDefault

form.addEventListener("submit",e=>{
    //Cancel event
    e.preventDefault();

    // Check username
    if(username.value.trim() === ""){
        showError(username, "Username is required");
    }else{
        showSuccess(username);
    }

    // Check email
    if(email.value === ""){
        showError(email, "Email is required");
    }else if(!checkEmail(email.value)){
        showError(email, "Email is invalid !");
    }else{
        showSuccess(email);
    }

    // Check password
    if(password.value.trim() ===""){
        showError(password, "Password is required");
    }else{
        showSuccess(password);
    }

    // Check password2
    if(password2.value.trim() === ""){
        showError(password2, "Confirm password is required");
    }else{
        showSuccess(password2);
    }
})