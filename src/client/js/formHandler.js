let projectData = {};


async function handleClick(event) {
    event.preventDefault()
    document.getElementById("date").setAttribute("min", new Date().toLocaleDateString('en-ca'));
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var close = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = "block";
    })

    // When the user clicks on (x), close the modal
    close.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = "none";
    })

}
async function handleSubmit(event) {
    event.preventDefault()
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    if (city == "" || date == '') {
        document.getElementById("validation").style.display = "block";
    } else {
        document.getElementById("myModal").style.display = "none"
        document.getElementById("hide-loader").style.display = "block";
        projectData["date"] = date
        Client.getData(city)
            .then(function (data) {
                // Add data
                projectData["country"] = data.countryName;
                projectData["latitude"] = data.lat;
                projectData["longitude"] = data.lng;
                projectData["city"] = data.name
                console.log(data)
                Client.getWeather(projectData)
                    .then(function (data) {
                        // Add data
                        projectData['leftdays'] = data[1]
                        projectData['weather'] = data[0].weather.description
                        projectData.leftdays > 7 ? (
                            projectData['high_temp'] = data[0].max_temp,
                            projectData['low_temp'] = data[0].min_temp
                        ) : projectData['temp'] = data[0].temp
                        Client.getImage(projectData)
                            .then(function (data) {
                                projectData["image"] = data.largeImageURL
                                Client.handleConfirm(projectData)
                            })
                    })
            })
    }
}

export { handleClick, handleSubmit }