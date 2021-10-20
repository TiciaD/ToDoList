# To-Do List Pseudocode
## Functionality
**Main Goal**: Create a To-Do list app that manages state and utilizes local storage to keep track of each to-do item.

### Things to Keep in Mind
- 

## MoSCoW
Must Have
- Must use local storage to store to-do list data
- Must display all to-do list items
- Must have three views for the user (All, Completed and Not Completed)
- Must have a prompt to add item displayed
- Must check off/cross-out item as it's completed
- Must display remaining items
- Must be able to remove an item
- Must have a 'Complete All' button to check off all items
- Must be able to remove all completed items
- Must have a 'Uncheck All' button to make items active again

Should Have
- Should soft-delete items rather than permanent remove
- Should utilize state to send and display data

Could Have
- Could have an edit button to edit added items
- Could include Sass styling
- Could include an archive of deleted to-dos

Won't Have
- Won't use MySQL
- Won't use additional NPM packages

## Model View Controller (MVC)
1. **Model** (stores data)
    - store form input value by user as a to-do item
    - store whether todo has been completed or not
    - store amount of todo items added

2. **View** (renders display)
    - show tasks filtered by completed or not
    - show task crossed out checked off when completed
    - show count of number of todo items left
    - OPTIONAL show new form submission if edit button selected

3. **Controller** (handles input)
    - handle click events for adding, deleting and completing a todo item
    - handle click event for filtering the displayed todo items
    - OPTIONAL handle click event for editing a todo item

## Break Down Wireframe
Embed Image


## Classes
### Class Responsibility Collaborator (CRC)
```
ToDoList                                                    |
                                                            |   ToDoForm
renders list of todo items                                  |   (Needs to know method for creating todos)
manages state of added and deleted todos                    |   
contains methods for manipulating state,                    |   ToDoItem
i.e. creating and deleting new todos                        |   (Needs to know key, id, value and isCompleted assigned to it)
contains method for changing completion state               |   (Needs to know method for completing a todo item)
Has method for filtering which todo items are displayed     |   OPTIONAL: (Needs to know methods for editing todo items)
                                                            |
```
```
ToDoForm                                                    |                   
                                                            |   ToDoList
manages state of form input                                 |   (Passes method for creating todos down as prop)
handles submission of form                                  |   (Needs to know value of form input after it's been submitted)
uses method for creating new todo from ToDoList parent      |   
                                                            |   
```
```
ToDoItem                                                |                   
                                                        |   ToDoList
handles render of todo item                             |   (Passes key, id, todo value and isCompleted as props)
handles click event for remove button                   |   (Passes method for removing todo item)
OPTIONAL: handles form submission for editing todo      |   OPTIONAL: (Passes method for editing todo item)
                                                        |
```

## Define Objects and Functions
- ToDoList
    - `ToDoList.state` ---> holds todo array to be filled with added todo items
    - createToDo(item) ---> function that sets state to add new todo item to state
    - removeToDo(id) ---> function that loops through state and removes the todo with matching id
    - completeToDo(id) ---> function that loops through state and toggles isCompleted === true/false
    - generateKey() ---> function that returns a unique key based on Date and Time
    - ToDoList.render() ---> maps through ToDo components and sends props including:
    todo value, todo key/ids using generateKey(), and removeToDo()/completeToDo() methods

- ToDoForm
    - `ToDoForm.state` ---> holds currentTodo to be filled with value of input form
    - handleInput() ---> update state each time something is added to input form
    - handleSubmit() ---> call createToDo() from props and adds form values to todo state

- ToDoItem
    - `ToDoItem.state` ---> holds currentTodo to be filled with value of input form prop
    - handleRemove() ---> call RemoveToDo() from props and set it to delete button
    - OPTIONAL: editForm() ---> toggle a new form to pop up when edit mode clicked

## Pseudocode
