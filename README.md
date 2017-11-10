# RnFireChat

**RnFireChat** is the 5th session build for showing the implementation of Firebase for building a Chat app; both Chat Room and p2p along with serverless function for push notification.

In this branch, we'll be using the built layout from <a href="https://github.com/aryaminus/RN-firechat/tree/GloChat" target="_blank">GloChat</a> branch where we will be working to entering either a chatroom or to choose a person from FriendList and chat with him/her.


[![RnFireChat demo](https://i.imgur.com/Lae3m7R.gif)](https://youtu.be/XNQ1jgqpX3c)

**Note:**

1. Arch Linux with VS-Code, thus support focused on Android App
2. Extensions: <a href="https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native" target="_blank">React Native Tools</a> , <a href="https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux" target="_blank">React-Native Snippets</a> , <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier</a>
3. Device run instead of SDK-build using <a href="https://chrome.google.com/webstore/detail/vysor/gidgenkbbabolejbgbpnhbimgjbffefm" target="_blank">Vysor</a>

## Installation

Clone the source locally:
```
$ git clone https://github.com/aryaminus/RN-firechat
$ cd RN-firechat
$ git PersonalChat
```

**Start the application in development mode**
```
npm install
react-native link
react-native run android
```
or for VS-Code:
```
npm install
react-native link
```
then press F1 or Fn+F1 and React Native:Run Android on Device 

**Else**
Follow Code.txt and <a href="https://youtu.be/XNQ1jgqpX3c" target="_blank">Youtube</a>

We will be using Signin and Signup screen ie. <a href="https://github.com/aryaminus/RN-login-register-screen" target="_blank"> 3rd session</a>

## Packages:
1. <a href="https://reactnavigation.org/docs/intro/" target="_blank">react-navigation</a>
2. <a href="https://github.com/joinspontaneous/react-native-loading-spinner-overlay" target="_blank">react-native-loading-spinner-overlay</a>
3. <a href="https://github.com/invertase/react-native-firebase/" target="_blank">react-native-firebase</a>
4. <a href="https://github.com/FaridSafi/react-native-gifted-chat" target="_blank">react-native-gifted-chat</a>
5. <a href="https://rnfirebase.io/docs/v3.0.*/installation/initial-setup" target="_blank">Invertase Firebase initial setup</a>
6. <a href="https://github.com/drmas/FireChat" target="_blank">Original drmas Layout Repo</a>

## Additional Links:
There is an update put up by <a href="https://rnfirebase.io/" target="_blank">invertase</a> for a <a href="https://github.com/invertase/react-native-firebase-starter" target="_blank">react-native-firebase-starter</a> pre-integrated so you can get started quickly.


### Installation
Follow Code.txt and Working.png

**Major Properties:**
 - Use the template of GloChat branch
 - Usage of invertase firebase instead of original firebase package as it is built for web but therefore Firebase will run on the native thread for invertase
 - If choose Friendlist.js show a vertical ListView of users linked in 'friends' with geeting progile pic from gavatar
 - When certain user is clicked, send the rowdata value ie receiver ID and genetare certain Chat ID with user and Friend ID and iside the databse of chatID, show the Gifted Chat to send and receive text

![Working demo](https://i.imgur.com/nxpAU2j.png)

## Contributing

1. Fork it (<https://github.com/aryaminus/RN-firechat/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request