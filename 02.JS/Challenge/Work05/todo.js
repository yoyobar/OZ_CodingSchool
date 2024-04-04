//global

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const alert = document.querySelector('.alert');
let todoArray = [];

// 생성된 li>button으로의 삭제판단, 조건 : 이벤트 발생 후 함수호출, Array.filter로 반환
const todoDel = (todoId) => {
    todoArray = todoArray.filter((aTodo) => {
        return aTodo.id !== todoId;
    });
    todoDisplay();
    todoSave();
};

// 생성된 li의 mark변환, 조건 : 이벤트 발생 후 함수호출, Array.map로 변환
const todoMark = (todoId) => {
    todoArray = todoArray.map((aTodo) => {
        console.log(aTodo);
        if (aTodo.id === todoId) {
            return {
                ...aTodo,
                mark: !aTodo.mark,
            };
        } else {
            return {
                ...aTodo,
            };
        }
    });
    todoDisplay();
    todoSave();
};

// 생성된 Array표기, 조건 : 이벤트 발생 후 함수호출, 각각 forEach로 데이터 참조 가능하게
const todoDisplay = () => {
    todoList.innerHTML = '';
    todoArray.forEach((aTodo) => {
        const todoItem = document.createElement('li');
        const todoItemBtn = document.createElement('button');
        todoItem.title = '누를 경우 완료 처리 됩니다';
        todoItemBtn.title = '누를 경우 삭제 처리 됩니다';
        todoItem.textContent = aTodo.name;
        todoItemBtn.textContent = 'X';

        // 클래스 삽입으로 구별
        if (aTodo.mark) {
            todoItem.classList.add('marked');
        } else {
            todoItem.classList.add('unmarked');
        }
        todoItem.addEventListener('click', () => {
            todoMark(aTodo.id);
        });
        todoItemBtn.addEventListener('click', () => {
            todoDel(aTodo.id);
        });
        todoList.appendChild(todoItem);
        todoItem.appendChild(todoItemBtn);
    });
};

// Array 생성, 조건 : submit 이벤트 발생
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const addContent = {
        name: todoForm.todo.value,
        id: new Date().getTime(),
        mark: false,
    };
    if (addContent.name === '') {
        return alert.classList.remove('hidden');
    }

    todoArray.push(addContent);
    todoForm.todo.value = '';
    todoDisplay();
    todoSave();
});

// localStorage의 저장
const todoSave = () => {
    const todoSaveList = JSON.stringify(todoArray);
    localStorage.setItem('myTodo', todoSaveList);
};

// localStorage의 불러오기
const todoLoad = () => {
    const todoLoadList = localStorage.getItem('myTodo');
    if (todoLoadList === null) {
        return alert('localStorage is Empty');
    } else {
        todoArray = JSON.parse(todoLoadList);
        todoDisplay();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    todoLoad();
});

// alert 박스 되돌리기
alert.addEventListener('click', () => {
    alert.classList.toggle('hidden');
});
