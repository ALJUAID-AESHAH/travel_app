function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForInput(formText) ? (
        document.getElementById('validate').innerHTML = " ",
        fetch('http://localhost:8081/test', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: formText })
        })
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('results').innerHTML =
                    `<p id="subjectivity">subjectivity: <span>${res.subjectivity}</span></p>
            <p id="text">text snippet from the article: <span>${res.sentence_list[0].text}</span></p>`
            }))
        :
        document.getElementById('validate').innerHTML = "Please, fill the field!"

}

export { handleSubmit }