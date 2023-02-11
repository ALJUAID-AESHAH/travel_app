let slideIndex = 1;
showTrips()
showDivs(slideIndex);

// get weather forecast from Weatherbit API.
async function getWeather(data) {
    const res = await fetch('http://localhost:8081/weatherbit', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data })
    })
    try {
        const result = await res.json();
        return [result.data[0], result.days, data];
    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

async function showTrips() {
    const data = JSON.parse(localStorage.getItem('items'))
    if (data.length > 0) {
        data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        const initial = document.querySelector('.mySlides');
        initial.remove();
        for (let item in data) {
            let days, forecast
            const newDiv = document.createElement('div');
            newDiv.className = "mySlides";
            getWeather(data[item])
                .then(function (data) {
                    forecast = data[0]
                    days = data[1]
                    days > 7 ?
                        newDiv.innerHTML = `<div class="nestedGrid">
                                            <div class="image" style='background-image:url(${data[2].image})'>
                                            </div>
                                            <div class='description'>
                                            <p>My trip to: ${data[2].city}, ${data[2].country}</p>
                                            <p>Departing: ${data[2].date}</p>
                                            <p> ${data[2].city}, ${data[2].country} is ${days} days away.</p>
                                            <p>Typical weather for then is:</p>
                                            <p>High ${forecast.max_temp} Low ${forecast.min_temp}</p>
                                            <p> ${forecast.weather.description} throught the day</p>
                                            </div>
                                        </div>`
                        :
                        newDiv.innerHTML = `<div class="nestedGrid">
                                            <div class="image" style='background-image:url(${data[2].image})'>
                                            </div>
                                            <div class='description'>
                                            <p>My trip to: ${data[2].city}, ${data[2].country}</p>
                                            <p>Departing: ${data[2].date}</p>
                                            <p> ${data[2].city}, ${data[2].country} is ${days} days away.</p>
                                            <p>Typical weather for then is:</p>
                                            <p>temp ${forecast.temp}</p>
                                            <p> ${forecast.weather.description} throught the day</p>
                                            </div>
                                        </div>`
                })
            document.querySelector('.content').appendChild(newDiv)
        }
    }
}


export { plusDivs }
