import { DOMS } from "./DOMS";
import icons from "./icons";

class UI {
    constructor() {
        this.data = DOMS.data;
        this.days = DOMS.days;
    }

    static init() {
        UI.cacheDOM();
        UI.bindEvents();
    }

    static cacheDOM() {
        this.dayNextBtn = document.getElementById("dayNextBtn");
        this.dayPrevBtn = document.getElementById("dayPrevBtn");
        this.hourNextBtn = document.getElementById("hourNextBtn");
        this.hourPrevBtn = document.getElementById("hourPrevBtn");
        this.dayIndex = 0;
        this.hourIndex = 0;
    }

    static bindEvents() {
        this.dayNextBtn.addEventListener("click", function() {
            const totalDays = document.querySelectorAll("#slidesWrapperDays .slide").length;
            if (UI.dayIndex < totalDays - 3) {
                UI.dayIndex++;
                UI.updateDaySlides();
            }
        });
        this.dayPrevBtn.addEventListener("click", function() {
            if (UI.dayIndex > 0) {
                UI.dayIndex--;
                UI.updateDaySlides();
            }
        });
        this.hourNextBtn.addEventListener("click", function() {
            const totalHours = document.querySelectorAll("#slidesWrapperHour .slide").length;
            if (UI.hourIndex < totalHours - 3) {
                UI.hourIndex++;
                UI.updateHourSlides();
            }
        });
        this.hourPrevBtn.addEventListener("click", function() {
            if (UI.hourIndex > 0) {
                UI.hourIndex--;
                UI.updateHourSlides();
            }
        });
    }

    static clearDaySlides() {
        const slidesWrapper = document.getElementById("slidesWrapperDays");
        slidesWrapper.innerHTML = "";
    }

    static updateDaySlides() {
        const slides = document.querySelectorAll("#slidesWrapperDays .slide");
        slides.forEach((slide, index) => {
            slide.style.display = index >= this.dayIndex && index < this.dayIndex + 3 ? "flex" : "none";
        });
    }

    static updateHourSlides() {
        const slides = document.querySelectorAll("#slidesWrapperHour .slide");
        slides.forEach((slide, index) => {
            slide.style.display = index >= this.hourIndex && index < this.hourIndex + 3 ? "flex" : "none";
        });
    }

    static showAllDaySlides() {
        UI.clearDaySlides();
        const slidesWrapper = document.getElementById("slidesWrapperDays");
        slidesWrapper.appendChild(DOMS.createDayCards());
        UI.updateDaySlides();
    }

    static showAllHourSlides(day) {
        UI.clearHourSlides();
        const slidesWrapper = document.getElementById("slidesWrapperHour");
        slidesWrapper.appendChild(DOMS.createHourCards(day));
        UI.updateHourSlides();
    }

    static clearHourSlides() {
        const slidesWrapper = document.getElementById("slidesWrapperHour");
        slidesWrapper.innerHTML = "";
    }

    static displayInfoAboutSelectedDay() {
        const currentlySelectedSlide = document.querySelector('[currentlySelected="true"]');
        const dayId = currentlySelectedSlide.getAttribute("day");
        const information = DOMS.days[dayId];
        const data = DOMS.data;

        const weatherType = document.getElementById("mainInfoWeatherType");
        const weatherDate = document.getElementById("mainInfoWeatherDate");
        const weatherDegrees = document.getElementById("mainInfoWeatherDegrees");
        const weatherCityName = document.getElementById("mainInfoWeatherCityName");
        const icon = document.getElementById("mainInfoCloudIcon");
        const chanceOfRain = document.getElementById("chanceOfRain");
        const humidity = document.getElementById("Humidity");
        const feelsLikeTemp = document.getElementById("feelsLikeTemp");
        const windSpeed = document.getElementById("windSpeed");

        weatherType.textContent = information.conditions;
        weatherDate.textContent = information.datetime;
        weatherDegrees.textContent = information.temp + " °C";
        weatherCityName.textContent = data.address;
        icon.src = icons[information.icon];
        chanceOfRain.textContent = information.precip + " %";
        humidity.textContent = information.humidity + "%";
        feelsLikeTemp.textContent = information.feelslike + " °C";
        windSpeed.textContent = information.windspeed + " m/s";

        UI.showAllHourSlides(information);
    }
}

UI.init();

export { UI };
