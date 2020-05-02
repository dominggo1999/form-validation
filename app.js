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

const getFieldName = (item) =>{
    let name = item.id;
    return name.slice(0,1).toUpperCase() + name.slice(1);
}

const isEmpty = (item) =>{
    return item.value.trim() === "";
}

const isRequired = (arr)=>{
    arr.forEach(item => {
        if(isEmpty(item)){
            showError(item, `${getFieldName(item)} is required`);
        }else{
            showSuccess(item);
        }
    });
}

const checkEmail = (email) =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let check =  re.test(String(email.value.trim()).toLowerCase());

    if(!check && !isEmpty(email) ){
        showError(email, `${getFieldName(email)} is invalid`);
    }else if(check && !isEmpty(email)){
        showSuccess(email);
    }
}

const checkLength = (item,min,max) =>{
    if(!isEmpty(item)){
        if(item.value.length < min ){
            showError(item, `${getFieldName(item)} must be at least ${min} characters`);
        }else if(item.value.length >= max ){
            showError(item, `${getFieldName(item)} must be less than ${max} characters`);
        }else{
            showSuccess(item);
        }
    }
}

const passwordMatched = (password1,password2) =>{
    if(!isEmpty(password1) && !isEmpty(password2)){
        if(password1.value !== password2.value){
            showError(password2,"Passwords do not match");
        }
    }
}


// Event Listener
// Pertama saat form di submit maka event perlu di cancel, agar sebelum dikirim ke backend maka dapat di validasi di front end
// e.preventDefault

form.addEventListener("submit",e=>{
    //Cancel event
    e.preventDefault();

    //Make array
    values = [username,email,password,password2]

    //Array check 
    isRequired(values);
    checkEmail(email);
    checkLength(username,3,25);
    checkLength(password,8,20);
    checkLength(password2,8,20);
    passwordMatched(password,password2);
})