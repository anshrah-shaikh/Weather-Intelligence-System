let anomalyChart = null;


document
    .getElementById("anomalyForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const data = {

                temperature:
                    Number(
                        document
                            .getElementById(
                                "temperatureInput"
                            ).value
                    ),

                humidity:
                    Number(
                        document
                            .getElementById(
                                "humidityInput"
                            ).value
                    ),

                precipitation:
                    Number(
                        document
                            .getElementById(
                                "precipitationInput"
                            ).value
                    ),

                pressure:
                    Number(
                        document
                            .getElementById(
                                "pressureInput"
                            ).value
                    ),

                wind_speed:
                    Number(
                        document
                            .getElementById(
                                "windSpeedInput"
                            ).value
                    ),

                wind_direction:
                    Number(
                        document
                            .getElementById(
                                "windDirectionInput"
                            ).value
                    )

            };


            const resultBox =
                document.getElementById(
                    "anomalyResult"
                );


            resultBox.innerHTML = `

                <h2>AI Analysis</h2>

                <div class="empty-result">

                    <div class="empty-icon">

                        ⏳

                    </div>

                    <p>
                        Analyzing weather station data...
                    </p>

                </div>

            `;


            try {


                const result =
                    await detectAnomaly(data);


                displayAnomalyResult(
                    result
                );


                updateAnomalyChart(
                    data
                );


            }

            catch (error) {


                resultBox.innerHTML = `

                    <h2>AI Analysis</h2>

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



function displayAnomalyResult(result) {


    const resultBox =
        document.getElementById(
            "anomalyResult"
        );


    const isAnomaly =
        result.status
            .toUpperCase()
            .includes("ANOMALY");


    resultBox.innerHTML = `

        <h2>
            AI Analysis
        </h2>


        <div class="result-status
            ${isAnomaly
                ? "result-anomaly"
                : "result-normal"
            }">

            ${isAnomaly
                ? "🚨 ANOMALY DETECTED"
                : "🟢 NORMAL WEATHER READING"
            }

        </div>


        <div class="result-details">


            <div class="result-item">

                <span>
                    Anomaly Score
                </span>

                <strong>
                    ${Number(
                        result.anomaly_score
                    ).toFixed(4)}
                </strong>

            </div>



            <div class="result-item">

                <span>
                    Detection Threshold
                </span>

                <strong>
                    ${Number(
                        result.threshold_used
                    ).toFixed(4)}
                </strong>

            </div>



            <div class="result-item">

                <span>
                    Severity
                </span>

                <strong>
                    ${result.severity || "Calculated"}
                </strong>

            </div>


        </div>

    `;

}



function updateAnomalyChart(data) {


    const ctx =
        document
            .getElementById(
                "anomalyChart"
            )
            .getContext("2d");


    if (anomalyChart) {

        anomalyChart.destroy();

    }


    anomalyChart =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [

                    "Temperature",
                    "Humidity",
                    "Precipitation",
                    "Pressure",
                    "Wind Speed",
                    "Wind Direction"

                ],

                datasets: [

                    {

                        label:
                            "Submitted Weather Reading",

                        data: [

                            data.temperature,

                            data.humidity,

                            data.precipitation,

                            data.pressure,

                            data.wind_speed,

                            data.wind_direction

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