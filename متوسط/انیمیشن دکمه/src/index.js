document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('moving-box');
    const btn = document.getElementById('toggle-animation');

    const distance = 300;
    const duration = 2000;
    //   تقریباً تمام مرورگرها (و حتی تلویزیون‌ها، مانیتورها و بازی‌ها) با نرخ ۶۰ فریم در ثانیه (FPS) کار میکنن.
    // یعنی در هر ثانیه، حدود ۶۰ تصویر جدید رسم میشه تا چشم انسان حس "حرکت روان" رو داشته باشه.
    // اگر در یک ثانیه (۱۰۰۰ میلی‌ثانیه) بخوای ۶۰ فریم نمایش بدی:
    // 1000ms/60frame=~16.66ms        زمان هر فریم:
    const tick = 16;
    const steps = duration / tick;  // 2000 / 16 = 125
    const stepPx = distance / steps; // 300 / 125 = 2.4

    let intervalId = null;
    let direction = 1; // 1 = به سمت راست، -1 = به سمت چپ
    let currentLeft = 0;

    const computedLeft = parseFloat(window.getComputedStyle(box).left);
    if (!Number.isNaN(computedLeft)) currentLeft = computedLeft;

    function startAnimation() {
        if (intervalId) return;
        intervalId = setInterval(() => {
            currentLeft += direction * stepPx;

            if (currentLeft >= distance) {
                currentLeft = distance;
                direction = -1;
            } else if (currentLeft <= 0) {
                currentLeft = 0;
                direction = 1;
            }

            box.style.left = currentLeft + 'px';
        }, tick);

        btn.textContent = 'Pause Animation';
    }

    function stopAnimation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        btn.textContent = 'Start Animation';
    }

    btn.addEventListener('click', () => {
        if (intervalId) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });
});
