export class TodoListDataService {
    static state = [];

    static initilalizeState(state) {
        this.state = state;
    }

    static AddTodoItem(id, value, checked) {
        this.state.push({
            id: id,
            value: value,
            checked: checked,
        });
        console.log(this.state);
    }

    static UpdateTodoItem(id, value) {
        let todoItem = this.state.find((t) => t.id === id);
        todoItem.value = value;
        console.log(this.state);
    }

    static CheckTodoItem(id, checked) {
        let todoItem = this.state.find((t) => t.id === id);
        todoItem.checked = checked;
        console.log(this.state);
    }

    static DeleteTodoItem(id) {
        this.state = this.state.filter((t) => t.id !== id);
        console.log(this.state);
    }
}

/*

state = [
    {
        id: 0,
        value: "Task 0",
        checked: false,
    },
    {
        id: 1,
        value: "Task 1",
        checked: false,
    }
]

*/
