import { DeviceEventEmitter, NativeModules } from 'react-native';
import AppConstants from '../constants/App.constant';
import MessageType from '../constants/MessageType.constant';

class MultipeerConnection {
  constructor() {
    this.RCTMultipeerConnectivity = NativeModules.MultipeerConnectivity;
  }

  static registerListeners(listeners) {
    listeners.forEach(({ eventName, handler }) => {
      DeviceEventEmitter.addListener(eventName, handler);
    });
  }

  sendData(recipientIds, data, callback = () => {}) {
    this.RCTMultipeerConnectivity.send(recipientIds, data, callback);
  }

  broadcastData(data, callback = () => {}) {
    this.RCTMultipeerConnectivity.broadcast(data, callback);
  }

  invite(peerId, myInfo, callback = () => {}) {
    this.RCTMultipeerConnectivity.invite(peerId, myInfo, callback);
  }

  responseInvite(inviteId, accept, callback = () => {}) {
    this.RCTMultipeerConnectivity.rsvp(inviteId, accept, callback);
  }

  advertise(info) {
    this.RCTMultipeerConnectivity.advertise(AppConstants.SERVICE_TYPE, info);
  }

  hide() {
    this.RCTMultipeerConnectivity.hide();
  }

  disconnect(callback = () => {}) {
    this.RCTMultipeerConnectivity.disconnect(callback);
  }

  browse() {
    this.RCTMultipeerConnectivity.browse(AppConstants.SERVICE_TYPE);
  }

  stopBrowse() {
    this.RCTMultipeerConnectivity.stopBrowse();
  }

  createStreamForPeer(peerId, name, callback = () => {}) {
    this.RCTMultipeerConnectivity.createStreamForPeer(peerId, name, callback);
  }

  requestInfo(peerId) {
    this.sendData([peerId], {
      messageType: MessageType.REQUEST_INFO,
    });
  }

  returnInfo(receiverId, info) {
    this.sendData([receiverId], {
      messageType: MessageType.RETURN_INFO,
      info,
    });
  }
}

export default MultipeerConnection;
