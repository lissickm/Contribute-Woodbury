import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './calendar.css';


const Calendar = () => {
  const dispatch = useDispatch();
  const eventList = useSelector(store => store.calendar.calendar);
  const npList = useSelector(store => store.directory);
  React.useEffect(() => {
    dispatch({ type: 'GET_CALENDAR' });
    dispatch({ type: 'GET_DIRECTORY' })
  }, [])

  //RETURN NONPROFIT;
  function findName(id) {
    for (let nonprofit of npList) {
      if (+(id) === nonprofit.id) {
        return nonprofit.name
      }
    }
  }

  //RETURN EVENT ITEMS WITH EVENT DATES
  function eventItem(event) {
    let path = `/eventDetails/${event.id}`;
    return (
      <div key={event.id}>
        <Grid item md={12} > <b>Event:</b> {event.name} &nbsp;
          <Link to={path}>Learn More</Link>
        </Grid>
        <Grid item md={12} ><b> Organization: </b> {findName(event.non_profit_id)}
          <br /> <b>Dates: </b>
          {moment(event.start_date).format('MMM Do YYYY')} - {moment(event.end_date).format('MMM Do YYYY')}
        </Grid> <br />
      </div>);
  }

  return (
    <div className="calendarPage">
      <div className="calendarHeader"><h1>Calendar</h1></div>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <h4 className="calendarDividers">{moment().subtract(30, 'days').calendar()} - {moment().subtract(8, 'days').calendar()}</h4>
          <ul>
            {eventList.lastMonth ? eventList.lastMonth.map(event => eventItem(event)) : 'No Events'}
          </ul>
        </Grid>
        <Grid item md={6} xs={12}>
          <h4 className="calendarDividers">{moment().subtract(7, 'days').calendar()} - {moment().subtract(1, 'days').calendar('MM/DD/YYYY')}</h4>
          <ul>
            {eventList.lastWeek ? eventList.lastWeek.map(event => eventItem(event)) : 'No Events this week'}
          </ul>
        </Grid>
        <Grid item md={6} xs={12}>
          <h4 className="calendarDividers">{moment().format('MM/DD/YYYY')} - {moment().add(6, 'days').calendar('MM/DD/YYYY')}</h4>
          <ul>
            {eventList.currentWeek ? eventList.currentWeek.map(event => eventItem(event)) : 'No Events this week'}
          </ul>
        </Grid>
        <Grid item md={6} xs={12}>
          <h4 className="calendarDividers">{moment().add(7, 'days').calendar()} - {moment().add(13, 'days').calendar()}</h4>
          <ul>
            {eventList.nextWeek ? eventList.nextWeek.map(event => eventItem(event)) : 'No Events this week'}
          </ul>
        </Grid>
        <Grid item md={6} xs={12}>
          <h4 className="calendarDividers">Future Events</h4>
          <ul>
            {eventList.nextWeek ? eventList.future.map(event => eventItem(event)) : 'No Events this week'}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}

export default Calendar;


