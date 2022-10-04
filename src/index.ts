const btn = document.getElementById("btn")! as HTMLButtonElement;
const todoinput = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;

form.addEventListener("submit", function () {
    console.log("submitted");
});

// btn.addEventListener("click", () => {
//     alert(todoinput.value);
//     todoinput.value = "";
// });
