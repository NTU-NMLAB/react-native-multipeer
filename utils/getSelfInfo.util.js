export default ({ profile, multiPeer, currCourse }) => (
  profile.isTeacher ?
    {
      isTeacher: 'true',
      username: profile.username,
      userId: multiPeer.userId,
      currCourseId: currCourse.courseId,
      currCourseTitle: currCourse.title,
      currCourseColor: currCourse.color,
      currCourseYear: currCourse.year.toString(),
      currCourseSemester: currCourse.semester,
      currCourseClassroom: currCourse.classroom,
      currCourseWeekday: currCourse.weekday,
      currCourseTime: currCourse.time,
      currCourseWebsite: currCourse.website,
      currCourseTimestamp: currCourse.timestamp,
    } :
    {
      isTeacher: 'false',
      username: profile.username,
      userId: multiPeer.userId,
      currCourseId: currCourse.courseId,
      currCourseTitle: currCourse.title,
    }
)
