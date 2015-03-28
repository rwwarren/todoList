/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var API_URL = "http://todo.localhost/";
var PARAMS = "?type=getAll&user=asdf";
var REQUEST_URL = API_URL + PARAMS;

var TodoList = React.createClass({
  render: function() {
    if (!this.state.loaded) {
      return <Text>asdf</Text>;
    }
    //return (
    //  <View style={styles.container}>
    //    <Text style={styles.welcome}>
    //      Welcome to React Native Start!
    //    </Text>
    //    <Text style={styles.instructions}>
    //      To get started, edit index.ios.js{'\n'}
    //      Press Cmd+R to reload
    //    </Text>
    //  </View>
    //);
//      <View style={styles.container}>
//        <Text>test</Text>
//        <Text>{responseData}</Text>
//      </View>
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTodo}
        style={styles.listView}
      />
    );
  },
 getInitialState: function() {
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
    fetch(REQUEST_URL)
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
        <View style={styles.todoElement}>
          <Text>{"\{"}</Text>
          <Text style={styles.tabbed}>User: {todo.user}</Text>
          <Text style={styles.tabbed}>Status: {todo.status}</Text>
          <Text style={styles.tabbed}>Description: {todo.description}</Text>
          <Text style={styles.tabbed}>Due Date: {todo.due_date}</Text>
          <Text>{"\}"}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  todoElement: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 5,
    textAlign: 'left',
    borderBottomWidth: 1,
  },
  tabbed: {
    textAlign: 'left',
    left: 15,
  },
});

AppRegistry.registerComponent('TodoList', () => TodoList);
