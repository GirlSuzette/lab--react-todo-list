import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  taskInput = React.createRef();
  constructor() {
    super();
    this.state = {
      taskList: [],
      errorInput: false,
      dataTaks: false

    };

  }

  validInput = (e) => {
    if (e === '') {
      this.setState({
        errorInput: true
      });
      return false
    } else {
      this.setState({
        errorInput: false
      })
      return true
    }
  }

  addTask = (e) => {
    e.preventDefault();
    var now = new Date();
    let error = this.validInput(this.taskInput.current.value)
    // console.log(this.taskInput.current.value)
    if (error !== false) {
      let task = {
        id: now.getTime(),
        name: this.taskInput.current.value,
        completed: false
      }
      console.log(task)
      this.setState({
        taskList: [...this.state.taskList, task],
        dataTaks: true
      });
    }
  }

  searchByName = (e) => {
    var query = e.target.value.toLowerCase();

    var coincidences = this.state.taskList.filter(function (task) {
      var taksInLowerCase = task.name.toLowerCase();

      return taksInLowerCase.includes(query);
    });

    this.setState({
      taskList: coincidences
    });
  }

  render() {
    let today = new Date().toLocaleDateString()
    console.log(this.state.taskList)

    return (
      <React.Fragment>
        <div className="container">

          <div className="containerLeft">
            <input onChange={this.searchByName} className="inputSearch" type="text" placeholder="Search" />
            <div className="grid-container">
              <button className="selected" data-view="all" onClick={this.state.taskList}>
                <span>ALL TASKS</span>
              </button>
              <button className="compInc" data-view="complete">
                <span>Complete</span>
              </button>
              <button className="compInc" data-view="incomplete">
                <span>Incomplete</span>
              </button>
              <button className="newTaks">+ New Task</button>
            </div>
          </div>
          <div className="containerRight">
            <form id="inputSubmit" onSubmit={this.addTask}>
              <input className="inputTask" id="inputTask" ref={this.taskInput} type="text" placeholder="Task" />
              <button className="btnTask" id="btnTask">Save</button>
            </form>
            <div className={(this.state.errorInput) ? "description is-visible" : "description"} >INPUT SHOULD NOT BE EMPTY</div>
            <div className="nameToday">
              <h>TODAY</h>
              <br />
              <time>{moment({ today }).format('ddd MMM Do YYYY')}</time>
            </div>
            <ul className="taskLine">
              {this.state.dataTaks && this.state.taskList && this.state.taskList.map(function (task) {
                return (
                  <li>
                    <label className="taskText">
                      <input className="Checkbox" type="checkbox" />
                      <span>{task.name}</span>

                    </label>
                  </li>

                )
              })}

            </ul>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default App;
