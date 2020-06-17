// Code here
const url = 'http://localhost:3000/beers/1';

fetch(url)
 .then(res => res.json())
 .then( image => {
     showBeer(image)
     changeDescription(image)
     addReview(image)
 })

 function showBeer(beer){
    const beerName = document.querySelector('.beer-details h2');
    beerName.textContent = beer.name;

    const beerImage = document.querySelector('.beer-details img')
    beerImage.src = beer.image_url;

    const beerDescription = document.querySelector('.description textarea');
    beerDescription.textContent = beer.description;

    const beerReviews = document.querySelector('.reviews');
    beerReviews.textContent ='';

    for (const review of beer.reviews)
    {const li = document.createElement('li');
      li.textContent = review ;
      beerReviews.append(li)
    }
}

function changeDescription(beer){
    const form = document.querySelector('.description');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form[0].value;
        const options = {
            method:'PATCH',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
         body: JSON.stringify({
             description: input
         })  
        };
      fetch(url,options)
      .then(res => res.json())
      .then(beer => {showBeer(beer)})
    })
}

function addReview(beer){
    const form = document.querySelector('.review-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form[0];
        const li = document.createElement('li');
        li.textContent = input.value
        const beerReviews = document.querySelector('.reviews');
        beerReviews.append(li);
        form.reset()
    })
}

