import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Button,
  TextInput
} from "react-native";

import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";

import Chat from "./Chat";

var name, uid, email;

export default class FriendsList extends Component {
  state = {
    name: "",
    uid: null,
    email: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loading: true
    };
    this.friendsRef = this.getRef().child("friends");
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(friendsRef) {
    var user = firebase.auth().currentUser;

    friendsRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        if (child.val().email != user.email)
          items.push({
            name: child.val().name,
            uid: child.val().uid,
            email: child.val().email
          });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loading: false
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.friendsRef);
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    headerRight: (
      <Button
        primary
        title="Logout"
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(
              () => {
                this.props.navigation.navigate("Login");
              },
              function(error) {
                // An error happened.
              }
            );
        }}
      >
        Log out
      </Button>
    )
  };

  renderRow = rowData => {
    return (
      <TouchableOpacity
        onPress={() => {
          name = rowData.name;
          email = rowData.email;
          uid = rowData.uid;
          this.props.navigation.navigate("Chat", {
            name: name,
            email: email,
            uid: uid
          });
        }}
      >
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://www.gravatar.com/avatar/"
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topGroup}>
          <Text style={styles.myFriends}>My Friends</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    marginRight: 10,
    marginLeft: 10
  },
  rightButton: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    padding: 0
  },
  topGroup: {
    flexDirection: "row",
    margin: 10
  },
  myFriends: {
    flex: 1,
    color: "#3A5BB1",
    tintColor: "#fff",
    //secondaryColor: '#E9E9E9',
    //grayColor: '#A5A5A5',
    fontSize: 16,
    padding: 5
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 6,
    marginBottom: 8
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 6
  },
  profileName: {
    marginLeft: 6,
    fontSize: 16
  }
});
