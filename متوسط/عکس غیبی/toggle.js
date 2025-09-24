function toggle_btn_img() {
    const avatar = document.getElementById("avatar");
    const btn = document.getElementById("btn");

    avatar.classList.toggle("w3-hide");

    if (avatar.classList.contains("w3-hide")) {
        btn.innerText = "Show!";
    } else {
        btn.innerText = "Hide!";
    }
}
