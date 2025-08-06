// AOS Init
AOS.init();




document.addEventListener("DOMContentLoaded", function () {
  // Liczniki
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  function resetCounters() {
    counters.forEach(counter => {
      counter.textContent = '0';
    });
  }

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        counter.textContent = Math.floor(progress * target);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  function checkAndAnimate() {
    const trigger = document.querySelector('.about-stats-grid');
    if (trigger && isInViewport(trigger) && !animated) {
      animated = true;
      animateCounters();
    }
  }

  resetCounters();
  window.addEventListener('scroll', checkAndAnimate);
  window.addEventListener('load', checkAndAnimate);



  
  // Hamburger menu
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu-wrapper");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const closeBtn = document.querySelector(".close-mobile-menu");

  function toggleMenu() {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("w--open");
  }

  if (hamburger) hamburger.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", toggleMenu);
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
});



//zmiana zdjęć w galeri
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-arrow.left");
  const nextBtn = document.querySelector(".slider-arrow.right");
  const dots = document.querySelectorAll(".slider-dot");
  const slider = document.querySelector(".slider");

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", i !== index);
    });

    slider.style.transform = `translateX(-${(index * 100) / slides.length}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
    });
  });

  showSlide(0);
});



//FAQ rozwijanie/zwijanie
const accordionItems = document.querySelectorAll(".accordion-item-wrapper");

accordionItems.forEach((item) => {
  const heading = item.querySelector(".accordion-heading");
  const body = item.querySelector(".accordion-body");
  const icon = item.querySelector(".card-arrow .icon-font-rounded");

  heading.addEventListener("click", () => {
    const isOpen = body.style.height && body.style.height !== "0px";

    // Zamknij wszystkie elementy
    accordionItems.forEach((el) => {
      const elBody = el.querySelector(".accordion-body");
      const elIcon = el.querySelector(".card-arrow .icon-font-rounded");

      if (elBody !== body) {
        elBody.style.height = "0";
        elIcon.style.transform = "rotate(0deg)";
      }
    });

    if (!isOpen) {
      // Otwieranie - ustaw wysokość na scrollHeight (pełna wysokość)
      body.style.display = "block"; // żeby można było mierzyć scrollHeight
      const fullHeight = body.scrollHeight + "px";
      body.style.height = "0"; // reset na 0, żeby animacja działała

      // animacja wysokości (trigger)
      setTimeout(() => {
        body.style.height = fullHeight;
      }, 10);

      icon.style.transform = "rotate(-180deg)";

      // Po animacji ustawiamy height na auto, by treść mogła się dostosowywać do zmiany zawartości
      body.addEventListener("transitionend", function handler() {
        body.style.height = "auto";
        body.removeEventListener("transitionend", handler);
      });
    } else {
      // Zamknięcie - ustaw wysokość na aktualną, potem na 0
      body.style.height = body.scrollHeight + "px"; // aktualna wysokość
      setTimeout(() => {
        body.style.height = "0";
      }, 10);

      icon.style.transform = "rotate(0deg)";

      // Po animacji schowaj element
      body.addEventListener("transitionend", function handler() {
        body.style.display = "none";
        body.removeEventListener("transitionend", handler);
      });
    }
  });
});



