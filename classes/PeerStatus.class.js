export default class PeerStatus {
  constructor(currPeerId, senderInfo, connected = false, invited = false, invitationId = '') {
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
      teacher: senderInfo.isTeacher === 'true' ? senderInfo.username : undefined,
    }
    this.connected = connected
    this.invited = invited
    // for teacher, student.invited === "who has been invited by you"
    // for student, teacher.invited === "who has invited you"
    this.invitationId = invitationId
    // has received invitation from the teacher
    this.username = senderInfo.username
  }
}
