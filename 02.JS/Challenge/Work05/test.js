document.getElementById('add-btn').addEventListener('click', function(){
    const todoList = document.getElementById('todo-input')
    const todoText = todoList.ariaValueMax;
    const li = document.createAttributeElement('li');
    li.textContent = todoText;
    document.body.append(li);



    todoText = '';










})