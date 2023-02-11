// get coordinates from Geonames API.
const getData = async (city) => {
    const res = await fetch('http://localhost:8081/geonames', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: city })
    })
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

// get weather forecast from Weatherbit API.
const getWeather = async (data) => {
    const res = await fetch('http://localhost:8081/weatherbit', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data })
    })
    try {
        const data = await res.json();
        // console.log(data);
        return [data.data[0],data.days];
    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

// get image from Pixabay API.
const getImage = async (data) => {
    const res = await fetch('http://localhost:8081/pixabay', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: data.city })
    })
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}
export { getData, getWeather, getImage }