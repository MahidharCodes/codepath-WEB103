const mobileRender = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())

    const response = await fetch('/mobiles')
    const data = await response.json()

    const placeContent = document.getElementById('mobile-content')

    let mobile = data.find(mobile => mobile.id === requestedID)

    if (mobile) {
        document.getElementById('image').src = mobile.image
        document.getElementById('name').textContent = mobile.name
        document.getElementById('price').textContent = 'Price: ' + mobile.price
        document.getElementById('description').textContent = mobile.description
        document.title = `${mobile.name}`
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No such mobiles Available 😞'
        placeContent.appendChild(message)
    }

}

mobileRender()