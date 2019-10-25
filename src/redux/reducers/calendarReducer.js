import moment from 'moment';
import { combineReducers } from 'redux';

const calendar = (state = [], action) => {
  switch (action.type) {
    case 'SET_CALENDAR':
      let calendar = { lastMonth: [], lastWeek: [], currentWeek: [], nextWeek: [], future: [] }
      for (const event of action.payload) {
        let endDate = moment(event.end_date).format('YYYYMMDD');
        let now = moment().format('YYYYMMDD');
        if (endDate < moment().subtract(8, 'days').format('YYYYMMDD')){
          calendar.lastMonth.push(event);
        } else if (endDate < now && endDate >= moment().subtract(7, 'days').format('YYYYMMDD')) {
          calendar.lastWeek.push(event);
        } else if (endDate >= now && endDate < moment().add(7, 'days').format('YYYYMMDD')) {
          calendar.currentWeek.push(event);
        } else if (endDate > moment().add(7, 'days').format('YYYYMMDD') && endDate < moment().add(13, 'days').format('YYYYMMDD')) {
          calendar.nextWeek.push(event);
        } else {
          calendar.future.push(event);
        }
      }
      return calendar;
    default:
      return state;
  }
}

export default combineReducers({
  calendar,
});