import { DeviceEventEmitter, NativeModules } from 'react-native';
import { EventEmitter } from 'events';
import Peer from './Peer';

class MultipeerConnection extends EventEmitter {
  constructor() {
    super();
    this.RCTMultipeerConnectivity = NativeModules.MultipeerConnectivity;
    this.peers = {};
    this.connectedPeers = {};

    // Peer found
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerFound',
      ((event) => {
        const peer = new Peer(event.peer.id, event.peer.info.name);
        this.peers[peer.id] = peer;
        this.emit('peerFound', { peer });
      }),
    );

    // Peer lost
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerLost',
      ((event) => {
        const peer = this.peers[event.peer.id];
        delete this.peers[event.peer.id];
        delete this.connectedPeers[event.peer.id];
        peer.emit('lost');
        this.emit('peerLost', { peer: { id: peer.id } });
      }),
    );

    // Peer connected
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerConnected',
      ((event) => {
        this.peers[event.peer.id].emit('connected');
        this.connectedPeers[event.peer.id] = this.peers[event.peer.id];
        this.emit('peerConnected', event);
      }),
    );

    // Peer connecting
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerConnecting',
      ((event) => {
        this.peers[event.peer.id].emit('connecting');
        this.emit('peerConnecting', event);
      }),
    );

    // Peer disconnected
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityPeerDisconnected',
      ((event) => {
        this.peers[event.peer.id].emit('disconnected');
        delete this.connectedPeers[event.peer.id];
        this.emit('peerDisconnected', event);
      }),
    );

    // Stream opened
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityStreamOpened',
      ((event) => {
        this.emit('streamOpened', event);
      }),
    );

    // Invited
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityInviteReceived',
      ((event) => {
        const evt = {
          ...event,
          sender: this.peers[event.peer.id],
        };
        this.emit('invite', evt);
      }),
    );

    // Data received
    DeviceEventEmitter.addListener(
      'RCTMultipeerConnectivityDataReceived',
      ((event) => {
        const evt = {
          ...event,
          sender: this.peers[event.peer.id],
        };
        this.emit('data', evt);
      }),
    );
  }

  getAllPeers() {
    return this.peers;
  }

  getConnectedPeers() {
    return this.connectedPeers;
  }

  send(recipients, data, callback = () => {}) {
    const recipientIds = recipients.map((recipient) => {
      if (recipient instanceof Peer) {
        return recipient.id;
      }
      return recipient;
    });

    this.RCTMultipeerConnectivity.send(recipientIds, data, callback);
  }

  broadcast(data, callback = () => {}) {
    this.RCTMultipeerConnectivity.broadcast(data, callback);
  }

  invite(peerId, callback = () => {}) {
    this.RCTMultipeerConnectivity.invite(peerId, callback);
  }

  rsvp(inviteId, accept, callback = () => {}) {
    this.RCTMultipeerConnectivity.rsvp(inviteId, accept, callback);
  }

  advertise(channel, info) {
    this.RCTMultipeerConnectivity.advertise(channel, info);
  }

  hide(channel) {
    this.RCTMultipeerConnectivity.hide(channel);
  }

  disconnect(callback = () => {}) {
    this.RCTMultipeerConnectivity.disconnect(callback);
  }

  browse(channel) {
    this.RCTMultipeerConnectivity.browse(channel);
  }

  createStreamForPeer(peerId, name, callback = () => {}) {
    this.RCTMultipeerConnectivity.createStreamForPeer(peerId, name, callback);
  }
}

export default MultipeerConnection;
