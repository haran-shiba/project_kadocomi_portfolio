// ヒーロースライドショーの自動切り替え

const heroTrack = document.querySelector(".hero-track");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelector(".hero-dots");

let currentSlideIndex = 0;

// スライドの数だけドットを作成する
heroSlides.forEach(function (slide, index) {
    const dot = document.createElement("span");
    dot.classList.add("hero-dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    heroDots.appendChild(dot);
});

const dotList = document.querySelectorAll(".hero-dot");

function showSlide(index) {
    const slideWidth = heroSlides[0].offsetWidth + 16;
    heroTrack.style.transform = "translateX(-" + (slideWidth * index) + "px)";

    dotList.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dotList[index].classList.add("active");
}

function showNextSlide() {
    currentSlideIndex = currentSlideIndex + 1;

    if (currentSlideIndex >= heroSlides.length) {
        currentSlideIndex = 0;
    }

    showSlide(currentSlideIndex);
}

setInterval(showNextSlide, 3000);
