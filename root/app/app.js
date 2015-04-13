/**
 *  Todo list written in react js
 */
"use strict";

var REQUEST_URL = "http://todo.localhost/";
var GET_ALL = "?type=getAll&user=";
var ENTER_KEY = 13;

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
          //<p>
          //  Hello, world! {this.state.name}
          //</p>
            //Hello, world! {this.props.info}
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
        name: "Ryan",
        results: "",
        isLoaded: false
      };
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
      event.preventDefault();
      var val = this.refs.searchUser.getDOMNode().value.trim();
      console.log("the value: " + val);
      this.getAll(val);

    },
    render: function() {
        //return <TodoItem />
        //if(this.state.isLoaded){
        if(!this.state.isLoaded){
          //this.getAll();
          return (
            <div>
              <input ref="searchUser" id="user" placeholder="Testing" autoFocus={true} onKeyDown={this.handleNewTodoKeyDown} />
              <button type="button" onClick={this.handleButton}>Search</button>
            </div>
          );
        }
          //{this.props.results.map(function(result) {
          //  return <ListItemWrapper key={result.id} data={result}/>;
          //})}

        var incomplete = this.state.results.filter(function (todo) {
          return (todo.status === "Incomplete");
        });
        var complete = this.state.results.filter(function (todo) {
          return (todo.status === "Complete");
        });
        //var main = this.state.results.map(function (todo) {
        var incompleteItems = incomplete.map(function (todo) {
          return (
            <TodoItem info={todo} />
          );
        }, this);
        var completeItems = complete.map(function (todo) {
          return (
            <TodoItem info={todo} />
          );
        }, this);

        return (
          <div>
            {incompleteItems}
            {completeItems}
          </div>
        );
          //<div>{this.renderList}</div>
        //return <div>Hello, world! {this.state.name}</div>;
    },
    getAll: function(username){
      //var username = "asdf";
      $.get(REQUEST_URL + GET_ALL + username, function(result) {
      //$.getJSON(REQUEST_URL + GET_ALL + username, function(result) {
        console.log("here is the result: " + result);
        console.log("here is the result: " + JSON.stringify(result));
        this.setState({
          isLoaded: true,
          results: result
        });
      }.bind(this));
      //fetch((REQUEST_URL + GET_ALL + username), {
      //  method: 'GET'
      //  })
      //  .then((response) => response.json())
      //  .then((responseData) => {
      //    console.log("here is the result: " + responseData);
      //    this.setState({
      //      isLoaded: true,
      //      responseData: responseData,
      //    });
      //  })
      //  .done();
    },
    renderList: function(){
      return "<div>laoded</div>";
    }
});

React.render(<TodoApp />, document.body);

