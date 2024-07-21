class apiHandler {

    static async getData(cityName = "london") {
        const apiKey = process.env.API_KEY;
        const apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${apiKey}`;

        const response = await fetch(apiURL);
        const data = await response.json();

        return data;
    }
}

export { apiHandler };