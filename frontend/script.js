// ===============================
// SELEÇÃO DE ELEMENTOS DO DOM
// ===============================
// Aqui usamos querySelector para pegar elementos do HTML.
// Isso faz parte da manipulação de DOM (Document Object Model),
// que permite ao JavaScript interagir com a página.

const input = document.querySelector(".add-task input");
const btnAdd = document.querySelector(".btn-add");
const tasksContainer = document.querySelector(".tasks");
const filters = document.querySelectorAll(".filter");

// ===============================
// ESTADO DA APLICAÇÃO
// ===============================
// "Estado" é um conceito importante em programação.
// Ele representa os dados atuais da aplicação.
// Aqui estamos guardando as tarefas e o filtro ativo.

let tasks = []; // Array que guarda todas as tarefas
let currentFilter = "todas"; // Filtro atual (todas, ativas, completas)


// ===============================
// FUNÇÃO: ADICIONAR TAREFA
// ===============================
function addTask() {
    // trim() remove espaços no início e fim
    const text = input.value.trim();

    // Evita adicionar tarefas vazias
    if (text === "") return;

    // Criamos um objeto para representar a tarefa
    // Teoria: objetos são estruturas chave-valor
    const task = {
        id: Date.now(), // gera um ID único baseado no tempo
        text: text,
        completed: false // estado inicial
    };

    // Adiciona a tarefa no array (imutabilidade não é usada aqui)
    tasks.push(task);

    // Limpa o input
    input.value = "";

    // Atualiza a interface
    renderTasks();
}


// ===============================
// FUNÇÃO: RENDERIZAR TAREFAS
// ===============================
function renderTasks() {

    // Limpa o container antes de renderizar novamente
    // Isso evita duplicação de elementos
    tasksContainer.innerHTML = "";

    // Começamos com todas as tarefas
    let filteredTasks = tasks;

    // ===============================
    // FILTRAGEM
    // ===============================
    // Teoria: filter() cria um novo array baseado em uma condição

    if (currentFilter === "ativas") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completas") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    // ===============================
    // CRIAÇÃO DOS ELEMENTOS
    // ===============================
    filteredTasks.forEach(task => {

        // Cria uma div para cada tarefa
        const div = document.createElement("div");
        div.classList.add("task");

        // Se estiver completa, adiciona classe
        if (task.completed) {
            div.classList.add("completed");
        }

        // innerHTML insere conteúdo HTML dinamicamente
        div.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
        `;

        // ===============================
        // EVENTO: CHECKBOX
        // ===============================
        // Quando muda, atualiza o estado da tarefa
        const checkbox = div.querySelector("input");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            // Re-renderiza para refletir mudanças
            renderTasks();
        });

        // ===============================
        // EVENTO: REMOVER TAREFA
        // ===============================
        // Teoria: filter() também é usado para remover itens
        // retornando todos menos o que queremos excluir

        div.addEventListener("dblclick", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        // Adiciona a tarefa ao DOM
        tasksContainer.appendChild(div);
    });

    // Atualiza contadores
    updateStats();
}


// ===============================
// FUNÇÃO: ATUALIZAR CONTADORES
// ===============================
function updateStats() {

    const total = tasks.length;

    // Conta tarefas completas
    const completed = tasks.filter(t => t.completed).length;

    // Ativas = total - completas
    const active = total - completed;

    // Atualiza elementos no DOM
    document.querySelectorAll(".number")[0].textContent = total;
    document.querySelectorAll(".number")[1].textContent = active;
    document.querySelectorAll(".number")[2].textContent = completed;
}


// ===============================
// FILTROS (BOTÕES)
// ===============================
// Aqui usamos eventos para mudar o estado do filtro

filters.forEach(filterBtn => {

    filterBtn.addEventListener("click", () => {

        // Remove classe "active" de todos
        filters.forEach(btn => btn.classList.remove("active"));

        // Adiciona no botão clicado
        filterBtn.classList.add("active");

        const text = filterBtn.textContent.toLowerCase();

        // Define o filtro com base no texto
        if (text.includes("todas")) currentFilter = "todas";
        if (text.includes("ativas")) currentFilter = "ativas";
        if (text.includes("completas")) currentFilter = "completas";

        // Re-renderiza
        renderTasks();
    });
});


// ===============================
// EVENTOS GERAIS
// ===============================

// Clique no botão
btnAdd.addEventListener("click", addTask);

// Enter no input
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


// ===============================
// INICIALIZAÇÃO
// ===============================
// Renderiza ao carregar a página
renderTasks();