import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoItem from './ToDoItem';

class ToDoList extends React.Component {
    constructor(props) {
        // Model
        super(props);
        this.state = {todos: []}
        this.createToDo = this.createToDo.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.removeToDo = this.removeToDo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    };


    // Controller
    createToDo(item) {
        this.setState({
            todos: [...this.state.todos, item]
        });
    };

    generateKey() {
        return Date.now();
    };

    removeToDo(id) {
        const deletedToDos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.isDeleted = true
            }
        return todo;
        });
        this.setState({todos: deletedToDos})
    };

    toggleComplete(id) {
        const completedToDos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted
            }
        return todo;
        });
        this.setState({todos: completedToDos})
    }

    filterToDo() {
        const filters = {
            All: () => true,
            Active: task => !task.completed,
            Completed: task => task.completed
        };
    }

    render() {
        // View
        const newToDo = this.state.todos.map((item) => {
            console.log(item);
            return (
                <ToDoItem 
                key={item.id}
                id={item.id}
                value={item.value}
                completed={item.isCompleted}
                remove={this.removeToDo}
                complete={this.toggleComplete}/>
            )
        });

        // const filtered = this.state.todos.filter((item) => {

        // })

        return (
            <div>
                <h1>To-Do List</h1>
                <ToDoForm createToDo={this.createToDo} genKey={this.generateKey}/>
                <ul>{newToDo}</ul>
            </div>
        )
    }
}

export default ToDoList