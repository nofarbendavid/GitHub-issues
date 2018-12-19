import moment from 'moment/moment';

export const calcTimeDeltaFromCurrentTime = (startTime) => {
  const now = moment(new Date())
  return moment.duration(now.diff(startTime)).humanize()
}