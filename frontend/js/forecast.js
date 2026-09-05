let forecastChart = null;


document
    .getElementById("forecastForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const data = {

                forecast_temperature:
                    Number(
                        document
                            .getElementById(
                                "forecastTemperature"
                            ).value
                    ),

                forecast_humidity:
                    Number(
                        document
                            .getElementById(
                                "forecastHumidity"
                            ).value
                    ),

                forecast_precipitation:
                    Number(
                        document
                            .getElementById(
                                "forecastPrecipitation"
                            ).value
                    ),

                forecast_pressure:
                    Number(
                        document
                            .getElementById(
                                "forecastPressure"
                            ).value
                    ),

                forecast_wind_speed:
                    Number(
                        document
                            .getElementById(
                                "forecastWindSpeed"
                            ).value
                    ),

                hour:
                    Number(
                        document
                            .getElementById(
                                "hour"
                            ).value
                    ),

                day:
                    Number(
                        document
                            .getElementById(
                                "day"
                            ).value
                    ),

                month:
                    Number(
                        document
                            .getElementById(
                                "month"
                            ).value
                    ),

                day_of_year:
                    Number(
                        document
                            .getElementById(
                                "dayOfYear"
                            ).value
                    )

            };


            const resultBox =
                document.getElementById(
                    "forecastResult"
                );


            resultBox.innerHTML = `

                <h2>
                    Forecast Reliability Analysis
                </h2>


                <div class="empty-result">

                    <div class="empty-icon">

                        ⏳

                    </div>


                    <p>

                        AI is analyzing forecast reliability...

                    </p>


                </div>

            `;


            try {


                const result =
                    await detectForecastBust(
                        data
                    );


                displayForecastResult(
                    result
                );


                updateForecastChart(
                    result
                );


            }

            catch (error) {


                resultBox.innerHTML = `

                    <h2>
                        Forecast Reliability Analysis
                    </h2>


                    <div class="empty-result">


                        <div class="empty-icon">

                            ⚠️

                        </div>


                        <p>

                            Unable to connect to the AI service.

                        </p>


                    </div>

                `;


                console.error(error);

            }


        }
    );



function displayForecastResult(result) {


    const resultBox =
        document.getElementById(
            "forecastResult"
        );


    const probability =
        Number(
            result.bust_probability
        );


    const isBust =
        result.forecast_bust === 1;


    const percentage =
        (probability * 100)
            .toFixed(1);


    resultBox.innerHTML = `

        <h2>
            Forecast Reliability Analysis
        </h2>


        <div class="result-status
            ${isBust
                ? "result-anomaly"
                : "result-normal"
            }">

            ${isBust
                ? "⚠️ FORECAST BUST LIKELY"
                : "✅ FORECAST APPEARS RELIABLE"
            }

        </div>


        <div class="result-details">


            <div class="result-item">

                <span>
                    Bust Probability
                </span>

                <strong>

                    ${percentage}%

                </strong>

            </div>



            <div class="result-item">

                <span>
                    Classification
                </span>

                <strong>

                    ${result.forecast_bust === 1
                        ? "High Risk"
                        : "Low Risk"
                    }

                </strong>

            </div>



            <div class="result-item">

                <span>
                    Decision Threshold
                </span>

                <strong>

                    ${Number(
                        result.threshold_used
                    ).toFixed(3)}

                </strong>

            </div>


        </div>

    `;

}



function updateForecastChart(result) {


    const probability =
        Number(
            result.bust_probability
        ) * 100;


    const reliable =
        100 - probability;


    const ctx =
        document
            .getElementById(
                "forecastChart"
            )
            .getContext("2d");


    if (forecastChart) {

        forecastChart.destroy();

    }


    forecastChart =
        new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: [

                    "Forecast Reliable",
                    "Forecast Bust Risk"

                ],

                datasets: [

                    {

                        data: [

                            reliable,
                            probability

                        ]

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        });

}