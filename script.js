document.addEventListener("DOMContentLoaded", domContentLoader);

function handleFormSubmit(event) {
  event.preventDefault();
  let myObj = {
    name: event.target.name.value,
    rating: event.target.rating.value,
  };

  const userId = event.target.getAttribute("data-user-id");

  if (userId) {
    axios.put(`https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating/${userId}`,myObj)
      .then((response) => {
        console.log(response);
        domContentLoader(); 
        event.target.reset();
        event.target.removeAttribute("data-user-id");
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    axios.post("https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating",myObj)
      .then((response) => {
        console.log(response);
        domContentLoader();
        event.target.reset;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
async function domContentLoader() {
    const container = document.getElementById("allFeedbacks");
    container.innerHTML = "";
    const rating1span = document.getElementById("rating1");
    const rating2span = document.getElementById("rating2");
    const rating3span = document.getElementById("rating3");
    const rating4span = document.getElementById("rating4");
    const rating5span = document.getElementById("rating5");
  
    try {
      const response = await fetch("https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const ratingData = await response.json();

      const ratingsCount = [0, 0, 0, 0, 0];
  
      for (const myObj of ratingData) {
        showRatings(myObj, container);

        const ratingIndex = parseInt(myObj.rating) - 1;
        if (ratingIndex >= 0 && ratingIndex < ratingsCount.length) {
          ratingsCount[ratingIndex]++;
        }
      }

      rating1span.textContent = ratingsCount[0];
      rating2span.textContent = ratingsCount[1];
      rating3span.textContent = ratingsCount[2];
      rating4span.textContent = ratingsCount[3];
      rating5span.textContent = ratingsCount[4];
    } catch (err) {
      console.log(err);
    }
  }
  

function showRatings(myObj, container) {
  const string = `${myObj.name} ${myObj.rating}`;
  document.getElementById("name").value = "";
  document.getElementById("rating").value = "";

  const newRating = document.createElement("div");
  const newRatingText = document.createTextNode(string);
  newRating.appendChild(newRatingText);
  container.appendChild(newRating);

  const deleteButton = document.createElement("button");
  const deleteButtonText = document.createTextNode("Delete");
  deleteButton.appendChild(deleteButtonText);
  deleteButton.className = "deleteButton";
  newRating.appendChild(deleteButton);

  const editButton = document.createElement("button");
  const editButtonText = document.createTextNode("Edit");
  editButton.appendChild(editButtonText);
  editButton.className = "edit-button";
  newRating.appendChild(editButton);

  newRating.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteButton")) {
      const userToDelete = event.target.parentElement;
      userToDelete.remove();
      deleteUser(myObj._id);
    } else if (event.target.classList.contains("edit-button")) {
      newRating.remove();
      document.getElementById("name").value = myObj.name;
      document.getElementById("rating").value = myObj.rating;
      document.querySelector("form").setAttribute("data-user-id", myObj._id);
    }
  });
}

function deleteUser(id) {
  axios.delete(`https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating/${id}`)
    .then((response) => {
      removeUserFromScreen(id);
      domContentLoader();
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeUserFromScreen(id) {
  const parentNode = document.getElementById("allFeedbacks");
  const ChildNodeToBeRemoved = document.getElementById(id);
  if (ChildNodeToBeRemoved) {
    parentNode.removeChild(ChildNodeToBeRemoved);
  }
}