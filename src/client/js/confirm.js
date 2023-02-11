const Swal = require('sweetalert2')
let itemsArray = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : []
const modal = document.getElementById("myModal2")
const cancel = document.getElementById("cancel");
const add = document.getElementById("add");

const handleConfirm = async (data) => {
    document.getElementById("hide-loader").style.display = "none";
    modal.style.display = "block";

    // When the user clicks on add
    add.addEventListener('click', function (event) {
        event.preventDefault();
        itemsArray.push(data)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        Swal.fire({
            icon: 'success',
            title: 'Done',
            showConfirmButton: false,
            timer: 1000
        }).then(() => {
            window.location.reload();
        })
    })

    // When the user clicks on cancel, close the modal
    cancel.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = "none";
        window.location.reload();
        })

    const newDiv = document.createElement('div');
    data.leftdays > 7 ?
        newDiv.innerHTML = `<div class='description'>
                                <p>My trip to: ${data.city}, ${data.country}</p>
                                <p>Departing: ${data.date}</p>
                                <p>Typical weather for then is:</p>
                                <p>High ${data.high_temp} Low ${data.low_temp}</p>
                                <p> ${data.weather} throught the day</p>
                                
                        </div>`
        :

        newDiv.innerHTML = `<div class='description'>
    <p>My trip to: ${data.city}, ${data.country}</p>
    <p>Departing: ${data.date}</p>
    <p>Typical weather for then is:</p>
    <p>temp ${data.temp}</p>
    <p> ${data.weather} throught the day</p>
</div>`
    document.querySelector('.summary').appendChild(newDiv)
    // return true
}
export { handleConfirm }