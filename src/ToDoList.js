import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoItem from './ToDoItem';
import './ToDoList.css';

class ToDoList extends React.Component {
    constructor(props) {
        // Model
        super(props);
        this.state = {todos: [], filter: 'all', allComplete: true};
        this.createToDo = this.createToDo.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.removeToDo = this.removeToDo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.removeAllCompleted = this.removeAllCompleted.bind(this);
        this.completeAll = this.completeAll.bind(this);
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
                return {...todo, isCompleted: !todo.isCompleted}
            } else {
                return todo;
            }
        });
        this.setState({todos: completedToDos});
    };

    filterToDo(string) {
        this.setState({filter: string});
    };

    removeAllCompleted() {
        const allDeleted = this.state.todos.filter((todo) => {
            if(todo.isCompleted === true) {
                todo.isDeleted = true;
            }
            return todo
        });
        this.setState({todos: allDeleted});
    };

    completeAll() {
        const allCompleted = this.state.todos.map((todo) => {
            return {...todo, isCompleted: this.state.allComplete}
        });
        this.setState({todos: allCompleted, allComplete: !this.state.allComplete});
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
                <div>To-Dos Left: {this.state.todos.filter((todo) => todo.isCompleted === false && todo.isDeleted === false).length}</div>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" onClick={() => this.filterToDo('all')} name="btnradio" id="btnradio1" autoComplete="off" defaultChecked/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">All</label>

                    <input type="radio" className="btn-check" onClick={() => this.filterToDo('active')} name="btnradio" id="btnradio2" autoComplete="off"/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Active</label>

                    <input type="radio" className="btn-check" onClick={() => this.filterToDo('complete')} name="btnradio" id="btnradio3" autoComplete="off"/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Completed</label>
                </div>
                <button type="button" className="btn btn-danger" onClick={() => this.removeAllCompleted()}>Clear Completed</button>
                <input type="checkbox" className="btn-check" onClick={() => this.completeAll()} id="btn-check-outlined" autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">Complete All</label>
            </div>
        )
    }
}

export default ToDoList