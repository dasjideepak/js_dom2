let id = 0;

let input = document.querySelector("input[type=text]");
let ul = document.querySelector("ul");
let footerList = document.querySelector(".footer");
let counter = document.querySelector(".counter");
let para = document.querySelector(".para");
let toggleAll = document.querySelector(".toggle_all");
let allButton = document.querySelector("#all_button");
let activeButton = document.querySelector("#active_button");
let completedButton = document.querySelector("#completed_button");
let clearCompleted = document.querySelector(".item_completed");

// SST
let todoData = JSON.parse(localStorage.getItem("todoArr")) || [];

// Add Todo Item Function
function addTodoItem(event) {
	if (event.keyCode === 13 && event.target.value.trim() != "") {
		let todo = {
			name: event.target.value,
			isDone: false,
			id: ++id
		};
		todoData.push(todo);
		event.target.value = "";
		todoArray = JSON.parse(localStorage.getItem("todoArr"));
        createUI(todoArray);
        localStorage.setItem("todoArr", JSON.stringify(todoData));
	}
}

// Display Todo Function
function createUI(todoArray) {
	ul.innerHTML = "";

	todoArray.forEach((todo, index) => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		li.setAttribute("data-id", todo.id);
		p.classList.add("para");
		let spanRemove = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		checkInput.setAttribute("data-id", todoArray.indexOf(todo));
		checkInput.id = "tick-" + index;
		
		let label = document.createElement("label");
		label.setAttribute("for", "tick-" + index);
		tickImgBox = document.createElement("div");
		tickImgBox.className = "tick_img_box";
		img = document.createElement("img");
		img.className = "tick";
		img.src = "tick.png";
		
		tickImgBox.appendChild(img);
		label.appendChild(tickImgBox);
		li.appendChild(label);
		checkInput.checked = todo.isDone;
		li.classList.add("li_styles");
		li.setAttribute("data-index", todo.id);
		spanRemove.className = "remove_items";
		spanRemove.setAttribute("data-key", todo.id);
		p.innerHTML = todo.name;
		spanRemove.innerHTML = "×";
		li.append(checkInput, p, spanRemove);
		ul.append(li);
        let checkId = checkInput.parentElement.dataset.id;
        
        checkInput.addEventListener("click", () => handleCheck(checkId));
		p.addEventListener("dblclick", EditTodo);
		activeButton.addEventListener("click", activeStatus);
		if (todo.isDone == true) {
			img.src = "tick.png";
			clearCompleted.classList.remove("item_completed");
			clearCompleted.classList.add("item-cmp");
		} else {
			img.src = "";
		}
	});

	if (todoArray.length > 0) {
		footerList.style.display = "block";
	} else {
		footerList.style.display = "none";
	}
	counter.textContent = itemCount();
}

// Edit Todo
function EditTodo(event) {
	if (event.target.tagName === "P") {
		let currentP = event.target;
		let editInput = document.createElement("input");
		editInput.classList.add("edit_input");
		editInput.value = currentP.textContent;
		currentP.parentElement.replaceChild(editInput, currentP);
		editInput.parentElement.classList.remove("li_styles");
		editInput.parentElement.classList.add("li_styles_input");
        
        editInput.addEventListener("keydown", event1 => {
			if (event1.keyCode === 13 && event1.target.value != "") {
				editInput.parentElement.classList.add("li_styles");
				editInput.parentElement.classList.remove("li_styles_input");
				currentP.textContent = editInput.value;
				editInput.parentElement.replaceChild(currentP, editInput);
				let arr = todoData;
				arr.map(todo => {
					if (todo.id == currentP.parentElement.dataset.index) {
						todo.name = currentP.textContent;
					}
				});
				localStorage.setItem("todoArr", JSON.stringify(arr));
				console.log(arr);
				createUI(arr);
			}
		});
	}
}

// Delete Todo Item Function
function deleteTodo(event) {
	if (event.target.tagName == "SPAN") {
		let target = event.target;
		todoData = todoData.filter(todo => !(target.dataset.key == todo.id));

		todoData.forEach(i => {
			if (i.isDone == true) {
				clearCompleted.classList.remove("item_completed");
				clearCompleted.classList.add("item-cmp");
			} else {
				clearCompleted.classList.remove("item-cmp");
				clearCompleted.classList.add("item_completed");
			}
		});

		localStorage.setItem("todoArr", JSON.stringify(todoData));

		createUI(todoData);
	}
}

function handleCheck(id) {
	let len = 0;
	let checked = todoData.map(item => {
		if (item.id == id) {
			len++;
			item.isDone = !item.isDone;

			if (item.isDone == true) {
				clearCompleted.classList.remove("item_completed");
				clearCompleted.classList.add("item-cmp");
			} else {
				clearCompleted.classList.remove("item-cmp");
				clearCompleted.classList.add("item_completed");
			}
			return item;
		} else return item;
	});
	localStorage.setItem("todoArr", JSON.stringify(checked));
	createUI(checked);
	itemCount(len);
}

// Item left
function itemCount() {
	let arr = todoData.filter(todo => todo.isDone == false);
	return arr.length;
}

function toggleAllInput() {
	let arr = todoData;
	let flag;
	arr.filter(todo => {
		if (todo.isDone == false) {
			todo.isDone = true;
			flag = 1;
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	createUI(arr);
	if (flag != 1) {
		arr.filter(todo => {
			if (todo.isDone == true) {
				todo.isDone = false;
				flag = 0;
			}
		});
	}
	localStorage.setItem("todoArr", JSON.stringify(arr));
	createUI(arr);
}

// All Todo
function allStatus() {
	allButton.classList.add("btnBorder");
	completedButton.classList.remove("btnBorder");
	activeButton.classList.remove("btnBorder");
	createUI(todoData);
}

// Active Todo
function activeStatus() {
	allButton.classList.remove("btnBorder");
	completedButton.classList.remove("btnBorder");
	activeButton.classList.add("btnBorder");
	let arr = todoData.filter(i => i.isDone == false);
	createUI(arr);
	footerList.style.display = "block";
}

// Completed Todo
function completedStatus() {
	allButton.classList.remove("btnBorder");
	activeButton.classList.remove("btnBorder");
	completedButton.classList.add("btnBorder");
	let arr = todoData.filter(todo => todo.isDone == true);
	createUI(arr);
	footerList.style.display = "block";
}

// Clear Completed
function clearStatus() {
	let arr = todoData.filter(todo => todo.isDone == false);
	arr.forEach(todo => {
		if (todo.isDone == true) {
			clearCompleted.classList.remove("item_completed");
			clearCompleted.classList.add("item-cmp");
		} else {
			clearCompleted.classList.remove("item-cmp");
			clearCompleted.classList.add("item_completed");
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	todoData = arr;
	createUI(todoData);
}
createUI(todoData);

// Adding addEventlistener()
input.addEventListener("keydown", addTodoItem);
ul.addEventListener("click", deleteTodo);
activeButton.addEventListener("click", activeStatus);
allButton.addEventListener("click", allStatus);
allButton.classList.add("button_border");
completedButton.addEventListener("click", completedStatus);
clearCompleted.addEventListener("click", clearStatus);
toggleAll.addEventListener("click", toggleAllInput);