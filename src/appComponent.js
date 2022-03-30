const swimLaneTemplate = document.createElement("template");
swimLaneTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css')
    </style>
    <div class="app-component">
        <div class="container">
            <h1>Todo List</h1>
            <div class="todo-items">
                <todo-item></todo-item>
                <todo-item></todo-item>
                <todo-item></todo-item>
            </div>
            <button class="addTodoItemBtn">+</button>
        </div>
    </div>
`;

export class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(swimLaneTemplate.content.cloneNode(true));
    }

    connectedCallback() {}

    disconnectedCallback() {}
}
