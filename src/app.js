const menuBtn = document.querySelector('.menu-btn');
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');
const todoModal = document.querySelector('#modal');
const cover = document.querySelector('.cover');
const listView = document.querySelector('.todo_list');
const addTodo = document.querySelector('.add-todo');

let todos = [
  
];

let menuOpen = false;

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let now = new Date();

let today = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

document.querySelector('.date').innerHTML = today;
document.querySelector('.month').innerHTML = months[month];
document.querySelector('.year').innerHTML = year;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        addBtn.classList.add('move');
        deleteBtn.classList.add('move');
        document.querySelector('.ri-menu-line').classList.add('hide');
        document.querySelector('.ri-close-line').classList.remove('hide');
        menuOpen = !menuOpen;
    } else if (menuOpen) {
        addBtn.classList.remove('move');
        deleteBtn.classList.remove('move');
        document.querySelector('.ri-menu-line').classList.remove('hide');
        document.querySelector('.ri-close-line').classList.add('hide');
        menuOpen = !menuOpen;
    }
});

addBtn.addEventListener('click', () => {
    todoModal.classList.add('active');
    cover.classList.add('active');
});
cover.addEventListener('click', () => {
    todoModal.classList.remove('active');
    cover.classList.remove('active');
});

const hideModal = () => {
    todoModal.classList.remove('active');
    cover.classList.remove('active');
};

deleteBtn.addEventListener('click', () => {
    let newTd = todos.filter(el => {
        return !el.isComplete;
    });

    todos = newTd;
    listRefresh();

});

const complete = (i) => {
    todos[i].isComplete = !todos[i].isComplete;
    listRefresh();
}

const listRefresh = () => {
    listView.innerHTML = "";
    renderTodos();
}

const renderTodos = () => {
    for (const i in todos) {
        let td = todos[i];

        let template = `<div class="list_item ${td.isComplete ? 'complete' : null}">
        <p>
            ${td.title}<br>
            <small>${td.date}</small>
        </p>
        <span onClick ="complete(${i})"></span>
    </div>`;

        listView.insertAdjacentHTML('beforeend', template);
    }
}

addTodo.addEventListener('click', () => {
    event.preventDefault();

    let title = document.querySelector('.new-title').value;
    let date = document.querySelector('.new-date').value;
    let form = document.querySelector('#add-form');

    let temp = {'title': title, "date": date, 'isComplete': false};

    todos.push(temp);

    listRefresh();
    hideModal();
    form.reset();

})

const inititalApp = async() => {

    let localData = await localStorage.getItem('weDoData');

    console.log('localData: ', localData);

    let data = JSON.parse(localData);

    if (localData.length > 0) {
        todos = data;
    }

    renderTodos();
}

inititalApp();

window.addEventListener('beforeunload', function (e) {
    let data = JSON.stringify(todos);
    localStorage.setItem('weDoData', data);
})


//Dark mode
let moon = document.getElementById("night-mode");
moon.onclick = function () {
    document.body.classList.toggle("dark-theme")
}