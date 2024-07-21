import { DOMS } from "./DOMS";
import { apiHandler } from "./apiHandler";
import { icons } from "./icons";

class UI {

    static clearDaySlides() {
        const slidesWrapper = document.getElementById("slidesWrapperDays");
        slidesWrapper.innerHTML = "";
    };

    static showAllDaySlides() {
        UI.clearDaySlides();
        const slidesWrapper = document.getElementById("slidesWrapperDays");
        slidesWrapper.appendChild(DOMS.createDayCards());
    };

    static showAllHourSlides() {
        UI.clearHourSlides();
        const slidesWrapper = document.getElementById("slidesWrapperHour");
        slidesWrapper.appendChild(DOMS.createHourCards());
    };

    static clearHourSlides() {
        const slidesWrapper = document.getElementById("slidesWrapperHour");
        slidesWrapper.innerHTML = "";
    }

    static displayInfoAboutSelectedDay() {
        // Get element with attribute today = true
        const currentlySelectedSlide = document.querySelector('[today="true"]');

        // Get all data
        const data = apiHandler.getData();
        const days = data.days;

        // Get the day
        const dayId = currentlySelectedSlide.getAttribute("day");

        // Get the data about the selected day
        const information = days[dayId];

        // Get the elements
        const weatherType = document.getElementById("mainInfoWeatherType");
        const weatherDate = document.getElementById("mainInfoWeatherDate");
        const weatherDegrees = document.getElementById("mainInfoWeatherDegrees");
        const icon = document.getElementById("mainInfoCloudIcon");
        const chanceOfRain = document.getElementById("chanceOfRain");
        const humidity = document.getElementById("Humidity");
        const feelsLikeTemp = document.getElementById("feelsLikeTemp");
        const windSpeed = document.getElementById("windSpeed");
    

        // Set the data
        weatherType.textContent = information.conditions;
        weatherDate.textContent = information.datetime;
        weatherDegrees.textContent = information.temp;
        icon.src = icons[information.icon]
        chanceOfRain.textContent = information.precip + "%";
        humidity.textContent = information.humidity + "%";
        feelsLikeTemp.textContent = information.feelslike;
        windSpeed.textContent = information.windspeed + " m/s";

        UI.showAllHourSlides(data);

    };

    static initialize() {
        UI.showAllDaySlides();
        UI.displayInfoAboutSelectedDay();
    };
}

export { UI };