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
        this.updateTodo = this.updateTodo.bind(this);
    };


    // Controller
    createToDo(item) {
        this.setState({
            // destructure array add new item pass in to end of array
            // add new array to state
            todos: [...this.state.todos, item]
        });
    };

    generateKey() {
        return Date.now();
    };

    removeToDo(id) {
        const deletedToDos = this.state.todos.map((todo) => {
            // find todo with matching id
            if (todo.id === id) {
                // change value of deleted to true
                todo.isDeleted = true
            }
        return todo;
        });
        // add new array to state
        this.setState({todos: deletedToDos})
    };

    toggleComplete(id) {
        const completedToDos = this.state.todos.map((todo) => {
            // find todo with matching id
            if (todo.id === id) {
                // destructure array and change completed value to its opposite
                return {...todo, isCompleted: !todo.isCompleted}
            } else {
                return todo;
            }
        });
        // add new array to state
        this.setState({todos: completedToDos});
    };

    filterToDo(string) {
        // set value of filter to string value
        this.setState({filter: string});
    };

    removeAllCompleted() {
        const allDeleted = this.state.todos.filter((todo) => {
            // find all todos with completed value of true
            if(todo.isCompleted === true) {
                // change their deleted value to true
                todo.isDeleted = true;
            }
            return todo
        });
        // add new array to state
        this.setState({todos: allDeleted});
    };

    completeAll() {
        const allCompleted = this.state.todos.map((todo) => {
            // for all todos, destructure array and change complete value to allComplete value
            return {...todo, isCompleted: this.state.allComplete}
        });
        // add new array to state
        // change allComplete value to its opposite so it toggles
        this.setState({todos: allCompleted, allComplete: !this.state.allComplete});
    };

    updateTodo(id, update) {
        const updatedTodos = this.state.todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, value: update };
        }
        return todo;
        });
        this.setState({todos: updatedTodos});
    };



    render() {
        // View

        // set array for filtered todos
        let filteredTodos = [];
        // filter todos based on state
        if(this.state.filter === 'all') {
            // only filter out deleted todos
            filteredTodos = this.state.todos.filter((todo) => todo.isDeleted === false);
        } else if (this.state.filter === 'active') {
            // filter out incomplete and deleted todos
            filteredTodos = this.state.todos.filter((todo) => todo.isCompleted === false && todo.isDeleted === false)
        } else if (this.state.filter === 'complete') {
            // filter out completed and deleted todos
            filteredTodos = this.state.todos.filter((todo) => todo.isCompleted === true && todo.isDeleted === false)
        } else if (this.state.filter === 'deleted') {
            // filter out everything but deleted todos
            filteredTodos = this.state.todos.filter((todo) => todo.isDeleted === true);
        };


        return (
            <div>
                <h1 className="fs-1 mb-3">To-Do List</h1>
                <ToDoForm createToDo={this.createToDo} genKey={this.generateKey}/>
                <ul>
                    {filteredTodos.map((item) => (
                        <ToDoItem 
                        key={item.id}
                        id={item.id}
                        value={item.value}
                        completed={item.isCompleted}
                        remove={this.removeToDo}
                        toggleComplete={this.toggleComplete}
                        update={this.updateTodo}/>
                        ))
                    }
                </ul>
                <div className="container">
                    <div>To-Dos Left: {this.state.todos.filter((todo) => todo.isCompleted === false && todo.isDeleted === false).length}</div>
                    <div className="row d-flex align-items-center mt-2">
                        <div className="col-12 col-md-6 btn-group h-25" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" className="btn-check" onClick={() => this.filterToDo('all')} name="btnradio" id="btnradio1" autoComplete="off" defaultChecked/>
                            <label className="btn btn-outline-primary" htmlFor="btnradio1">All</label>

                            <input type="radio" className="btn-check" onClick={() => this.filterToDo('active')} name="btnradio" id="btnradio2" autoComplete="off"/>
                            <label className="btn btn-outline-primary" htmlFor="btnradio2">Active</label>

                            <input type="radio" className="btn-check" onClick={() => this.filterToDo('complete')} name="btnradio" id="btnradio3" autoComplete="off"/>
                            <label className="btn btn-outline-primary" htmlFor="btnradio3">Completed</label>
                        </div>
                        <div className="col-md-6 gy-1">
                            <div className="row gy-1">
                                <div className="col-12">
                                    <button type="button" className="btn btn-danger" onClick={() => this.removeAllCompleted()}>Clear Completed</button>
                                </div>
                                <div className="col-12">
                                    <input type="checkbox" className="btn-check" onClick={() => this.completeAll()} id="btn-check-outlined" autoComplete="off"/>
                                    <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">Complete All</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoList