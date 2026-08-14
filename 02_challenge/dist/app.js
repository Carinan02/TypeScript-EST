"use strict";
var Status;
(function (Status) {
    Status["done"] = "done";
    Status["inprogress"] = "in-progress";
    Status["todo"] = "todo";
})(Status || (Status = {}));
const todoItems = [
    { id: 1, title: "Learn HTML", status: Status.done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: Status.inprogress },
    { id: 3, title: "Write the best app in the world", status: Status.todo },
];
function addTodoItem(todo) {
    const id = getNextId(todoItems);
    console.log(id);
    const newTodo = {
        id,
        title: todo,
        status: Status.todo
    };
    todoItems.push(newTodo);
    return newTodo;
}
function getNextId(items) {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1;
}
const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app");
console.log(JSON.stringify(newTodo));
