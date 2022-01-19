// to display the first elements data 
const taskContainer = document.querySelector(".task-container");


// Global Storage --> which will be store the images and details in the array

const globalStore = []; //it is an array so push will work
console.log(taskContainer);

const generateNewCard = (taskData) => {
    // html in js using template literals to generate new card
    return `
      <div id=${taskData.id} class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-end gap-2">
                      <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                      <button id="${taskData.id}" type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <div class="p-2">
                      <img src=${taskData.imageurl} class="card-img-top" alt="">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title fw-bold text-primary">${taskData.tasktitle}</h5>
                      <p class="card-text">${taskData.taskdescription}</p>
                      <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
                    </div>
                  </div>
      </div>
      `;
};

const LoadInitialCardData = () => {
    // Local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky");


    // Converting the string into a normal object
    // Destructuring
    const { cards } = JSON.parse(getCardData);


    // Loop over the array of task object to create HTML cards, and then inject it to our DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
    });

    // Update our global store
    globalStore.push(cardObject);
};


// Delete Button
const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) = cardObject.id != targetID);
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

    if (tagname === "BUTTON") {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    } else {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
}


// Save the data entered by the user
const saveChanges = () => {
    const taskData = {
        // Date.now is used to get the unique number every time
        id: `${Date.now()}`,
        imageurl: document.getElementById("imageURL").value,
        tasktitle: document.getElementById("taskTitle").value,
        tasktype: document.getElementById("taskTitle").value,
        taskdescription: document.getElementById("taskDescription").value
    };
    // insertAdjacentHTML is a inbuilt method
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    // in local storage objects like data is not allowed i.e we have declare globalstore array-- or it does not accept array of objects
    // it accepts string data type
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore })); // to convert json objects into string
};