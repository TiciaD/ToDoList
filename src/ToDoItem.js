import React from "react";

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
        this.handleRemove = this.handleRemove.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleRemove() {
        console.log(this.props)
        this.props.remove(this.props.id);
    };

    handleToggle(id) {
        this.props.toggleComplete(this.props.id);
    }
    
    render() {
        console.log(this.props)
        return(
            <>
                <li style={{
                    textDecoration: this.props.completed 
                    ? "line-through" 
                    : ""
                }} onClick={this.handleToggle}>
                    {this.props.value}
                </li>
                <button type="button" className="btn btn-primary btn-sm">Edit</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={this.handleRemove}>Delete</button>
            </>
        )
    }
}

export default ToDoItem;