export default class PeerStatus {
  constructor(currPeerId, senderInfo, connected = false, invited = false, invitationId = '') {
    // for teacher, student.invited === "who has been invited by you"
    // for student, teacher.invited === "who has invited you"
    this.currPeerId = currPeerId
    this.currCourse = {
      courseId: senderInfo.currCourseId,
      title: senderInfo.currCourseTitle,
      color: senderInfo.currCourseColor,
      year: senderInfo.currCourseYear,
      semester: senderInfo.currCourseSemester,
      classroom: senderInfo.currCourseClassroom,
      weekday: senderInfo.currCourseWeekday,
      time: senderInfo.currCourseTime,
      website: senderInfo.currCourseWebsite,
      timestamp: senderInfo.currCourseTimestamp,
      teacher: senderInfo.username,
    }
    this.connected = connected
    this.invited = invited
    this.invitationId = invitationId
    this.username = senderInfo.username
  }
}
