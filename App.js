/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";

import Login from "./app/components/Login";
import Boiler from "./app/components/Boiler";
import ForgetPassword from "./app/components/ForgetPassword";
import Register from "./app/components/Register";

import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";
/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

class Home extends Component<{}> {
  constructor() {
    super();
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      firebase
        .messaging()
        .on(firebase.messaging().Notification, async notif => {
          if (notif.opened_from_tray) {
            //nid has been sent in the data payload of the notification
            const nid = notif.nid;
            AppRouter.notifications(nid);
          }
          if (Platform.OS === "ios") {
            // Usual shenanigans goes here (see fcm starting example)
          }
        });
      if (user) {
        firebase.messaging().requestPermissions();
        this.topic = `/topics/${user.uid}`;
        firebase.messaging().subscribeToTopic(this.topic);
        this.setState({ loading: false, authenticated: true });
      } else if (this.topic) {
        // If the user is logged-out, we unsubscribe
        firebase.messaging().unsubscribeFromTopic(this.topic);
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc
    if (!this.state.authenticated) {
      return (
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#16a085" />
          <Login navigation={this.props.navigation} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#16a085" />
        <Boiler navigation={this.props.navigation} />
      </View>
    );
  }
}

export default (App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      title: "ForgetPassword"
    }
  },
  Boiler: {
    screen: Boiler,
    navigationOptions: {
      title: "Boiler"
    }
  }
}));

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
