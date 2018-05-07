# react-native-multipeer

A modified version of [this](https://www.npmjs.com/package/react-native-multipeer) npm package

## Getting started

1. Add this project as a submodule to your react-native project
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. Go to `[this submodule's path]` ➜ `react-native-multipeer` and add `RCTMultipeerConnectivity.xcodeproj`
4. In XCode, in the project navigator, select your project. Add `libRCTMultipeerConnectivity.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
5. Click `RCTMultipeerConnectivity.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for `Header Search Paths` and make sure it contains both *`$(SRCROOT)/../react-native/React`* and *`$(SRCROOT)/../../React`* - mark both as `recursive`.
6. Add *`reducers/MultiPeer.reducer.js`* to your main project's reducer list, i.e. the `combineReducers` function
7. Add *`middlewares/middlewares.js`* to your main project's middleware list, i.e. the `applyMiddleware` function
8. Run your main project

## Usage

You can perform the supported methods by **dispatching** actions in *`actions/MultiPeer.action.js`*

*For more detailed usages, please take a look at the following components of [MultiPeerTest](https://github.com/NTU-NMLAB/MultiPeerTest) Project:*
[PeerList](https://github.com/NTU-NMLAB/MultiPeerTest/blob/master/src/components/smart/partial/PeerList/PeerList.component.js)
[AdvertiseControl](https://github.com/NTU-NMLAB/MultiPeerTest/blob/master/src/components/smart/partial/AdvertiseControl/AdvertiseControl.component.js)


## States Reference
Following redux pattern, there is a state object recording all the operational status of this submodule. The UI should be in sync with this state, i.e. **`connect`** to the state and update according to it. The state object is of the following shape:

```javascript
const multipeerState = {
  selfName: 'User-default',   // String, name of the device itself
  peers: {                    // An object containing (id: peer) pairs
    'xxxxxxxxxx': {             // Instance of Peer class
      id: 'xxxxxxxxxx',           // id of the peer; given by the underlying MultipeerConnectivity Protocol
      name: 'Foo',                // name of the peer; grabbing from the peer's info
      connected: false,           // whether the peer is connected with this device
      invited: false,             // whether this device invited the peer
      invitationId: '',            // if this device is invited by the peer but not responses yet, this property will contain a value; otherwise it will be an empty string
    },
  }, 
  isBrowsing: false,          // A boolean flag recording if this device is browsing
  isAdvertising: false,       // A boolean flag recording if this device is advertising
};
```

## Redux Action Creator Reference
To update the state above and further refresh UI, all you need is to **`dispatch`** actions via following action-creators, which are defined in *`action/MultiPeer.action.js`*.

#### `init(selfName)`
Initialize the underlying MultipeerConnectivity agent. This will be called programmatically when the app starts. (see `classes/MultipeerConnectionInit.js`)

#### `browse()`
Browse for nearby peers that are advertising. When peers are found, they will be inserted into `peers` in the `state` object.

#### `stopBrowse()`
The cancellation of `browse()`.

#### `advertise(info)`
Allow discovery of yourself as a peer in the neighborhood. `info` is an object containing data which will be passed to other peers when they find you; it should at least contain `'name'` property, which is your `selfName`. When you are advertising, you will be found by nearby devices that have already called `browse()` action creator. If they find you and send an invitation to you, they will be inserted into `peers` in your `state` object, with an `invitationId`.

#### `hide()`
The cancellation of `advertise()`. Deny discovery of yourself as a peer. If you call this, all the peers that have ever `invite` you will be lost from `peers` in your `state`, no matter you two are connected or not.

#### `invite(peerId, myInfo, callback)`
Invite a peer into your session. You can only call this when you find someone via `browse` and you two are not connected yet. `myInfo` should at least contain `'name'` property, which is your `selfName`. `callback` will be executed after the invitation is sent.

#### `responseInvite(sender, accept, callback)`
Response an invitation from `sender`, which should be the sender's `name`. You can only call this when the sender's `invitationId` in your `state` is not empty, i.e., the sender has sent an invitation to you. `accept` is a boolean. If `accept === true`, You two will become connected. `callback` will be executed after the response is sent.

#### `requestInfo(peerId)`
Request peer's info. This is called programmatically when peer's are connected; since they probably don't have each other's info. (see `classes/MultipeerConnectionInit.js`)

#### `returnInfo(receiverId, info)`
Return self's info when requested by peers. This is called programmatically when the peer send info-request to you. (see `middlewares/middlewares.js`)

#### `sendData(recipients, data, callback)`
Send `data`, which is a json object, to `recipients`, which is an array of `Peer` or peerId. `callback` will be executed after the data are sent.

#### `broadcastData(data, callback)`
Send `data`, which is a json object, to all of your connected peers. `callback` will be executed after the data are sent.

#### `createStreamForPeer(peerId, name, callback)`
**This is not implemented yet.** Create data streaming to a peer.

#### `disconnect(callback)`
Disconnect with all of peers. `callback` will be executed when all peers are disconnected.
