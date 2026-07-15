// ヒーロースライドショーの自動切り替え

const heroTrack = document.querySelector(".hero-track");
const realSlides = document.querySelectorAll(".hero-slide");
const slideCount = realSlides.length;
const heroDots = document.querySelector(".hero-dots");

let currentSlideIndex = 0;

// 無限ループ用に全スライドを複製して最後に追加する
// （1枚だけの複製だと、複数枚同時に見えている間に複製の先が途切れて白紙になるため）
realSlides.forEach(function (slide) {
    const clone = slide.cloneNode(true);
    heroTrack.appendChild(clone);
});

// スライドの数だけドットを作成する（複製分は含めない）
for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("hero-dot");

    if (i === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", function () {
        goToSlide(i);
    });

    heroDots.appendChild(dot);
}

const dotList = document.querySelectorAll(".hero-dot");

function updateDots(index) {
    dotList.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dotList[index].classList.add("active");
}

function moveTrack(index, withTransition) {
    const slideWidth = realSlides[0].offsetWidth + 16;

    heroTrack.style.transition = withTransition ? "transform 0.5s ease" : "none";
    heroTrack.style.transform = "translateX(-" + (slideWidth * index) + "px)";
}

function showNextSlide() {
    currentSlideIndex = currentSlideIndex + 1;
    moveTrack(currentSlideIndex, true);

    if (currentSlideIndex >= slideCount) {
        updateDots(0);
    } else {
        updateDots(currentSlideIndex);
    }
}

// 複製（1枚目と同じ見た目）まで移動し終わったら、瞬間的に本物の1枚目へ戻す
heroTrack.addEventListener("transitionend", function () {
    if (currentSlideIndex >= slideCount) {
        currentSlideIndex = 0;
        moveTrack(currentSlideIndex, false);
    }
});

function goToSlide(index) {
    currentSlideIndex = index;
    moveTrack(currentSlideIndex, true);
    updateDots(currentSlideIndex);
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(showNextSlide, 3000);
}

let autoSlideTimer = setInterval(showNextSlide, 3000);
