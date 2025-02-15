const url = new URL(window.location.href);
const char_name = url.searchParams.get("name");

console.log(char_name);

document.getElementById("bg").innerHTML = '<source src="../res/elements/bg/anemo.webm" type="video/webm">';