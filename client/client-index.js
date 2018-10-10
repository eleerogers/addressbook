document.addEventListener('DOMContentLoaded', function () {
  /* your logic here */
  console.log("App Starting......!.!.!.!.!");
  /* ----------------------------------------- */

  populatePeople();
  displayPersonInfo()

  // Populate list of people in Address Book
  function populatePeople() {
    fetch('http://localhost:8080/getAllPeople').then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then(function (response) {
      updatePeopleUISuccess(response);
    }).catch(function (error) {
      console.log(error);
      console.log("ERROR: Error when populating list of people in Address Book");
    });
  }

  // handle populatePeople success
  function updatePeopleUISuccess(response) {
    for (let el of response) {
      const firstname = el.firstname;
      const addressPeopleList = document.getElementById("people");
      people.innerHTML += '<div class="person">' + firstname + '</div>';
    }
    console.log(response);
  }
});

// Address book submit. Adding new person to Address Book. POST REQUEST!
$("#form-submission").submit(function (e) {
  e.preventDefault();
  console.log("form submit clicked")
  addPersonToDB();
});

function addPersonToDB(){
  fetch('http://localhost:8080/createPerson', {
    method: 'POST',
    body: JSON.stringify( 
      { 
        firstname: document.getElementById("firstname-input").value,
        lastname: document.getElementById("lastname-input").value,
        phone: document.getElementById("phone-input").value,
        address: document.getElementById("address-input").value,
        city: document.getElementById("city-input").value,
        state: document.getElementById("state-input").value,
        zipcode: document.getElementById("zipcode-input").value,
      } 
    ),
    headers: {
      "Content-Type": "application/json"
    },
  }).then(response => { window.location.href = 'http://localhost:8080/' })
  .catch(err => console.log('error ', err));
}

function displayPersonInfo(){
  //loop thru array of people on left
  //for each, make fetch request to DB and then display on right
  //const personClassDivs = document.getElementsByClassName("person");
  // for each link clicked, make fetch request to find individual person
  //May be be better to generate this requests on link load.
}

// function linkToInfo(){
//   let test = document.getElementById
// }