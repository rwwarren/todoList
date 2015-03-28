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

var GetAll = require('./GetAll');
var GetIncomplete = require('./GetIncomplete');

//touchable getall and incomplete (for marking complete)
//Create page
//Add USER to search

var HomePage = React.createClass({
  render: function() {
//        this.props.navigator.push({
//          title: 'Results',
//          component: GetAll,
//          passProps: {listings: response.listings}
//        });
    return (
      <View style={styles.container}>
        <Text>asdf</Text>
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
      </View>
    );
  },
  getAll: function() {
    this.props.navigator.push({
      title: 'Results All',
      component: GetAll,
    });
  },
  getIncomplete: function() {
    this.props.navigator.push({
      title: 'Results Incomplete',
      component: GetIncomplete,
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
  }
});

module.exports = HomePage;
