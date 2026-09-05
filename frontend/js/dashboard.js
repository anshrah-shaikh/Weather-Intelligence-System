const weatherData = {

    labels: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00"
    ],

    temperature: [
        27,
        28,
        29,
        30,
        31,
        30,
        29
    ],

    humidity: [
        80,
        78,
        74,
        70,
        68,
        72,
        75
    ]

};


document.getElementById("temperature").innerText =
    "29°C";

document.getElementById("humidity").innerText =
    "75%";

document.getElementById("windSpeed").innerText =
    "14 km/h";

document.getElementById("anomalyCount").innerText =
    "2";



const ctx =
    document
        .getElementById("weatherChart")
        .getContext("2d");


new Chart(ctx, {

    type: "line",

    data: {

        labels: weatherData.labels,

        datasets: [

            {

                label: "Temperature (°C)",

                data: weatherData.temperature,

                borderWidth: 2,

                tension: 0.4

            },

            {

                label: "Humidity (%)",

                data: weatherData.humidity,

                borderWidth: 2,

                tension: 0.4

            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});