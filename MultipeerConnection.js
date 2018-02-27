import { DeviceEventEmitter, NativeModules } from 'react-native';
import { EventEmitter } from 'events';
import Peer from './Peer';

const RCTMultipeerConnectivity = NativeModules.MultipeerConnectivity;

export default class MultipeerConnection extends EventEmitter {
  constructor() {
    super();
    this.peers = {};
    this.connectedPeers = {};
    const peerFound = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerFound',
      ((event) => {
        const peer = new Peer(event.peer.id, event.peer.info.name);
        this.peers[peer.id] = peer;
        this.emit('peerFound', { peer });
      }),
    );

    const peerLost = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerLost',
      ((event) => {
        const peer = this.peers[event.peer.id];
        peer.emit('lost');
        this.emit('peerLost', { peer: { id: peer.id } });
        delete this.peers[event.peer.id];
        delete this.connectedPeers[event.peer.id];
      }),
    );

    const peerConnected = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerConnected',
      ((event) => {
        this.peers[event.peer.id].emit('connected');
        this.connectedPeers[event.peer.id] = this.peers[event.peer.id];
        this.emit('peerConnected', event);
      }),
    );

    const peerConnecting = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerConnecting',
      ((event) => {
        this.peers[event.peer.id].emit('connecting');
        this.emit('peerConnecting', event);
      }),
    );

    const peerDisconnected = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerDisconnected',
      ((event) => {
        this.peers[event.peer.id].emit('disconnected');
        delete this.connectedPeers[event.peer.id];
        this.emit('peerDisconnected', event);
      }),
    );

    const streamOpened = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityStreamOpened',
      ((event) => {
        this.emit('streamOpened', event);
      }),
    );

    const invited = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityInviteReceived',
      ((event) => {
        event.sender = this.peers[event.peer.id];
        this.emit('invite', event);
      }),
    );

    const dataReceived = DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityDataReceived',
      ((event) => {
        event.sender = this.peers[event.peer.id];
        this.emit('data', event);
      }),
    );
  }

  getAllPeers() {
    return this.peers;
  }

  getConnectedPeers() {
    return this.connectedPeers;
  }

  send(recipients, data, callback) {
    if (!callback) {
      callback = () => {};
    }
    
    var recipientIds = recipients.map((recipient) => {
      if (recipient instanceof Peer) {
        return recipient.id;
      }
      return recipient;
    });
    
    RCTMultipeerConnectivity.send(recipientIds, data, callback);
  }
  
  broadcast(data, callback) {
    if (!callback) {
      callback = () => {};
    }
    RCTMultipeerConnectivity.broadcast(data, callback);
  }
  
  invite(peerId, callback) {
    if (!callback) {
      callback = () => {};
    }
    RCTMultipeerConnectivity.invite(peerId, callback);
  }
  
  rsvp(inviteId, accept, callback) {
    if (!callback) {
      callback = () => {};
    }
    RCTMultipeerConnectivity.rsvp(inviteId, accept, callback);
  }
  
  advertise(channel, info) {
    RCTMultipeerConnectivity.advertise(channel, info);
  }
  
  hide(channel) {
    RCTMultipeerConnectivity.hide(channel);
  }

  disconnect(callback) {
    RCTMultipeerConnectivity.disconnect(callback);
  }

  browse(channel) {
    RCTMultipeerConnectivity.browse(channel);
  }
  
//  createStreamForPeer(peerId, name, callback) {
//    if (!callback) {
//      callback = () => {};
//    }
//    RCTMultipeerConnectivity.createStreamForPeer(peerId, name, callback);
//  }
}
