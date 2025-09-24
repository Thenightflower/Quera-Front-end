const square = document.getElementById("square");

let topPos = parseInt(getComputedStyle(square).top);
let leftPos = parseInt(getComputedStyle(square).left);

document.addEventListener("keydown", function (event) {
    const step = event.shiftKey ? 10 : 1;

    switch (event.key) {
        case "ArrowUp":
            topPos -= step;
            break;
        case "ArrowDown":
            topPos += step;
            break;
        case "ArrowLeft":
            leftPos -= step;
            break;
        case "ArrowRight":
            leftPos += step;
            break;
        default:
            return;
    }

    square.style.top = topPos + "px";
    square.style.left = leftPos + "px";
});
