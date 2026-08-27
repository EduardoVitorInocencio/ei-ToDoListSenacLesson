const STORAGE_KEY = "todo-list.tasks";

const elements = {
    form: document.querySelector("#task-form"),
    input: document.querySelector("#task-input"),
    list: document.querySelector("#task-list"),
    emptyState: document.querySelector("#empty-state"),
    feedback: document.querySelector("#feedback"),
    filters: document.querySelectorAll(".filter"),
    totalCount: document.querySelector("#total-count"),
    activeCount: document.querySelector("#active-count"),
    completedCount: document.querySelector("#completed-count"),
    progressCopy: document.querySelector("#progress-copy"),
    progressBar: document.querySelector("#progress-bar"),
    progressTrack: document.querySelector(".progress-track")
};

let tasks = loadTasks();
let currentFilter = "all";
let feedbackTimer;

function loadTasks() {
    try {
        const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(savedTasks)) return [];

        return savedTasks
            .filter(task => task && typeof task.id === "string")
            .map(task => ({
                id: task.id,
                description: typeof task.description === "string" ? task.description : task.text,
                status: task.status || (task.completed ? "completed" : "active"),
                createdAt: task.createdAt || new Date().toISOString()
            }))
            .filter(task => (
                typeof task.description === "string"
                && ["active", "completed"].includes(task.status)
            ));
    } catch {
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createId() {
    if (typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function showFeedback(message, type = "success") {
    window.clearTimeout(feedbackTimer);
    elements.feedback.textContent = message;
    elements.feedback.classList.toggle("error", type === "error");

    feedbackTimer = window.setTimeout(() => {
        elements.feedback.textContent = "";
        elements.feedback.classList.remove("error");
    }, 2800);
}

function addTask(text) {
    const normalizedText = text.trim().replace(/\s+/g, " ");

    if (!normalizedText) {
        showFeedback("Digite uma descrição antes de adicionar.", "error");
        elements.input.focus();
        return;
    }

    tasks.unshift({
        id: createId(),
        description: normalizedText,
        status: "active",
        createdAt: new Date().toISOString()
    });

    saveTasks();
    render();
    elements.form.reset();
    elements.input.focus();
    showFeedback("Tarefa adicionada com sucesso.");
}

function toggleTask(taskId) {
    tasks = tasks.map(task => (
        task.id === taskId
            ? { ...task, status: task.status === "completed" ? "active" : "completed" }
            : task
    ));

    saveTasks();
    render();
}

function removeTask(taskId) {
    const taskToRemove = tasks.find(task => task.id === taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    render();

    if (taskToRemove) {
        showFeedback(`Tarefa "${taskToRemove.description}" removida.`);
    }
}

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => task.status === "active");
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.status === "completed");
    }

    return tasks;
}

function createTaskElement(task) {
    const item = document.createElement("article");
    const isCompleted = task.status === "completed";
    item.className = `task${isCompleted ? " completed" : ""}`;
    item.dataset.taskId = task.id;

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.setAttribute("aria-label", `${isCompleted ? "Reabrir" : "Concluir"} tarefa: ${task.description}`);

    const description = document.createElement("span");
    description.className = "task-text";
    description.textContent = task.description;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Remover tarefa: ${task.description}`);
    deleteButton.title = "Remover tarefa";
    deleteButton.textContent = "✕";

    item.append(checkbox, description, deleteButton);
    return item;
}

function updateStats() {
    const completed = tasks.filter(task => task.status === "completed").length;
    const active = tasks.length - completed;

    elements.totalCount.textContent = tasks.length;
    elements.activeCount.textContent = active;
    elements.completedCount.textContent = completed;

    const percentage = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
    elements.progressBar.style.width = `${percentage}%`;
    elements.progressTrack.setAttribute("aria-valuenow", String(percentage));

    if (tasks.length === 0) {
        elements.progressCopy.textContent = "Comece adicionando sua primeira tarefa.";
        return;
    }

    if (active === 0) {
        elements.progressCopy.textContent = "Tudo concluído. Excelente trabalho!";
        return;
    }

    elements.progressCopy.textContent = `${percentage}% concluído • ${active} ${active === 1 ? "tarefa pendente" : "tarefas pendentes"}`;
}

function updateEmptyState(filteredTasks) {
    const title = elements.emptyState.querySelector("h3");
    const copy = elements.emptyState.querySelector("p");
    elements.emptyState.hidden = filteredTasks.length > 0;

    if (currentFilter === "active" && tasks.length > 0) {
        title.textContent = "Nenhuma tarefa ativa";
        copy.textContent = "Muito bem! Todas as suas tarefas estão concluídas.";
    } else if (currentFilter === "completed" && tasks.length > 0) {
        title.textContent = "Nenhuma tarefa concluída";
        copy.textContent = "Conclua uma tarefa para acompanhar seu progresso aqui.";
    } else {
        title.textContent = "Nenhuma tarefa por aqui";
        copy.textContent = "Adicione uma tarefa acima e comece a transformar planos em progresso.";
    }
}

function render() {
    const filteredTasks = getFilteredTasks();
    elements.list.replaceChildren(...filteredTasks.map(createTaskElement));
    updateStats();
    updateEmptyState(filteredTasks);
}

elements.form.addEventListener("submit", event => {
    event.preventDefault();
    addTask(elements.input.value);
});

elements.input.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    addTask(elements.input.value);
});

elements.list.addEventListener("change", event => {
    if (!event.target.matches(".task-checkbox")) return;
    toggleTask(event.target.closest(".task").dataset.taskId);
});

elements.list.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-action='delete']");
    if (!deleteButton) return;
    removeTask(deleteButton.closest(".task").dataset.taskId);
});

elements.filters.forEach(filterButton => {
    filterButton.addEventListener("click", () => {
        currentFilter = filterButton.dataset.filter;

        elements.filters.forEach(button => {
            const isActive = button === filterButton;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        render();
    });
});

render();
