import React from "react";

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        console.log(this.props)
        this.props.remove(this.props.id);
    }
    
    render() {
        console.log(this.props)
        return(
            <>
                <li>{this.props.value}</li>
                <button type="button" class="btn btn-primary btn-sm">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onClick={this.handleRemove}>Delete</button>
            </>
        )
    }
}

export default ToDoItem;