/**
 *  Todo list written in react js
 */
"use strict";

var REQUEST_URL = "http://todo.localhost/";
var GET_ALL = "?type=getAll&user=";
var CREATE = "?type=create&user=";
var ENTER_KEY = 13;
var LOCAL_KEY = "lookup-user";

var TodoItem = React.createClass({
  componentDidMount: function(){

    //var router = Router({
    //    '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
    //      '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
    //      '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
    //  });
    //router.init('/');
  },
  render: function() {
      var trType = this.props.isDone ? "complete" : "incomplete";
      return (
        <tr>
          <td className={trType}>
            {this.props.info.description}
          </td>
          <td className={trType}>
            {this.props.info.due_date}
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
      console.log("Testing the enter");
      this.handleButton(event);

    },
    handleButton: function(event) {
      console.log("Testing button press: " + event);
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
        results: ""
      });
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
              <TodoItem key={todo.id} info={todo} isDone={false} />
            );
          }, this);
          var completeItems = complete.map(function (todo) {
            return (
              <TodoItem key={todo.id} info={todo} isDone={true} />
            );
          }, this);
          $("#createDate").datepicker('setDate',  new Date());
          body =
            <div id="content">
              <button id="backButton" type="button" onClick={this.goBack}>Go Back</button>
              <div id="createBar">
                <input ref="createDecription" className="inputBox" id="createDecription" placeholder="Description" autoFocus={true} onKeyDown={this.handleNewTodoKeyDown} />
                <input ref="createDate" className="inputBox" id="createDate" placeholder="Due Date" onKeyDown={this.handleNewTodoKeyDown} onFocus={this.openPicker} />
                <button id="addButton" type="button" onClick={this.handleAdd}>Add Item</button>
              </div>
              <div id="TODO-Item">
                <table className="view">
                  <thead>
                    <tr>
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
    getAll: function(username){
      $.get(REQUEST_URL + GET_ALL + username, function(result) {
        console.log("here is the result: " + result);
        console.log("here is the result: " + JSON.stringify(result));
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
      console.log("trying to add......");
      var description = this.refs.createDecription.getDOMNode().value.trim();
      var date = this.refs.createDate.getDOMNode().value.trim();
      //var data = JSON.stringify({
      //  description: description,
      //  date: date
      //});
      var data = {description: description, date: date};
      $.post(REQUEST_URL + CREATE + this.state.username, data, function(result) {
        console.log("here is the result: " + result);
        console.log("here is the result: " + JSON.stringify(result));
      }.bind(this));
        //this.setState({
        //  isLoaded: true,
        //  results: result
        //});
    }
});

React.render(<TodoApp />, document.body);

