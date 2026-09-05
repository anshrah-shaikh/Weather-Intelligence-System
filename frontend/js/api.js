const API_BASE_URL = "http://127.0.0.1:8000";


async function detectAnomaly(data) {

    const response = await fetch(
        `${API_BASE_URL}/api/anomaly/predict`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        throw new Error(
            "Failed to analyze weather reading"
        );

    }

    return await response.json();

}



async function detectForecastBust(data) {

    const response = await fetch(
        `${API_BASE_URL}/api/forecast/predict`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        throw new Error(
            "Failed to analyze forecast"
        );

    }

    return await response.json();

}



async function getDashboardData() {

    const response = await fetch(
        `${API_BASE_URL}/api/dashboard`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load dashboard data"
        );

    }

    return await response.json();

}