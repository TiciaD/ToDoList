import React from "react";

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
    this.setState({value: event.target.value});
  };

  handleSubmit(event) {
    alert('submitted: ' + this.state.value);
    this.props.createToDo({
        ...this.state, 
        id: this.props.genKey(), 
        isCompleted: false, 
        isDeleted: false
    });
    event.preventDefault();
    this.setState({value: ''});
  };

  render() {
    // View
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
        class="form-control" 
        type="text" 
        value={this.state.value} 
        onChange={this.handleChange} 
        placeholder="Add Your New To-Do" 
        aria-label="default input example"
        />
        <button type="submit">+</button>
      </form>
    );
  }
}

export default ToDoForm;