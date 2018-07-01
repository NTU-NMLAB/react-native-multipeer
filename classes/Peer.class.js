export default class Peer {
  constructor(info, currPeerId = '', connected = false, invited = false, invitationId = '', online = false) {
    this.userId = info.userId
    this.info = {
      isTeacher: 'false',
      username: '', // name of user represented by this peer
      currCourseId: '', // current active course id
      releasing: false, // teacher releasing
      ...info,
    }
    this.currPeerId = currPeerId
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
