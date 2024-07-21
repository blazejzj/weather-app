import { apiHandler } from "./apiHandler";
import { format } from "date-fns";
import { UI } from "./UI";
import icons from "./icons";

class DOMS {
    static data = null;
    static days = [];

    static async fetchData(cityName) {
        this.data = await apiHandler.getData(cityName);
        this.days = this.data.days;
    }

    static getCityName() {
        const cityInput = document.getElementById('inputField');
        const submitInputBtn = document.getElementById('inputFieldSearchBtn'); 
        
        submitInputBtn.addEventListener('click', async () => {
            const cityName = cityInput.value;
            await this.fetchData(cityName);
            UI.showAllDaySlides(); 
        });
    }

    static createDayCards() {
        const temporaryWrapper = document.createDocumentFragment();

        for (let i = 0; i < 7; i++) {
            const slide = document.createElement('div');
            slide.setAttribute("day", i);
            slide.classList.add('slide');

            if (i === 0) {
                slide.setAttribute("currentlySelected", true);
            }

            const infoWrapper = document.createElement('div');
            const spanDay = document.createElement('span');
            spanDay.textContent = format(new Date(this.days[i].datetime), 'EEEE');
            spanDay.setAttribute("id", "dayName");

            const spanDegrees = document.createElement('span');
            spanDegrees.textContent = this.days[i].temp;
            spanDegrees.setAttribute("id", "dayDegrees");

            const img = document.createElement('img');
            img.src = icons[this.days[i].icon];
            img.classList.add('carouselleIcons');

            infoWrapper.append(spanDay, spanDegrees);
            slide.append(infoWrapper, img);
            temporaryWrapper.appendChild(slide);
        }

        return temporaryWrapper;
    }

    static createHourCards(day) {
        const hours = day.hours;
        const temporaryWrapper = document.createDocumentFragment();

        for (let i = 0; i < 24; i++) {
            const slide = document.createElement('div');
            slide.classList.add('slide');

            const infoWrapper = document.createElement('div');
            const spanHour = document.createElement('span');
            spanHour.textContent = format(new Date(hours[i].datetime), 'HH:mm');
            spanHour.setAttribute("id", "hourName");

            const spanDegrees = document.createElement('span');
            spanDegrees.textContent = hours[i].temp;
            spanDegrees.setAttribute("id", "hourDegrees");

            const img = document.createElement('img');
            img.src = icons[hours[i].icon];
            img.classList.add('carouselleIcons');

            infoWrapper.append(spanHour, spanDegrees);
            slide.append(infoWrapper, img);
            temporaryWrapper.appendChild(slide);
        }

        return temporaryWrapper;
    }
}

export { DOMS };
