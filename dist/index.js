"use strict";
const btn = document.getElementById("btn");
const todoinput = document.getElementById("todoinput");
const form = document.querySelector("form");
form.addEventListener("submit", function () {
    console.log("submitted");
});
// btn.addEventListener("click", () => {
//     alert(todoinput.value);
//     todoinput.value = "";
// });
