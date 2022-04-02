import { TodoListDataService } from "../services/todoListService.js";

const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <style>
        @import url('./src/components/todoItemComponent.css')
    </style>
    <div class="todo-item">
        <input class="todo-check" type="checkbox"/>
        <div class="todo-content">
            <input class="content-input" hidden type="text"/>
            <span class="content-display"></span>
        </div>
        <div class="spacer"></div>
        <button class="delete-todo-item-btn">✕</button>
    </div>
`;

export class TodoItemComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));

        this.editingContent = false;
        this.mouseDownEl = null;

        this.todoItem = this.shadowRoot.querySelector(".todo-item");

        this.todoCheck = this.todoItem.querySelector(".todo-check");
        this.todoContent = this.todoItem.querySelector(".todo-content");
        this.contentInput = this.todoContent.querySelector(".content-input");
        this.contentDisplay =
            this.todoContent.querySelector(".content-display");
        this.deleteTodoItemBtn = this.todoItem.querySelector(
            ".delete-todo-item-btn"
        );
    }

    connectedCallback() {
        this.contentInput.value = "Task " + this.id;
        this.contentDisplay.innerHTML = this.contentInput.value;

        TodoListDataService.AddTodoItem(
            this.id,
            this.contentInput.value,
            false
        );

        this.contentDisplay.addEventListener("click", (e) =>
            this.editContent(e)
        );

        this.todoItem.addEventListener("mousedown", (e) =>
            this.todoItemClicked(e)
        );

        document.addEventListener("mousedown", (e) => this.documentClicked(e));

        this.deleteTodoItemBtn.addEventListener("click", (e) =>
            this.deleteTodoItem(e)
        );

        this.todoCheck.addEventListener("click", (e) => this.toggleChecked(e));
    }

    toggleChecked(e) {
        e.stopPropagation();
        TodoListDataService.CheckTodoItem(this.id, e.target.checked);
    }

    deleteTodoItem(e) {
        e.stopPropagation();
        let todoItem = this;
        if (todoItem.parentNode) {
            TodoListDataService.DeleteTodoItem(todoItem.id);
            todoItem.parentNode.removeChild(todoItem);
        }
    }

    todoItemClicked(e) {
        this.mouseDownEl = e.target;
    }

    documentClicked(e) {
        if (
            !this.mouseDownEl ||
            (this.mouseDownEl &&
                !this.mouseDownEl.matches(".content-input") &&
                this.editingContent)
        ) {
            this.saveContent(e);
        }
        this.mouseDownEl = null;
    }

    editContent(e) {
        e.stopPropagation();

        this.editingContent = true;
        this.contentInput.hidden = false;
        this.contentDisplay.hidden = true;
    }

    saveContent(e) {
        e.stopPropagation();
        if (this.editingContent) {
            this.editingContent = false;
            this.contentDisplay.innerHTML = this.contentInput.value;

            this.contentInput.hidden = true;
            this.contentDisplay.hidden = false;

            TodoListDataService.UpdateTodoItem(
                this.id,
                this.contentInput.value
            );
        }
    }

    disconnectedCallback() {}
}
