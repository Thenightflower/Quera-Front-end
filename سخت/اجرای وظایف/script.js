let isPageVisible = true;

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        isPageVisible = true;
    } else {
        isPageVisible = false;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
            alert("Notifications are disabled. Please enable them to receive task alerts.");
        }
    });

    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });

    function addTask() {
        const taskName = document.getElementById('taskName').value;
        const taskTime = new Date(document.getElementById('taskTime').value);
        const taskDuration = parseInt(document.getElementById('taskDuration').value, 10) * 1000; // convert seconds to milliseconds
        const taskDependency = document.getElementById('taskDependency').value;
        const now = new Date();
        const startDelay = taskTime.getTime() - now.getTime(); // calculate delay until task start

        if (startDelay < 0) {
            alert('Task start time cannot be in the past.');
            return;
        }

        const task = {
            name: taskName,
            time: taskTime.toISOString(),
            duration: taskDuration,
            dependency: taskDependency,
            status: 'Scheduled'
        };

        saveTaskToLocalStorage(task);
        appendTaskToList(task);
        scheduleTask(task, startDelay);
        form.reset();
    }

    function scheduleTask(task, startDelay) {
        setTimeout(() => {
            checkDependenciesAndStartTask(task);
        }, startDelay);
    }

    function checkDependenciesAndStartTask(task) {
        if (task.dependency && isTaskPending(task.dependency)) {
            setTimeout(() => {
                checkDependenciesAndStartTask(task);
            }, 1000); // Check every second if dependency is complete
        } else {
            startTask(task);
        }
    }

    function startTask(task) {
        task.status = 'Running';
        updateTaskInDOMAndStorage(task);

        if (!isPageVisible) {
            if (Notification.permission === "granted") {
                new Notification('Task Started', {
                    body: `Task '${task.name}' has started.`,
                    icon: 'assets/icon.png'
                });
            }
        }

        showNotification(`Task '${task.name}' has started.`);

        setTimeout(() => {
            completeTask(task);
        }, task.duration);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        const messageP = document.createElement('p');
        messageP.textContent = message;
        const messageImg = document.createElement('img');
        messageImg.src = 'assets/icon.png';
        messageImg.width = 20;
        messageImg.height = 20;
        notification.appendChild(messageImg);
        notification.appendChild(messageP);

        const notificationsContainer = document.getElementById('notifications-container');
        if (!notificationsContainer) {
            createNotificationsContainer();
        }
        document.getElementById('notifications-container').appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function createNotificationsContainer() {
        const container = document.createElement('div');
        container.setAttribute('id', 'notifications-container');
        container.style.position = 'fixed';
        container.style.right = '20px';
        container.style.bottom = '20px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }


    function completeTask(task) {
        task.status = 'Done';
        updateTaskInDOMAndStorage(task);
    }

    function isTaskPending(dependencyName) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const dependentTask = tasks.find(t => t.name === dependencyName);
        return dependentTask && dependentTask.status !== 'Done';
    }

    function appendTaskToList(task) {
        const row = document.createElement('tr');
        row.id = task.name;

        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;

        const timeCell = document.createElement('td');
        timeCell.textContent = new Date(task.time).toLocaleString();

        const statusCell = document.createElement('td');
        statusCell.textContent = task.status;

        const dependencyCell = document.createElement('td');
        dependencyCell.textContent = task.dependency;

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.style = 'font-size:16px;background-color:#a83236;background-image:none;color:#fff;cursor:pointer';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            removeTask(row, task);
        };
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(timeCell);
        row.appendChild(statusCell);
        row.appendChild(dependencyCell);
        row.appendChild(actionCell);

        taskList.appendChild(row);
    }

    function updateTaskInDOMAndStorage(task) {
        const row = document.getElementById(task.name);
        const cells = row.getElementsByTagName('td');
        cells[0].textContent = task.name;
        cells[1].textContent = new Date(task.time).toLocaleString();
        cells[2].textContent = task.status;
        cells[3].textContent = task.dependency;
        updateTaskInLocalStorage(task);
    }

    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskInLocalStorage(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.name === updatedTask.name ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            appendTaskToList(task);
            if (task.status === 'Scheduled' || task.status === 'Running') {
                const now = new Date();
                const startTime = new Date(task.time);
                const timeToStart = startTime.getTime() - now.getTime();
                scheduleTask(task, Math.max(timeToStart, 0));
            }
        });
    }

    function removeTask(row, task) {
        const tbody = document.getElementById('taskList');
        tbody.removeChild(row);
        removeTaskFromLocalStorage(task);
    }

    function removeTaskFromLocalStorage(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.name !== taskToRemove.name);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    loadTasksFromLocalStorage();
});
