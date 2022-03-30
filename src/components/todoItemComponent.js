const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <style>
        @import url('./src/components/todoItemComponent.css')
    </style>
    <div class="todo-item">
        <input type="checkbox"/>
        <div class="todo-content">
            <input class="content-input" hidden type="text" value="Task"/>
            <span class="content-display">Task</span>
        </div>
        <button class="deleteTodoItemBtn">-</button>
    </div>
`;

export class TodoItemComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));

        this.editingContent = false;

        this.todoItem = this.shadowRoot.querySelector(".todo-item");

        this.todoContent = this.todoItem.querySelector(".todo-content");
        this.contentInput = this.todoContent.querySelector(".content-input");
        this.contentDisplay =
            this.todoContent.querySelector(".content-display");
    }

    connectedCallback() {
        this.contentDisplay.addEventListener("click", (e) =>
            this.editContent(e)
        );

        this.todoItem.addEventListener("mousedown", (e) =>
            this.todoItemClicked(e)
        );

        console.log(this.parentNode);
    }

    //#region Edit Content

    todoItemClicked(e) {
        let mouseDownEl = e.target;
        if (!mouseDownEl.matches(".content-input") && this.editingContent) {
            this.saveContent(e);
        }
    }

    editContent(e) {
        e.stopPropagation();

        this.editingContent = true;
        this.contentInput.hidden = false;
        this.contentDisplay.hidden = true;
    }

    saveContent(e) {
        e.stopPropagation();

        this.editingContent = false;
        this.contentDisplay.innerHTML = this.contentInput.value;

        this.contentInput.hidden = true;
        this.contentDisplay.hidden = false;
    }

    //#endregion Edit Content

    disconnectedCallback() {}
}
