import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  taskInput = React.createRef();
  constructor() {
    super();
    this.state = {
      taskList: [],
      taskskListMirror: [],
      completed: [],
      errorInput: false,
      dataTaks: false,
      showInput: false,
      filter: 'showAll',
    };

  }

  showInput = () => {
    this.setState({
      showInput: true
    })
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
        taskskListMirror: [...this.state.taskskListMirror, task],
        dataTaks: true,
        showInput: false,
        checked: false
      });
      this.taskInput.current.value = "";
    }
  }



  handleInputChange = (e, id) => {
    e.target.checked = true
    if (e.target.checked === true) {
      var coincidencesTask = this.state.taskList.map((task) => {
        if (task.id === id) {
          task.checked = true
          task.completed = true
          console.log(task)
        }
        return task
      })
      console.log(coincidencesTask)
      this.setState({
        taskList: coincidencesTask
      })

    }
  }


  handleClickAll = () => {
    this.setState({
      filter: 'showAll'
    })
    console.log(this.state.filter)
  }

  handleClickCompleted = () => {
    this.setState({
      filter: 'showCompleted'
    })
    console.log(this.state.filter)
  }

  handleClickIncompleted = () => {
    this.setState({
      filter: 'showIncompleted'
    })
    console.log(this.state.filter)
  }

  renderTaks = (tasks, e) => {
    const tasksList = tasks.filter(task => {


      if (this.state.filter === "showAll") {
        console.log("entra");
        return task;
      } else if (this.state.filter === "showCompleted") {
        if (task.completed === true) {
          return task;
        }
      } else {
        if (task.completed === false) {
          return tasks
        }
      }
    });

    const list = tasksList.map(task => {
      return (
        <li>
          <label className="taskText">
            <input className="Checkbox" checked={task.checked} type="checkbox" onChange={(e) => this.handleInputChange(e, task.id)} />
            <span>{task.name}</span>
          </label>
        </li>
      )
    });
    return list;
  }


  searchByName = (e) => {
    let taskList = [...this.state.taskList];
    var query = e.target.value;
    if (query !== '') {
      var coincidences = taskList.filter(task => (
        task.name.toLowerCase().indexOf(query.toLowerCase()) !== -1

      ))
      this.setState({
        taskList: coincidences
      });
    } else {
      this.setState({
        taskList: this.state.taskskListMirror
      })
    }


  }

  render() {
    let today = new Date().toLocaleDateString()
    console.log(this.state.taskList)


    return (
      <React.Fragment >
        <div className="container">

          <div className="containerLeft">
            <input onChange={this.searchByName} className="inputSearch" type="text" placeholder="Search" />
            <div className="grid-container">
              <div className="selected" onClick={this.handleClickAll}>
                <span>ALL TASKS</span>
              </div>
              <div className="compInc" onClick={this.handleClickCompleted} >
                <span>Complete</span>
              </div>
              <div className="compInc" onClick={this.handleClickIncompleted}>
                <span>Incomplete</span>
              </div>
              <button className="newTaks" onClick={this.showInput}>+ New Task</button>
            </div>
          </div>
          <div className="containerRight">
            <form id="inputSubmit" onSubmit={this.addTask}>
              <input className={(this.state.showInput) ? "description is-visible1" : "description"} id="inputTask" ref={this.taskInput} type="text" placeholder="Task" />
              <button className={(this.state.showInput) ? "description is-visible1" : "description"} id="btnTask">Save</button>
            </form>
            <div className={(this.state.errorInput) ? "description is-visible" : "description"} >INPUT SHOULD NOT BE EMPTY</div>
            <div className="nameToday">
              <h>TODAY</h>
              <br />
              <time>{moment({ today }).format('ddd MMM Do YYYY')}</time>
            </div>
            <ul className="taskLine">
              {this.state.dataTaks && this.state.taskList && (this.renderTaks(this.state.taskList))}

            </ul>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default App;



// || this.state

// searchByName = (e) => {
//   var query = e.target.value.toLowerCase();
//   var coincidences = this.state.taskList.filter(function (task) {
//     var taksInLowerCase = task.name.toLowerCase();
//     return taksInLowerCase.includes(query);
//   });

//   this.setState({
//     taskList: coincidences
//   });
// }
