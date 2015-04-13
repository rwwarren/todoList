/**
 *  Todo list written in react js
 */
"use strict";

var REQUEST_URL = "http://todo.localhost/";
var GET_ALL = "?type=getAll&user=";
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
  getInitialState: function(){
    return {
      name: "Ryan"
    };
  },
  render: function() {
      return (
        <div>
          <p>
            {this.props.info.id}
          </p>
          <p>
            {this.props.info.user}
          </p>
          <p>
            {this.props.info.status}
          </p>
          <p>
            {this.props.info.description}
          </p>
          <p>
            {this.props.info.due_date}
          </p>
        </div>
      );
  }
});

var TodoApp = React.createClass({
    getInitialState: function(){
      return {
        results: "",
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
              <input ref="searchUser" id="user" placeholder="Testing" autoFocus={true} onKeyDown={this.handleNewTodoKeyDown} />
              <button type="button" onClick={this.handleButton}>Search</button>
            </div>;
        } else {
          var incomplete = this.state.results.filter(function (todo) {
            return (todo.status === "Incomplete");
          });
          var complete = this.state.results.filter(function (todo) {
            return (todo.status === "Complete");
          });
          var incompleteItems = incomplete.map(function (todo) {
            return (
              <TodoItem key={todo.id} info={todo} />
            );
          }, this);
          var completeItems = complete.map(function (todo) {
            return (
              <TodoItem key={todo.id} info={todo} />
            );
          }, this);
          body =
            <div id="content">
              <button type="button" onClick={this.goBack}>Go Back</button>
              <div id="TODO-Item">
                {incompleteItems}
                {completeItems}
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
          test
          </footer>
          </section>
        );
    },
    getAll: function(username){
      $.get(REQUEST_URL + GET_ALL + username, function(result) {
        console.log("here is the result: " + result);
        console.log("here is the result: " + JSON.stringify(result));
        this.setState({
          isLoaded: true,
          results: result
        });
      }.bind(this));
    },
    //renderList: function(){
    //  return "<div>laoded</div>";
    //}
});

React.render(<TodoApp />, document.body);

