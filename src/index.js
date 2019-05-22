document.addEventListener('DOMContentLoaded', () => {
fetchDogs()
})

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogs => dogs.forEach(renderDogs))
}

function renderDogs(dog) {

  let tableBody = document.getElementById('table-body')

  // create rows corresponding with table column information
  let wholeRow = document.createElement('tr')
  let nameCell = document.createElement('td')
  let breedCell = document.createElement('td')
  let sexCell = document.createElement('td')
  let editCell = document.createElement('td')
  let editButton = document.createElement('button')

  // populate inner text with data from JSON
  nameCell.innerText = dog.name
  breedCell.innerText = dog.breed
  sexCell.innerText = dog.sex
  editButton.innerText = "Edit Dog"

  wholeRow.id = `dog-${dog.id}`

  // append rows to tableBody
  tableBody.appendChild(wholeRow)
  wholeRow.append(nameCell, breedCell, sexCell, editCell)
  editCell.append(editButton)

  // set eventListener to editButton

  editButton.addEventListener('click', () => editDogInfo(dog.id, dog.name, dog.breed, dog.sex) )

}

function editDogInfo(dogId, dogName, dogBreed, dogSex) {
  // console.log(dogId)
  // console.log(dogName)
  // console.log(dogBreed)
  // console.log(dogSex)
  // find form

  form = document.getElementById('dog-form')

  // populate form with appropriate dog's info

  // let editName = document.querySelectorAll('input')[0].value = dogName
  // // // below is same as above when you insert an id in each input field
  // // // let editName = document.getElementById('name')
  // //
  // let editBreed = document.querySelectorAll('input')[1].value = dogBreed
  // let editSex = document.querySelectorAll('input')[2].value = dogSex

  form.name.value = dogName
  form.breed.value = dogBreed
  form.sex.value = dogSex
  form.dataset.dogId = dogId

  // create submit button on submit cell

  let dogFormButton = document.getElementById('formButton')
   dogFormButton.dataset.dogId = dogId

  debugger


  form.addEventListener('submit', handleSubmitForm)
}

function handleSubmitForm(e){
  e.preventDefault()

  // grab value of inputs and save as variables
  let newName = form.name.value
  let newBreed = form.breed.value
  let newSex = form.sex.value


  // findDogId = e.target.dataset.dogId
  //
  let doggieId = document.getElementById('formButton').dataset.dogId

  // patch fetch

  fetch(`http://localhost:3000/dogs/${doggieId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": newName,
      "breed": newBreed,
      "sex": newSex
    })
  })
  .then(response => response.json())
  .then(updatedDogObject => updateDogFunction)
  // can also pass in updatedDogObject to function as...
  // .then(updatedDogObject => updateDogFunction(updatedDogObject))
}
// ^^^ updates JSON

// updates frontend
function updateDogFunction(updatedDogObject) {
  // debugger
  let dogRow = document.getElementById(`dog-${updatedDogObject.id}`)
  dogRow.children[0].innerText = updatedDogObject.name
  dogRow.children[1].innerText = updatedDogObject.breed
  dogRow.children[2].innerText = updatedDogObject.sex
}
