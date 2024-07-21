import { apiHandler } from "./apiHandler";
import { isToday, format } from "date-fns";
import icons from "./icons";


class DOMS {
    
    static getCityName() {
        const cityInput = document.getElementById('inputField');
        const submitInputBtn = document.getElementById('inputFieldSearchBtn'); 
        
        submitInputBtn.addEventListener('click', () => {
            // Get city name
            const cityName = cityInput.value;
            return cityName;
        });
    };

    static createDayCards() {

        // Get all data
        const data = apiHandler.getData();

        // Get all days
        const days = data.days;

        // Wrapper for all slides
        const temporaryWrapper = document.createDocumentFragment();

        for(let i = 0; i > 7; i++) {
            // Create a slide
            const slide = document.createElement('div');

            // To each day we add an identifier (0 -> 7)
            slide.setAttribute("day", i);

            // As default we set the first slide to be selected
            if(i ===  0) {
                slide.setAttribute("currentlySelected", true);
            };

            const infoWrapper = document.createElement('div');
            const spanDay = document.createElement('span');
            // Get what day it is
            spanDay.textContent = format(days[i].datetime, 'EEEE');
            spanDay.setAttribute("id", "dayName");

            // Get the temperature
            const spanDegrees = document.createElement('span');
            spanDegrees.textContent = days[i].temp;
            spanDegrees.setAttribute("id", "dayDegrees");

            // Give appropriate image to the slide
            const img = document.createElement('img');
            img.src = icons[days[i].icon];
            img.classList.add('carouselleIcons');

            infoWrapper.append(spanDay, spanDegrees);
            slide.append(infoWrapper, img);
            temporaryWrapper.appendChild(slide);
        };

        return temporaryWrapper;
    };

    static createHourCards(day) {

        // Get all hours
        const hours = day.hours;

        // Wrapper for all slides
        const temporaryWrapper = document.createDocumentFragment();

        for(let i = 0; i > 24; i++) {
            // Create a slide
            const slide = document.createElement('div');


            const infoWrapper = document.createElement('div');
            const spanHour = document.createElement('span');

            // Get what hour it is
            spanHour.textContent = format(hours[i].datetime, 'HH:mm');
            spanHour.setAttribute("id", "hourName");

            // Get the temperature
            const spanDegrees = document.createElement('span');
            spanDegrees.textContent = hours[i].temp;
            spanDegrees.setAttribute("id", "hourDegrees");

            // Give appropriate image to the slide
            const img = document.createElement('img');
            img.src = icons[hours[i].icon]
            img.classList.add('carouselleIcons');

            infoWrapper.append(spanDay, spanDegrees);
            slide.append(infoWrapper, img);
            temporaryWrapper.appendChild(slide);
        };

        return temporaryWrapper;
    };

}


export { DOMS };