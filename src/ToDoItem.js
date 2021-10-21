import React from "react";
import './ToDoItem.css';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: '', isEditing: false, isHovering: false};
        this.handleRemove = this.handleRemove.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleRemove() {
        console.log(this.props)
        this.props.remove(this.props.id);
    };

    handleToggle() {
        this.props.toggleComplete(this.props.id);
    };

    handleMouseOver() {
    this.setState({isHovering: true})
    };

    handleMouseOut() {
    this.setState({isHovering: false})
    };

    
    render() {
        return(
            <>
                <li style={{
                    textDecoration: this.props.completed 
                    ? "line-through" 
                    : ""
                }} onClick={this.handleToggle} onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
                    {this.props.value}
                </li>
                <button type="button" className="btn btn-primary btn-sm"
                    style={{
                        display: this.state.isHovering 
                        ? "block" 
                        : "none"
                    }}>Edit</button>
                <button type="button" className="btn btn-danger btn-sm" 
                    onClick={this.handleRemove}
                    style={{
                        display: this.state.isHovering 
                        ? "block" 
                        : "none"
                    }}>Delete</button>
            </>
        )
    }
}

export default ToDoItem;