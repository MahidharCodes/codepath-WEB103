const renderMobiles = async () => {
    const response = await fetch('/mobiles')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {
        data.map(mobile => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${mobile.image})`

            const name = document.createElement('h3')
            name.textContent = mobile.name
            bottomContainer.appendChild(name)

            const price = document.createElement('p')
            price.textContent = 'Price: ' + mobile.price
            bottomContainer.appendChild(price)

            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/mobiles/${mobile.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)
            mainContent.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Such Mobile will that id 😞'
        mainContent.appendChild(message)
    }
}

const requestedUrl = window.location.href.split('/').pop()
// In the if statement, check if requestedUrl is not null. If it isn't null (there is something after the /), set the window.location.href to the 404.html page.
if (requestedUrl) {
    window.location.href = '../404.html'
}
else {
    renderMobiles()
}
