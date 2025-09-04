const form = document.getElementById("form");
const input = document.getElementById("task");
const list = document.getElementById("list");
// const item = document.querySelectorAll(".list-item");
const err = document.getElementById("status");
const todayDate = document.getElementById("date");
const todayTime = document.getElementById("time");

setInterval(() => {
  const today = new Date();
  todayDate.textContent = today.toDateString();
  todayTime.textContent = today.toLocaleTimeString();
}, 1000);

//function to render all tasks
function renderTasks() {
  //get previous localStorage data or initailie new empty array
  const tasksArray = JSON.parse(localStorage.getItem("list-task")) || [];

  //make the container empty
  list.innerHTML = "";

  tasksArray.map((task) => {
    //create li elements and append them to the list
    const tag = document.createElement("li");
    tag.className =
      "px-2 py-1 shadow-md my-2 rounded-md capitalize text-lg hover:bg-gradient-to-r hover:from-[#aebfb3] hover:to-[#1f2421]   hover:text-gray-950 list-item cursor-pointer relative group duration-500 transition-all";
    const span = document.createElement("span");
    span.textContent = task;
    tag.appendChild(span);
    list.appendChild(tag);

    //creat container
    const container = document.createElement("div");
    container.className =
      "h-[70%] px-2 rounded-md shadow-md right-1 top-1/2 -translate-y-1/2 absolute flex justify-between items-center duration-200 transition-all";

    //append container to the li
    tag.appendChild(container);

    //create a button to delete a listItem
    const deleteIcon = document.createElement("i");
    deleteIcon.className =
      "bi bi-trash absoute right-0 top-0 hover:text-gray-200 group-hover:text-gray-500 duration-200 transition-all cursor-pointer deleteIcon";

    //append deleteIcon to container
    container.appendChild(deleteIcon);
  });
}

//render all stored tasks when DOM loaded
window.addEventListener("DOMContentLoaded", renderTasks);

//add event listener for submitting the form
form.addEventListener("submit", (e) => {
  //prevent default behavior
  e.preventDefault();

  //create an instance of FormData
  const formData = new FormData(form);

  //make the error container empty
  err.textContent = "";

  //stored regex condition in a variable
  const taskPattern = /^.{10,40}$/;

  //get the task value from input
  const task = formData.get("task").trim();

  //check if the input value doesn't match the regex rule
  if (!taskPattern.test(task)) {
    //if so show the error message and stop execution by returning
    err.textContent =
      " task should should have character length between 15 and 40";
    return;
  }

  //if not log the task to see the result(optional)
  console.log(task);

  //keep error container empty
  err.textContent = "";

  //get all pravious data from localStorage or initialize new empty array to store tasks
  let tasksArray = JSON.parse(localStorage.getItem("list-task")) || [];

  //push task into array
  tasksArray.push(task);

  //convert the tasksArray into json format and store it inside localStorage
  localStorage.setItem("list-task", JSON.stringify(tasksArray));

  //call renderTasks function to render all data
  renderTasks();

  //empty the input
  input.value = "";

  //console tasksArray to see the result(optional)
  console.log(tasksArray);
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteIcon")) {
    const li = e.target.closest("li");
    const taskText =
      e.target.parentElement.previousElementSibling.textContent.trim();
    console.log(taskText);

    Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanantely deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let tasksArray = JSON.parse(localStorage.getItem("list-task")) || [];
        console.log(tasksArray);
        tasksArray = tasksArray.filter((task) => task.trim() !== taskText);
        console.log(tasksArray);

        localStorage.setItem("list-task", JSON.stringify(tasksArray));
        renderTasks();
        Swal.fire("deleted!", "your task has been deleted.");
      }
    });
  }
});
