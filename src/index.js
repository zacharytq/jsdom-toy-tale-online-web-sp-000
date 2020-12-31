let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
    toyForm.addEventListener("submit", event => {
      event.preventDefault()
      newFromFormToy(event.target)
      document.querySelector('.add-toy-form').reset();
  })
})

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {
    toys.forEach(toy => {
      createToy(toy)
    })
  })
}

function createToy(toy) {
  let toyCollection = document.getElementById("toy-collection")
      let card = document.createElement("div")
      card.setAttribute('class', 'card')

      let toyName = document.createElement("h2")
      toyName.innerText = toy.name 

      let toyImage = document.createElement("img")
      toyImage.setAttribute('src', toy.image)
      toyImage.setAttribute('class', 'toy-avatar')

      let toyLikes = document.createElement("p")
      
      toyLikes.innerText = `likes: ${toy.likes}`

      likeBtn = document.createElement('button')
      toyLikes.setAttribute("id", toy.id)
      likeBtn.innerText = "Like <3"
      likeBtn.setAttribute("class", "like-btn")
      likeBtn.addEventListener("click", event => {
        console.log(event.target.dataset)
        likes(event)
      })
      

      card.append(toyName, toyImage, toyLikes, likeBtn)
      toyCollection.appendChild(card) 
  }

  function newFromFormToy(info) {
    let toy = {
      name: info.name.value,
      image: info.image.value,
      likes: 0
    };
    let obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    };
      return fetch("http://localhost:3000/toys", obj)
      .then(function(response){
        return response.json();
      })
      .then(function(object) {
        createToy(object)
        
      })
  }
 
  
  function likes(data) {
    data.preventDefault()
    let likeAmount = data.target.previousElementSibling.innerText.split(" ")[1] 
    let oneMore = parseInt(likeAmount) + 1
    fetch(`http://localhost:3000/toys/${data.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": oneMore
    })
  })
  .then(function(response){
  })
  .then((object => {
    data.target.previousElementSibling.innerText = `likes: ${oneMore}`;
  }))
}