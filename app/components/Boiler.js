import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";

import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

export default class Boiler extends Component {
  state = {
    name: ""
  };
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085"
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
              })
            }
          >
            Chat Room
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Friendlist")}
          >
            Friend List
          </Text>
        </TouchableOpacity>
        <Button
          primary
          title="Logout"
          //style={styles.rightButton}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(
                () => {
                  firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                      firebase.auth().signOut();
                    }
                  });
                },
                function(error) {
                  // An error happened.
                }
              );
            this.props.navigation.navigate("Login");
          }}
        >
          Log out
        </Button>
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
