class apiHandler {

    static async getData() {
        const apiKey = process.env.API_KEY;
        const apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=${apiKey}`;

        const response = await fetch(apiURL);
        const data = await response.json();

        return data;
    }
}

export { apiHandler };