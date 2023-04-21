const menuBtn = document.querySelector('.menu-btn');
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');

menuBtn.addEventListener('click', () => {
    addBtn.classList.add('move');
    deleteBtn.classList.add('move');
})