import React from "react";
import './ToDoItem.css';

class ToDoItem extends React.Component {
    constructor(props) {
        // Model
        super(props);
        this.state = {inputValue: '', isEditing: false, isHovering: false};
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCheckToggle = this.handleCheckToggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    };


    // Controller
    handleRemove() {
        console.log(this.props)
        // call remove function from props and pass in id
        this.props.remove(this.props.id);
    };

    handleCheckToggle() {
        // call toggleComplete function from props and pass in id
        this.props.toggleComplete(this.props.id);
    };

    toggleEdit() {
        // set state of isEditing to opposite of current value
        this.setState({isEditing: !this.state.isEditing});
    };

    handleSave(event) {
        // prevent default behavior of onSubmit
        event.preventDefault();
        // call updateTodo function from props
        // pass in id from props and inputValue from form
        this.props.update(this.props.id, this.state.inputValue);
        // set state of isEditing back to false
        this.setState({isEditing:false});
    };

    handleChange(event) {
        // change state value every time value of form is changed
        this.setState({inputValue: event.target.value});
    };

    handleMouseOver() {
        // set state of hovering to true
        this.setState({isHovering: true});
    };

    handleMouseOut() {
        // set state of hovering to false
        this.setState({isHovering: false});
    };

    
    render() {
        // View
        let task = '';
        if(this.state.isEditing) {
            task = (
                <div className="item row w-75">
                    <div className="col-12">
                        <form className="input-group" onSubmit={this.handleSave}>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={this.handleChange}
                                placeholder={this.props.value} 
                                aria-label="Recipient's username" 
                                aria-describedby="button-addon2"/>
                            <button className="btn btn-primary" type="submit" id="button-addon2"><i className="bi bi-save"></i></button>
                            <button className="btn btn-primary" onClick={this.toggleEdit} type="button"><i className="bi bi-pencil-square"></i></button>
                        </form>
                    </div>
                </div>
            )
        } else {
            task = (<div className="item row w-75" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
                <div className="col-2">
                    <input className="form-check-input" type="checkbox" id="checkboxNoLabel" onClick={this.handleCheckToggle} checked={this.props.completed} value="" aria-label="..."/>
                </div>
                <div className="col-6" style={{
                    textDecoration: this.props.completed 
                    ? "line-through" 
                    : ""
                }} 
                onClick={this.handleCheckToggle} 
                >
                    {this.props.value}
                </div>
                <button type="button" 
                    className="col-2 btn btn-primary btn-sm"
                    onClick={this.toggleEdit}
                    style={{
                        display: this.state.isHovering 
                        ? "block" 
                        : "none"
                    }}><i className="bi bi-pencil-square"></i></button>
                <button type="button" 
                    className="col-2 btn btn-danger btn-sm" 
                    onClick={this.handleRemove}
                    style={{
                        display: this.state.isHovering 
                        ? "block" 
                        : "none"
                    }}><i className="bi bi-trash"></i></button>
            </div>
            )
        };

        return(
            <>{task}</>
        )
    };
};

export default ToDoItem;