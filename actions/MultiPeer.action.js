import MultiPeerActionTypes from './MultiPeer.type';
import Peer from '../classes/Peer';
import MultipeerConnectivity from '../../react-native-multipeer';

const MultiPeerActions = {
  init(selfName) {
    return {
      type: MultiPeerActionTypes.INIT,
      selfName,
    };
  },
  browse() {
    MultipeerConnectivity.browse();
    return {
      type: MultiPeerActionTypes.BROWSE,
    };
  },
  stopBrowse() {
    MultipeerConnectivity.stopBrowse();
    return {
      type: MultiPeerActionTypes.STOP_BROWSE,
    };
  },
  advertise(info = {}) {
    MultipeerConnectivity.advertise(info);
    return {
      type: MultiPeerActionTypes.ADVERTISE,
    };
  },
  hide() {
    MultipeerConnectivity.hide();
    return {
      type: MultiPeerActionTypes.HIDE,
    };
  },
  invite(peerId, myInfo, callback = () => {}) {
    MultipeerConnectivity.invite(peerId, myInfo, callback);
    return {
      type: MultiPeerActionTypes.INVITE,
      peerId,
    };
  },
  responseInvite(sender, accept, callback = () => {}) {
    MultipeerConnectivity.responseInvite(sender.invitationId, accept, callback);
    return {
      type: MultiPeerActionTypes.RESPONSE_INVITE,
      sender,
    };
  },
  requestInfo(peerId) {
    MultipeerConnectivity.requestInfo(peerId);
    return {
      type: MultiPeerActionTypes.REQUEST_INFO,
      peerId,
    };
  },
  returnInfo(receiverId, info) {
    MultipeerConnectivity.returnInfo(receiverId, info);
    return {
      type: MultiPeerActionTypes.RETURN_INFO,
      info,
    };
  },
  sendData(recipients, data, callback = () => {}) {
    const recipientIds = recipients.map((recipient) => {
      if (recipient instanceof Peer) {
        return recipient.id;
      }
      return recipient;
    });
    MultipeerConnectivity.sendData(recipientIds, data, callback);
    return {
      type: MultiPeerActionTypes.SEND_DATA,
    };
  },
  broadcastData(data, callback = () => {}) {
    MultipeerConnectivity.broadcastData(data, callback);
    return {
      type: MultiPeerActionTypes.BROADCAST_DATA,
    };
  },
  createStreamForPeer(peerId, name, callback = () => {}) {
    MultipeerConnectivity.createStreamForPeer(peerId, name, callback);
    return {
      type: MultiPeerActionTypes.CREATE_STREAM_FOR_PEER,
    };
  },
  disconnect(callback = () => {}) {
    MultipeerConnectivity.disconnect(callback);
    return {
      type: MultiPeerActionTypes.DISCONNECT,
    };
  },
  onPeerFound(peerId, peerName) {
    const peer = new Peer(peerId, peerName);
    return {
      type: MultiPeerActionTypes.ON_PEER_FOUND,
      peer,
    };
  },
  onPeerLost(peerId) {
    return {
      type: MultiPeerActionTypes.ON_PEER_LOST,
      peerId,
    };
  },
  onPeerConnected(peerId) {
    const peer = new Peer(peerId, '', true, false, '');
    return {
      type: MultiPeerActionTypes.ON_PEER_CONNECTED,
      peer,
    };
  },
  onPeerConnecting(peerId) {
    return {
      type: MultiPeerActionTypes.ON_PEER_CONNECTING,
      peerId,
    };
  },
  onPeerDisconnected(peerId) {
    return {
      type: MultiPeerActionTypes.ON_PEER_DISCONNECTED,
      peerId,
    };
  },
  onStreamOpened() {
    return {
      type: MultiPeerActionTypes.ON_STREAM_OPENED,
    };
  },
  onInviteReceived(invitation) {
    const peer = new Peer(
      invitation.sender.id,
      invitation.sender.name,
      false,
      false,
      invitation.id,
    );
    return {
      type: MultiPeerActionTypes.ON_INVITE_RECEIVED,
      peer,
    };
  },
  onDataReceived(senderId, data) {
    return {
      type: MultiPeerActionTypes.ON_DATA_RECEIVED,
      senderId,
      data,
    };
  },
  onInfoUpdate(peerId, info) {
    return {
      type: MultiPeerActionTypes.ON_INFO_UPDATE,
      peerId,
      info,
    };
  },
};

export default MultiPeerActions;
