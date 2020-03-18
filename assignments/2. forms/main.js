let name = document.querySelector(".name");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let warning = document.querySelector(".warning");
let signUp = document.querySelector(".btn");


signUp.addEventListener("click", function signUpFor(event) {
    event.target.preventDefault;
    
    if(name.value === "") {
        warning.innerText = "Name cannot be empty";
    } else if (email.value === "") {
        warning.innerText = "Email cannot be empty";
    } else if(password.value === "") {
        warning.innerText = "Password cannot be empty";
    } else {
        alert(`You are ${name.value}, Your email address is: ${email.value} and password is ${password.value} `);
    }
});    
