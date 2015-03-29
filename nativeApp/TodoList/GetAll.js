'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  Component,
  TouchableHighlight,
} = React;

var API_URL = "http://todo.localhost/";
var PARAMS = "?type=getAll&user=";
//var PARAMS = "?type=getAll&user=asdf";
var REQUEST_URL = API_URL + PARAMS;

var GetAll = React.createClass({
  render: function() {
    //return (
    //  <View style={styles.container}>
    //    <Text>Hello There</Text>
    //  </View>
    //);
  //},
//      <Text style={styles.container}>
//      {this.state.getallUser}
//      </Text>
//      <Text style={styles.container}>
//      {this.props.getallUser}
//      </Text>
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTodo}
        style={styles.listView}
      />
    );
},
 getInitialState: function() {
//       getallUser: this.props.getallUser
    return {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL + this.props.getUser)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  renderTodo: function(todo) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.popup}>
        <View style={styles.todoElement}>
          <Text>{"\{"}</Text>
          <Text style={styles.tabbed}>User: {todo.user}</Text>
          <Text style={styles.tabbed}>Status: {todo.status}</Text>
          <Text style={styles.tabbed}>Description: {todo.description}</Text>
          <Text style={styles.tabbed}>Due Date: {todo.due_date}</Text>
          <Text>{"\}"}</Text>
        </View>
        </TouchableHighlight>
      </View>
    );
  },
  popup: function(){
    return (
      <View style={styles.container}>
        <Text style={styles.container}>Testing</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = GetAll;

