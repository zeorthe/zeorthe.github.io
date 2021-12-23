let images = [...document.querySelectorAll('.supply-img')];
let slider = document.querySelector('.slider');
let swidth;
let imgwidth;
let current = 0;
let target = 0;
let ease = .05;

window.addEventListener('resize', init);

images.forEach((img, idx) => {
    img.style.backgroundImage = `url(./images/equip/${idx+1}.jpg)`
})

function lerp(start, end, t) {
    return start * (1-t) + end * t;
}

function settransform(el, transform) {
    el.style.transform = transform;
}

function init(){
    swidth = slider.getBoundingClientRect().width;
    imgwidth = swidth / images.length;
    document.body.style.height = `${swidth - (window.innerWidth - window.innerHeight)}px `
}

function supplyAnimate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    settransform(slider, `translateX(-${current}px)`)
    supplyAnimateImage();
    requestAnimationFrame(supplyAnimate);
}

function supplyAnimateImage(){
    let ratio = current / imgwidth;
    let intersectionRatioValue;

    images.forEach((image, idx) => {
        intersectionRatioValue = ratio - (idx * 0.7);
        settransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

init();
supplyAnimate();