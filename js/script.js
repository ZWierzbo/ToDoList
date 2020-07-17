{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent}
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
           ...tasks.slice(0, taskIndex),
           ...tasks.slice(taskIndex + 1), 
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done = !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

    }

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const renderTasks = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
            <li 
                class="tasks__item js-task"
                >
                    <button class="tasks__button tasks__button--toggleDone js-toggleDone"> 
                    ${task.done ? "✓" : ""}
                    </button>
                    <span class="tasks__content${task.done ? " tasks__content--done " : ""}">
                    ${task.content}</span>
                    <button class="tasks__button tasks__button--remove js-remove">✗</button>
                
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent
    };

    const renderButtons = () => {
        const hideDone = document.querySelector(".js-hideDone")
        const markAll = document.querySelector(".js-markAsDone")
        const addButton = document.querySelector(".js-addButton")

        const onClick = () => {
            hideDone.innerHTML = `<button class="headerButton">Hide Done</button>`
            markAll.innerHTML = `<button class="headerButton">Mark All</button>`

        };

        addButton.addEventListener("click", onClick);
      

    };

    const bindButtonEvents = () => {};

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonEvents();
    }



    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();


}

// const done = task => task.done;

// const allTasksDone = tasks.filter(done);