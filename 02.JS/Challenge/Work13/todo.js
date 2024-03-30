const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
let todoArr = [];

// 할일 추가, 화면 보여주기, 할일 수정하기, 할일 삭제하기

// 로컬 저장소에 저장하기
function saveTodo() {
    const todoString = JSON.stringify(todoArr);
    localStorage.setItem('myTodo', todoString);
}

// 삭제 하기
function handleTodoDelBtnClick(clickedId) {
    todoArr = todoArr.filter((aTodo) => {
        return aTodo.todoId !== clickedId;
    });
    displayTodo();
    saveTodo();
}

// 수정 하기
function handleTodoItemClick(clickedId) {
    todoArr = todoArr.map((aTodo) => {
        if (aTodo.todoId === clickedId) {
            return {
                ...aTodo,
                todoDone: !aTodo.todoDone,
            };
        } else {
            return { ...aTodo };
        }
    });
    displayTodo();
    saveTodo();
}

// 표시
const displayTodo = () => {
    todoList.innerHTML = '';

    todoArr.forEach((aTodo) => {
        const todoItem = document.createElement('li');
        const todoDelBtn = document.createElement('span');
        todoDelBtn.textContent = 'x';
        todoItem.textContent = aTodo.todoText;
        todoItem.title = '클릭하면 완료됨';
        if (aTodo.todoDone) {
            todoItem.classList.add('done');
        } else {
            todoItem.classList.add('yet');
        }
        todoDelBtn.title = '클릭하면 삭제됨';

        todoItem.addEventListener('click', () => {
            handleTodoItemClick(aTodo.todoId);
        });

        todoDelBtn.addEventListener('click', () => {
            handleTodoDelBtnClick(aTodo.todoId);
        });

        todoItem.appendChild(todoDelBtn);
        todoList.appendChild(todoItem);
    });
};

// 추가
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const toBeAdded = {
        todoText: todoForm.todo.value,
        todoId: new Date().getTime(),
        todoDone: false,
    };
    todoForm.todo.value = '';
    todoArr.push(toBeAdded);
    displayTodo();
    saveTodo();
});

// 로컬 저장소에 가져오기
function loadTodo() {
    const todoArray = localStorage.getItem('myTodo');
    if (todoArray !== null) {
        todoArr = JSON.parse(todoArray);
        displayTodo();
    }
}
loadTodo();
