export default class Peer {
  constructor(id, info, connected = false, invited = false, invitationId = '', online = false) {
    this.id = id
    this.info = {
      identity: '', // 'teacher', 'student'
      username: '', // name of user represented by this peer
      course: '', // current active course
      releasing: false, // teacher releasing
      ...info,
    }
    this.connected = connected
    this.invited = invited
    this.invitationId = invitationId
    this.online = online
  }
}

export const PeerStatus = {
  IDLE: 'IDLE',
  RELEASING: 'RELEASING',
  SEARCHING: 'SEARCHING',
  VIEWING: 'VIEWING',
}
