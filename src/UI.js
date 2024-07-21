import { DOMS } from "./DOMS";
import icons from "./icons";

class UI {
    constructor() {
        this.data = DOMS.data;
        this.days = DOMS.days;
    }

    static clearDaySlides() {
        const slidesWrapper = document.getElementById("slidesWrapperDays");
        slidesWrapper.innerHTML = "";
    }

    static showAllDaySlides() {
        UI.clearDaySlides();
        const slidesWrapper = document.getElementById("slidesWrapperDays");
        slidesWrapper.appendChild(DOMS.createDayCards());
    }

    static showAllHourSlides(day) {
        UI.clearHourSlides();
        const slidesWrapper = document.getElementById("slidesWrapperHour");
        slidesWrapper.appendChild(DOMS.createHourCards(day));
    }

    static clearHourSlides() {
        const slidesWrapper = document.getElementById("slidesWrapperHour");
        slidesWrapper.innerHTML = "";
    }

    static displayInfoAboutSelectedDay() {
        const currentlySelectedSlide = document.querySelector('[currentlySelected="true"]');
        const dayId = currentlySelectedSlide.getAttribute("day");
        const information = DOMS.days[dayId];

        const weatherType = document.getElementById("mainInfoWeatherType");
        const weatherDate = document.getElementById("mainInfoWeatherDate");
        const weatherDegrees = document.getElementById("mainInfoWeatherDegrees");
        const icon = document.getElementById("mainInfoCloudIcon");
        const chanceOfRain = document.getElementById("chanceOfRain");
        const humidity = document.getElementById("Humidity");
        const feelsLikeTemp = document.getElementById("feelsLikeTemp");
        const windSpeed = document.getElementById("windSpeed");

        weatherType.textContent = information.conditions;
        weatherDate.textContent = information.datetime;
        weatherDegrees.textContent = information.temp;
        icon.src = icons[information.icon];
        chanceOfRain.textContent = information.precip + "%";
        humidity.textContent = information.humidity + "%";
        feelsLikeTemp.textContent = information.feelslike;
        windSpeed.textContent = information.windspeed + " m/s";

        UI.showAllHourSlides(information);
    }
}

export { UI };
