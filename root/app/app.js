/**
 *  Todo list written in react js
 */
"use strict";

var MyList = React.createClass({
    getInitialState: function(){
      return {
        name: "Ryan"
      };
    },
    render: function() {
        return <div>Hello, world! {this.state.name}</div>;
    }
});

var TODOApp = React.createClass({
    getInitialState: function(){
      return {
        name: "Ryan"
      };
    },
    render: function() {
        return <MyList />
        //return <div>Hello, world! {this.state.name}</div>;
    }
});

React.render(<TODOApp />, document.body);

