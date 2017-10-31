import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
//import { StackNavigator } from "react-navigation";
export default class Boiler extends Component {
  state = {
    name: ""
  };
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    headerLeft: null
  };
  render() {
    return (
      <View style={styles.containerl}>
        <StatusBar barStyle="light-content" backgroundColor="#00796B" />
        <Text style={styles.title}>Enter Your Name:</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={this.state.name}
          onChangeText={text => {
            this.setState({
              name: text
            });
          }}
          value={this.state.name}
        />
        <TouchableOpacity>
          <Text
            style={styles.buttonStyle}
            onPress={() =>
              this.props.navigation.navigate("GloChat", {
                name: this.state.name
              })}
          >
            Chat Room
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20
  },
  nameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    margin: 20
  },
  buttonStyle: {
    marginLeft: 20,
    margin: 20
  },
  containerl: {
    flex: 1
  }
});

AppRegistry.registerComponent("Boiler", () => Boiler);
