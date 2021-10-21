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
            <div className="item row w-75" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
                <div className="col-2">
                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" onClick={this.handleToggle} value="" aria-label="..."/>
                </div>
                <div className="col-6" style={{
                    textDecoration: this.props.completed 
                    ? "line-through" 
                    : ""
                }} 
                onClick={this.handleToggle} 
                >
                    {this.props.value}
                </div>
                <button type="button" className="col-2 btn btn-primary btn-sm"
                    style={{
                        display: this.state.isHovering 
                        ? "block" 
                        : "none"
                    }}><i class="bi bi-pencil-square"></i></button>
                <button type="button" className="col-2 btn btn-danger btn-sm" 
                    onClick={this.handleRemove}
                    style={{
                        display: this.state.isHovering 
                        ? "block" 
                        : "none"
                    }}><i class="bi bi-trash-fill"></i></button>
            </div>
        )
    }
}

export default ToDoItem;