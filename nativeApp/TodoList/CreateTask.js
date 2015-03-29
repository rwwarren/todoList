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
  TextInput,
  TouchableHighlight,
  DatePickerIOS,
  PickerIOS,
} = React;

var API_URL = "http://todo.localhost/";
var PARAMS = "?type=create";
//var PARAMS = "?type=getAll&user=asdf";
var REQUEST_URL = API_URL + PARAMS;

var CreateTask = React.createClass({
  getInitialState: function() {
      return {
        username: '',
        Status: '',
        description: '',
        dueDate: '',
      };
  },
  render: function() {
    //this.props.date = date.toTime();
//        <DatePickerIOS
//          onDateChange={this.updateDueDate.bind(this)}/>
//        <PickerIOS
//          onDateChange={this.updateDueDate.bind(this)}/>
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textbox}
          placeholder='Username'
          value={this.state.username}
          onChange={this.updateUsername.bind(this)}/>
        <TextInput
          style={styles.textbox}
          placeholder='Status'
          value={this.state.Status}
          onChange={this.updateStatus.bind(this)}/>
        <TextInput
          style={styles.textbox}
          placeholder='Description'
          value={this.state.description}
          onChange={this.updateDescription.bind(this)}/>
        <TextInput
          style={styles.textbox}
          placeholder='Due Date'
          value={this.state.dueDate}
          onChange={this.updateDueDate.bind(this)}/>
        <PickerIOS
          onValueChange={this.updateDueDate.bind(this)}
          selectedValue='asdf'/>
        <TouchableHighlight onPress={this.createTask}
          underlayColor='#99d9f4' 
          style={styles.button}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
},
// getInitialState: function() {
////       getallUser: this.props.getallUser
//    return {
//      dataSource: new ListView.DataSource({
//          rowHasChanged: (row1, row2) => row1 !== row2,
//       }),
//       loaded: false,
//    };
//  },
//  componentDidMount: function() {
//    //this.fetchData();
//  },
//  fetchData: function() {
//    fetch(REQUEST_URL)
//      .then((response) => response.json())
//      .then((responseData) => {
//        this.setState({
//          dataSource: this.state.dataSource.cloneWithRows(responseData),
//          loaded: true,
//        });
//      })
//      .done();
//  },
  updateUsername: function(event) {
    this.setState({ username: event.nativeEvent.text });
  },
  updateStatus: function(event) {
    this.setState({ Status: event.nativeEvent.text });
  },
  updateDescription: function(event) {
    this.setState({ description: event.nativeEvent.text });
  },
  updateDueDate: function(event) {
    this.setState({ dueDate: event.nativeEvent.text });
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textbox: {
    backgroundColor: '#FFFFFF',
    height: 30,
    marginBottom: 15,
  },
  descriptionbox: {
    backgroundColor: '#FFFFFF',
    height: 300,
    marginBottom: 15,
  },
  button: {
    marginBottom: 20,
    height: 30,
    backgroundColor: '#48BBEC',
  },
});

module.exports = CreateTask;

