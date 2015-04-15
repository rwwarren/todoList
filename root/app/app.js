/**
 *  Todo list written in react js
 */
"use strict";

var REQUEST_URL = "http://todo.localhost/";
var GET_ALL = "?type=getAll&user=";
var CREATE = "?type=create&user=";
var EDIT = "?type=edit&user=";
var ENTER_KEY = 13;
var LOCAL_KEY = "lookup-user";

var TodoItem = React.createClass({
  getInitialState: function() {
    return {
      isDone: this.props.isDone,
      desc: this.props.info.description,
      due: this.props.info.due_date
    };
  },
  cancelChanges: function(){
    this.setState({
      isDone: this.props.isDone,
      desc: this.props.info.description,
      due: this.props.info.due_date
    });
  },
  submitChanges: function(){
      var statusString = this.state.isDone ? "Complete" : "Incomplete";
      var data = {id: this.props.info.id, status: statusString, description: this.state.desc, due_date: this.state.due};
      var posting = $.post(REQUEST_URL + EDIT + this.props.info.user, data, function(result) {
        this.props.isUpdated();
      }.bind(this));

  },
  handleDesc: function(){
    var currentText = $('#' + this.props.info.id + "-desc").text();
    this.setState({desc: currentText});
  },
  handleDate: function(){
    var currentText = $('#' + this.props.info.id + "-date").text();
    this.setState({due: currentText});
  },
  handleMark: function(){
    this.setState({isDone: !this.state.isDone});
  },
  isChanged: function() {
    if(this.props.isDone !== this.state.isDone || this.props.info.description !== this.state.desc || this.props.info.due_date !== this.state.due){
      return (
          <div className="changeButtons">
            <button className="changes" type="button" onClick={this.submitChanges}>Submit Changes</button>
            <button className="changes" type="button" onClick={this.cancelChanges}>Cancel Changes</button>
          </div>
      );
    }
    return null;
  },
  render: function() {
      var trType = this.props.isDone ? "complete" : "incomplete";
      return (
        <tr>
          <td className={trType}>
            {this.isChanged()}
            <input className="changeBox" type="checkbox" checked={this.state.isDone} onChange={this.handleMark}/>
          </td>
          <td className={trType}>
            <label id={this.props.info.id + "-desc"} contentEditable={true} onInput={this.handleDesc}>
                {this.state.desc} 
            </label>
          </td>
          <td className={trType}>
            <label id={this.props.info.id + "-date"} className="due" contentEditable={true} onInput={this.handleDate}>
              {this.state.due}
            </label>
          </td>
        </tr>
      );
  }
});

