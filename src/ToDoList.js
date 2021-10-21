import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoItem from './ToDoItem';

class ToDoList extends React.Component {
    constructor(props) {
        // Model
        super(props);
        this.state = {todos: [], filter: 'all'};
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
            console.log(todo)
        return todo;
        });
        this.setState({todos: deletedToDos})
    };

    toggleComplete(id) {
        const completedToDos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                console.log(todo);
                return {...todo, isCompleted: !todo.isCompleted}
            } else {
                return todo;
            }
        });
        this.setState({todos: completedToDos})
    }

    filterToDo(string) {
        this.setState({
            filter: string
        })
    }

    render() {
        // View
        let filteredTodos = [];
        if(this.state.filter === 'all') {
            filteredTodos = this.state.todos.filter((todo) => todo.isDeleted === false);
        } else if (this.state.filter === 'active') {
            filteredTodos = this.state.todos.filter((todo) => todo.isCompleted === false && todo.isDeleted === false)
        } else if (this.state.filter === 'complete') {
            filteredTodos = this.state.todos.filter((todo) => todo.isCompleted === true && todo.isDeleted === false)
        }


        return (
            <div>
                <h1>To-Do List</h1>
                <ToDoForm createToDo={this.createToDo} genKey={this.generateKey}/>
                <ul>
                    {filteredTodos.map((item) => (
                        <ToDoItem 
                        key={item.id}
                        id={item.id}
                        value={item.value}
                        completed={item.isCompleted}
                        remove={this.removeToDo}
                        toggleComplete={this.toggleComplete}/>
                        ))
                    }
                </ul>
                <div>To-Dos Left: {this.state.todos.filter((todo) => todo.isCompleted === false).length}</div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => this.filterToDo('all')} className="btn btn-primary">All</button>
                    <button type="button" onClick={() => this.filterToDo('active')} className="btn btn-primary">Active</button>
                    <button type="button" onClick={() => this.filterToDo('complete')} className="btn btn-primary">Completed</button>
                </div>
            </div>
        )
    }
}

export default ToDoList