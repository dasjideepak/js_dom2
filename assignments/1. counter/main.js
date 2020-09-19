let value = 0;
var increment = document.querySelector(".inc-btn");
increment.addEventListener("click", function(){
    value++
    document.querySelector("h1").textContent = value;
});

var decrement = document.querySelector(".dec-btn");
decrement.addEventListener("click", function(){
    if (value > 0 ) {
        value--
        } 
    document.querySelector("h1").textContent = value;
});

var reset = document.querySelector(".res-btn");
reset.addEventListener("click", function(){
    value = 0;
    document.querySelector("h1").textContent = value;
});