var TodoApp = React.createClass({
    getInitialState: function(){
      return {
        toShow: "all",
        results: "",
        username: "",
        isLoaded: false
      };
    },
    componentDidMount: function(){
        var storedName = localStorage.getItem(LOCAL_KEY);
        if(storedName !== null && storedName.length > 0){
          this.getAll(storedName);
        }
    },
    handleNewTodoKeyDown: function(event) {
      if (event.which !== ENTER_KEY) {
        return;
      }
      this.handleButton(event);
    },
    handleButton: function(event) {
      var username = this.refs.searchUser.getDOMNode().value.trim();
      if(!username.length > 0){
        return;
      }
      event.preventDefault();
      localStorage.setItem(LOCAL_KEY, username);
      console.log("the value: " + username);
      this.getAll(username);
    },
    goBack: function(){
      localStorage.removeItem(LOCAL_KEY);
      this.setState({
        isLoaded: false,
        username: "",
        results: ""
      });
    },
    handleUpdate: function() {
      this.getAll(this.state.username);
    },
    render: function() {
        var body = '';
        if(!this.state.isLoaded){
          body = 
            <div id="content">
              <div id="search">
                <input ref="searchUser" id="user" className="inputBox" type="text" placeholder="Enter username to search" autoFocus={true} onKeyDown={this.handleNewTodoKeyDown} />
                <button type="button" id="submitButton" onClick={this.handleButton}>Search</button>
              </div>
            </div>;
        } else {
          var toShow = this.state.toShow;
          var incomplete = this.state.results.filter(function (todo) {
            return (todo.status === "Incomplete");
          });
          var complete = this.state.results.filter(function (todo) {
            return (todo.status === "Complete");
          });
          var incompleteItems = incomplete.map(function (todo) {
            return (
              <TodoItem key={todo.id} info={todo} isDone={false} isUpdated={this.handleUpdate} />
            );
          }, this);
          var completeItems = complete.map(function (todo) {
            return (
              <TodoItem key={todo.id} info={todo} isDone={true} isUpdated={this.handleUpdate} />
            );
          }, this);
          $("#createDate").datepicker('setDate',  new Date());
          body =
            <div id="content">
              <button id="backButton" type="button" onClick={this.goBack}>Go Back</button>
              <div id="username">
                Todo List for: {this.state.username}
              </div>
              <div id="createBar">
                Create Task: 
                <input ref="createDescription" className="inputBox" id="createDescription" placeholder="Description" autoFocus={true} onKeyDown={this.handleNewTodoKeyDown} />
                <input ref="createDate" className="inputDate" id="createDate" placeholder="Due Date" onKeyDown={this.handleNewTodoKeyDown} onFocus={this.openPicker} />
                <button id="addButton" type="button" onClick={this.handleAdd}>Add Item</button>
              </div>
              <div id="TODO-Item">
                <table className="view">
                  <thead>
                    <tr>
                      <th>
                        Change Status
                      </th>
                      <th>
                        Description
                      </th>
                      <th>
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {toShow === "all" || toShow === "incomplete"  ? incompleteItems : null}
                    {toShow === "all" || toShow === "complete"  ? completeItems : null}
                  </tbody>
                </table>
              </div>
              <div id="information">
                {incompleteItems.length} {incompleteItems.length > 1 ? "items" : "item"} left to do 
                <div id="view-links">
                  <div onClick={this.handleViewAmount.bind(this, "view-all")} className="active" id="view-all">
                    View All
                  </div>
                  <div onClick={this.handleViewAmount.bind(this, "view-incomplete")} className="filtering" id="view-incomplete">
                    View Incomplete 
                  </div>
                  <div onClick={this.handleViewAmount.bind(this, "view-complete")} className="filtering" id="view-complete">
                    View Complete
                  </div>
                </div>
              </div>
            </div>;
        }
        return (
          <section id="todoapp">
            <div id="header">
              <h1>
                TODO List Application
              </h1>
            </div>
            {body}
          <footer>
            <span id="footerText">
              TODO List Application
            </span>
            |
            <span id="footerText">
              By Ryan Warren
            </span>
          </footer>
          </section>
        );
    },
    openPicker: function(){
      console.log("focused");
      $( "#createDate" ).datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true 
      });
    },
    getAll: function(username) {
      if(username.length < 1) {
        username = this.state.username;
      }
      if(username.length < 1) {
        return;
      }
      $.get(REQUEST_URL + GET_ALL + username, function(result) {
        this.setState({
          isLoaded: true,
          username: username,
          results: result
        });
      }.bind(this));
    },
    handleViewAmount: function(divId){
      var oldId = $('.active').attr('id');
      if(oldId === divId) {
        return;
      }
      $('#' + oldId).removeClass('active');
      $('#' + oldId).addClass('filtering');
      $('#' + divId).addClass('active');
      $('#' + divId).removeClass('filtering');
      var showArr = divId.split("-");
      var whatToShow = showArr[1];
      this.setState({
        toShow: whatToShow
      });
    },
    handleAdd: function(){
      var description = this.refs.createDescription.getDOMNode().value.trim();
      var date = this.refs.createDate.getDOMNode().value.trim();
      var data = {description: description, date: date};
      var posting = $.post(REQUEST_URL + CREATE + this.state.username, data, function(result) {
        this.getAll(this.state.username);
      }.bind(this));
    }
});

React.render(<TodoApp />, document.body);

