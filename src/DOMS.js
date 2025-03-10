import { apiHandler } from "./apiHandler";
import { format, parse } from "date-fns";
import { UI } from "./UI";
import icons from "./icons";

class DOMS {
    static data = null;
    static days = [];

    static async fetchData(cityName) {
        this.data = await apiHandler.getData(cityName);
        this.days = this.data.days;
    }

    static async getCityName() {
        const cityInput = document.getElementById('inputField');
        const submitInputBtn = document.getElementById('inputFieldSearchBtn'); 
        
        const initialCityName = "oslo";
        await this.fetchData(initialCityName);;
        UI.showAllDaySlides();
        UI.displayInfoAboutSelectedDay();
        
        submitInputBtn.addEventListener('click', async () => {
            const cityName = cityInput.value;
            await this.fetchData(cityName);
            UI.showAllDaySlides(); 
            UI.displayInfoAboutSelectedDay();
        });
    }

    static createDayCards(celsius) {
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
            if (!celsius) {
                spanDegrees.textContent = this.days[i].temp + " °F";
            }
            else {
                spanDegrees.textContent = UI.fahrenheitToCelsius(this.days[i].temp) + " °C";
            }
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

    static createHourCards(day, celsius) {
        const hours = day.hours;
        const temporaryWrapper = document.createDocumentFragment();

        for (let i = 0; i < 24; i++) {
            const slide = document.createElement('div');
            slide.classList.add('slide');

            const infoWrapper = document.createElement('div');
            const spanHour = document.createElement('span');
            const parsedTime = parse(hours[i].datetime, 'HH:mm:ss', new Date());
            spanHour.textContent = format(parsedTime, 'HH:mm');
            spanHour.setAttribute("id", "hourName");

            const spanDegrees = document.createElement('span');
            if (!celsius) {
                spanDegrees.textContent = hours[i].temp + " °F";
            }
            else {
                spanDegrees.textContent = UI.fahrenheitToCelsius(hours[i].temp) + " °C";
            }

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
