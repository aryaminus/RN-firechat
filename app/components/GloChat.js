import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from "react-native";

import Backend from "./Backend";

import { GiftedChat } from "react-native-gifted-chat";

class GloChat extends React.Component {
  constructor(props){
    super(props);
    this.state = { name: false };
  }
  state = {
    messages: []
  };
  
  componentWillMount() {}

  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={message => {
            Backend.sendMessage(message);
          }}
          user={{
            _id: Backend.getUid(),
            name: this.props.navigation.state.name
          }}
        />
      </View>
    );
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "gray"
  }
});
export default GloChat;