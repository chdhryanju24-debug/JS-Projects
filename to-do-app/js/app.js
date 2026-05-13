const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.querySelector('.todo-list');

/* ================= SAVE TASKS ================= */

function saveTasks() {

    const tasks = [];

    document.querySelectorAll('.todo-list li').forEach((li) => {

        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.querySelector('.task-text')
                .classList.contains('completed')
        });

    });

    sessionStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );

}

/* ================= CREATE TASK ================= */

function createTask(taskText, completed = false) {

    const li = document.createElement('li');

    li.innerHTML = `

        <div class="task-left">

            <span class="check-circle">
                ${completed ? '✓' : ''}
            </span>

          <span class="task-text ${completed ? 'completed' : ''}">${taskText}</span>

        </div>

        <div class="actions">

            <button class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
    `;

    todoList.appendChild(li);

    /* IMPORTANT */

    const taskTextEl = li.querySelector('.task-text');
    const checkCircle = li.querySelector('.check-circle');

    /* COMPLETE TASK */

    li.addEventListener('click', (e) => {

        // Prevent edit/delete button clicks
        if (
            e.target.closest('.edit-btn') ||
            e.target.closest('.delete-btn')
        ) {
            return;
        }

        taskTextEl.classList.toggle('completed');

        if (taskTextEl.classList.contains('completed')) {

            checkCircle.innerHTML = '✓';

        } else {

            checkCircle.innerHTML = '';

        }

        saveTasks();

    });

    /* DELETE TASK */

    li.querySelector('.delete-btn')
        .addEventListener('click', () => {

            const check = confirm(
                'Delete this task?'
            );

            if (check) {

                li.remove();

                saveTasks();

            }

        });

    /* EDIT TASK */

    li.querySelector('.edit-btn')
        .addEventListener('click', () => {

            const newTask = prompt(
                'Edit Task',
                taskTextEl.textContent
            );

            if (newTask !== null && newTask.trim() !== '') {

                taskTextEl.textContent = newTask;

                saveTasks();

            }

        });

    saveTasks();

}

/* ================= ADD TASK ================= */

addBtn.addEventListener('click', () => {

    const taskText = todoInput.value.trim();

    if (taskText !== '') {

        createTask(taskText);

        todoInput.value = '';

    } else {

        alert('write some text');

    }

});

/* ================= LOAD TASKS ================= */

(() => {

    const savedTasks =
        JSON.parse(sessionStorage.getItem('tasks')) || [];

    savedTasks.forEach((task) => {

        createTask(task.text, task.completed);

    });

})();