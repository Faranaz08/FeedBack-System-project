document.addEventListener("DOMContentLoaded", domContentLoader);

function handleFormSubmit(event) {
  event.preventDefault();
  let myObj = {
    name: event.target.name.value,
    rating: event.target.rating.value,
  };

  const userId = event.target.getAttribute("data-user-id");

  if (userId) {
    axios
      .put(
        `https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating/${userId}`,
        myObj
      )
      .then((response) => {
        console.log(response);
        domContentLoader(); // Update the website with new user details
        event.target.reset(); // Clear the form
        event.target.removeAttribute("data-user-id");
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    axios
      .post(
        "https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating",
        myObj
      )
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

function domContentLoader() {
  const container = document.getElementById("allFeedbacks");
  container.innerHTML = "";
  const rating1span = document.getElementById("rating1");
  const rating2span = document.getElementById("rating2");
  const rating3span = document.getElementById("rating3");
  const rating4span = document.getElementById("rating4");
  const rating5span = document.getElementById("rating5");

  axios
    .get("https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating")
    .then((response) => {
      const ratingData = response.data;
      let rating1 = 0;
      let rating2 = 0;
      let rating3 = 0;
      let rating4 = 0;
      let rating5 = 0;

      ratingData.forEach((myObj) => {
        showRatings(myObj, container);
        switch (parseInt(myObj.rating)) {
          case 1:
            rating1++;
            break;
          case 2:
            rating2++;
            break;
          case 3:
            rating3++;
            break;
          case 4:
            rating4++;
            break;
          case 5:
            rating5++;
            break;
        }
      });
      rating1span.textContent = rating1;
      rating2span.textContent = rating2;
      rating3span.textContent = rating3;
      rating4span.textContent = rating4;
      rating5span.textContent = rating5;
    })
    .catch((err) => {
      console.log(err);
    });
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
  axios
    .delete(
      `https://crudcrud.com/api/f759e7557a744b11ba1dac1ffa9f5278/rating/${id}`
    )
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