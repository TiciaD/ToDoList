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
        <div className="row">
                <form onSubmit={this.handleSubmit}>
                    <div className="col-6">
                        <input 
                        className="form-control" 
                        type="text" 
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        placeholder="Add Your New To-Do" 
                        aria-label="default input example"
                        />
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary"><i className="bi bi-plus"></i></button>
                    </div>
                </form>
        </div>
    );
  }
}

export default ToDoForm;