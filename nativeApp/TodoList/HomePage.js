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
  TextInput,
} = React;

var GetAll = require('./GetAll');
var GetIncomplete = require('./GetIncomplete');
var CreateTask = require('./CreateTask');

//touchable getall and incomplete (for marking complete)
//Create page
//Add USER to search

var HomePage = React.createClass({
  //var getallUser = '';
//      setState({
//      //this.setState({
//          loaded: true,
//      }),
//      //});
//  initState: function(){
  getInitialState: function() {
      return {
        loaded: false,
        //searchGetAll: 'asdf',
        getUser: '',
      };
      //this.setState({
      //    loaded: true,
      //});
  },
  render: function() {
//          this.initState();
//      this.setState({
//          loaded: true,
//      });
//        this.props.navigator.push({
//          title: 'Results',
//          component: GetAll,
//          passProps: {listings: response.listings}
//        });
    return (
      <View style={styles.container}>
        <Text>asdf</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Search by username'
          value={this.state.getUser}
          onChange={this.searchUser.bind(this)}/>
        <TouchableHighlight onPress={this.getAll}
          underlayColor='#99d9f4' 
          style={styles.button}>
          <Text>getAll</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.getIncomplete}
          underlayColor='#99d9f4' 
          style={styles.button}>
          <Text>getIncomplete</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.createTask}
          underlayColor='#99d9f4' 
          style={styles.button}>
          <Text>Create Task</Text>
        </TouchableHighlight>
      </View>
    );
  },
  searchUser: function(event) {
    this.setState({ getUser: event.nativeEvent.text });
  },
  getAll: function() {
    if(this.state.getUser.length > 0) {
      this.props.navigator.push({
        title: 'Results All',
        component: GetAll,
        passProps: { getUser: this.state.getUser },
      });
    }
  },
  getIncomplete: function() {
    if(this.state.getUser.length > 0) {
      this.props.navigator.push({
        title: 'Results Incomplete',
        component: GetIncomplete,
        passProps: { getUser: this.state.getUser },
      });
    }
  },
  createTask: function() {
    this.props.navigator.push({
      title: 'Create Task',
      component: CreateTask,
      //passProps: { getUser: this.state.getUser },
    });
  },

});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginBottom: 20,
    height: 30,
    backgroundColor: '#48BBEC',
  },
  textbox: {
    backgroundColor: '#FFFFFF',
    height: 30,
  },
});

module.exports = HomePage;
