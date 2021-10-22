import React from "react";
import './ToDoForm.css';

class ToDoForm extends React.Component {
  constructor(props) {
    // Model
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // Controller
  handleChange(event) {
      // change state value every time value of form is changed
    this.setState({value: event.target.value});
  };

  handleSubmit(event) {
      // call createToDo function from props
    this.props.createToDo({
        // destructure state to add other objects
        ...this.state, 
        // set id to result of genKey prop
        id: this.props.genKey(), 
        // set completed value to false
        isCompleted: false, 
        // set deleted value to false
        isDeleted: false
    });
    // prevent default action of submit event
    event.preventDefault();
    // reset state back to empty string
    // remove value from form after submitted
    this.setState({value: ''});
  };

  render() {
    // View
    return (
        <div>
            <form className="row g-1 mb-4" onSubmit={this.handleSubmit}>
                <div className="col-10 padding-0">
                    <input 
                    className="form-control" 
                    type="text" 
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    placeholder="Add  Your  New  To-Do" 
                    aria-label="default input example"
                    />
                </div>
                <div className="col-2 padding-0">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
  }
}

export default ToDoForm;