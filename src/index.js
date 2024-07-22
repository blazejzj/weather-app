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

    const dayNextBtn = document.getElementById("dayNextBtn");
    const dayPrevBtn = document.getElementById("dayPrevBtn");
    const hourNextBtn = document.getElementById("hourNextBtn");
    const hourPrevBtn = document.getElementById("hourPrevBtn");

    let dayIndex = 0;
    let hourIndex = 0;

    function updateDaySlides() {
        const slides = document.querySelectorAll("#slidesWrapperDays .slide");
        slides.forEach((slide, index) => {
            slide.style.display = index >= dayIndex && index < dayIndex + 3 ? "block" : "none";
        });
    }

    function updateHourSlides() {
        const slides = document.querySelectorAll("#slidesWrapperHour .slide");
        slides.forEach((slide, index) => {
            slide.style.display = index >= hourIndex && index < hourIndex + 3 ? "block" : "none";
        });
    }

    updateDaySlides();
    updateHourSlides();

    dayNextBtn.addEventListener("click", function() {
        const totalDays = document.querySelectorAll("#slidesWrapperDays .slide").length;
        if (dayIndex < totalDays - 3) {
            dayIndex++;
            updateDaySlides();
        }
    });

    dayPrevBtn.addEventListener("click", function() {
        if (dayIndex > 0) {
            dayIndex--;
            updateDaySlides();
        }
    });

    hourNextBtn.addEventListener("click", function() {
        const totalHours = document.querySelectorAll("#slidesWrapperHour .slide").length;
        if (hourIndex < totalHours - 3) {
            hourIndex++;
            updateHourSlides();
        }
    });

    hourPrevBtn.addEventListener("click", function() {
        if (hourIndex > 0) {
            hourIndex--;
            updateHourSlides();
        }
    });
});
