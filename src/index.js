const url = 'http://localhost:3000/beers/1'

fetch(url)
.then(res => res.json())
.then(json =>{
    showBeer(json)
    console.log(json)
    clearReviews()
});

function showBeer(data){
    const beerImage = document.querySelector('.beer-details img')
    beerImage.src = data.image_url

    const beerName = document.querySelector('.beer-details h2')
    beerName.textContent = data.name

    const beerDescription = document.querySelector('.description textarea')
    beerDescription.value = data.description

    const getReviews = document.querySelector('.reviews')
    for(const element of data.reviews){
        const createLi = document.createElement('li')
        createLi.textContent = element
        getReviews.append(createLi)
    }
}

function clearReviews(){
    document.querySelector('.reviews li').remove()
    document.querySelector('.reviews li').remove()
}

const getDescription = document.querySelector('.description')

getDescription.addEventListener('submit', function(){
    event.preventDefault()
    const getValue = document.querySelector('.description textarea')
    fetch(url, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            description: getValue.value
        })
    })
})

const getReview = document.querySelector('.review-form')
getReview.addEventListener('submit', function(){
    event.preventDefault()
    const reviewTextArea = document.querySelector('.review-form textarea')
    const createLi = document.createElement('li')
    createLi.textContent = reviewTextArea.value
    const postReview = document.querySelector('.reviews')
    postReview.append(createLi)
})