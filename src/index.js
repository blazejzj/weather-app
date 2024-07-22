import "./style.css";
import { apiHandler } from "./apiHandler";
import { UI } from "./UI";
import { DOMS } from "./DOMS";



// To be deleted
console.log("Hello, webpack!");

const readyData = apiHandler.getData();

readyData.then((data => console.log(data))).catch((error) => console.log(error));

window.addEventListener("load", () => {
    DOMS.getCityName();
});

document.addEventListener('DOMContentLoaded', () => {
    const carouselles = document.querySelectorAll('.carouselleContainer');

    carouselles.forEach(container => {
        const slidesWrapper = container.querySelector('.slidesWrapper');
        const slides = slidesWrapper.children;
        const slideCount = slides.length;
        const slideWidth = slides[0].offsetWidth;
        const visibleSlides = 3;

        let index = 0;

        function updateCarousel(direction) {
            const maxIndex = Math.max(0, slideCount - visibleSlides);
            if (direction === 'next') {
                index = Math.min(index + 1, maxIndex);
            } else {
                index = Math.max(index - 1, 0);
            }
            slidesWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        container.querySelector('.prev').addEventListener('click', () => updateCarousel('prev'));
        container.querySelector('.next').addEventListener('click', () => updateCarousel('next'));

        // Set the width of slidesWrapper to accommodate all slides
        slidesWrapper.style.width = `${slideWidth * slideCount}px`;
    });
});