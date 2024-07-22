class apiHandler {

    static async getData(cityName = "oslo") {
        const apiKey = process.env.API_KEY;
        const apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${apiKey}`;

        const response = await fetch(apiURL);
        if (!response.ok) {

            // Display error message for 5 seconds
            const wrongInputMsg = document.getElementById('inputErrorMsg');
            wrongInputMsg.style.display = 'block';
            setTimeout(() => {
                wrongInputMsg.style.display = 'none';
            }, 5000);

            // Return "default" data
            return this.getData();
        }
        const data = await response.json();

        return data;
    }
}

export { apiHandler };