/* ==========================================================================
   QUICK FUND - HERO CAROUSEL CONTROLLER
   ========================================================================== */

(function () {
  function initHeroCarousel() {
    var wrapper = document.querySelector(".hero-carousel-wrapper");
    var carousel = document.getElementById("heroCarousel");
    if (!carousel) return;

    var slides = carousel.querySelectorAll(".hero-carousel-slide");
    var indicators = document.querySelectorAll("#heroIndicators .indicator");
    var prevBtn = document.getElementById("heroPrevBtn");
    var nextBtn = document.getElementById("heroNextBtn");

    if (!slides.length) return;

    var currentIndex = 0;
    var timer = null;
    var INTERVAL = 4500; // 4.5 seconds per slide
    var isPaused = false;

    function goToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      currentIndex = index;

      slides.forEach(function (slide, i) {
        if (i === currentIndex) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      indicators.forEach(function (ind, i) {
        if (i === currentIndex) {
          ind.classList.add("active");
        } else {
          ind.classList.remove("active");
        }
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(function () {
        if (!isPaused) {
          nextSlide();
        }
      }, INTERVAL);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Button controls
    if (prevBtn) {
      prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        prevSlide();
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        nextSlide();
        startTimer();
      });
    }

    // Indicator clicks
    indicators.forEach(function (ind) {
      ind.addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-slide"), 10);
        if (!isNaN(idx)) {
          goToSlide(idx);
          startTimer();
        }
      });
    });

    // Hover pause
    if (wrapper) {
      wrapper.addEventListener("mouseenter", function () {
        isPaused = true;
      });
      wrapper.addEventListener("mouseleave", function () {
        isPaused = false;
      });
    }

    // Touch Swipe Gestures for Mobile
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;
    var minSwipeDistance = 40;

    carousel.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isPaused = true;
        }
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      function (e) {
        if (e.changedTouches && e.changedTouches.length === 1) {
          touchEndX = e.changedTouches[0].clientX;
          touchEndY = e.changedTouches[0].clientY;
          isPaused = false;
          handleSwipe();
          startTimer();
        }
      },
      { passive: true }
    );

    function handleSwipe() {
      var dx = touchEndX - touchStartX;
      var dy = touchEndY - touchStartY;

      // Only count as horizontal swipe if horizontal movement is dominant
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
        if (dx < 0) {
          // Swipe left -> next slide
          nextSlide();
        } else {
          // Swipe right -> prev slide
          prevSlide();
        }
      }
    }

    // Keyboard support
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prevSlide();
        startTimer();
      } else if (e.key === "ArrowRight") {
        nextSlide();
        startTimer();
      }
    });

    // Start auto-play
    startTimer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroCarousel);
  } else {
    initHeroCarousel();
  }
})();
