export default class PeerStatus {
  constructor(currPeerId, currCourse, connected = false, invited = false, invitationId = '') {
    this.currPeerId = currPeerId
    this.currCourse = {
      courseId: currCourse.currCourseId,
      title: currCourse.currCourseTitle,
      color: currCourse.currCourseColor,
      year: currCourse.currCourseYear,
      semester: currCourse.currCourseSemester,
      classroom: currCourse.currCourseClassroom,
      weekday: currCourse.currCourseWeekday,
      time: currCourse.currCourseTime,
      website: currCourse.currCourseWebsite,
      timestamp: currCourse.currCourseTimestamp,
    }
    this.connected = connected
    this.invited = invited
    this.invitationId = invitationId
  }
}
