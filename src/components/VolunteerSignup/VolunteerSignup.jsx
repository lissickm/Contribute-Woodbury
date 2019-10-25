import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import moment from 'moment';
import Swal from 'sweetalert2';

import { Button, Grid, CardContent, Typography } from '@material-ui/core';
import SignupForm from '../SignupForm/SignupForm';
import NonprofitDetails from '../NonprofitDetails/NonprofitDetails';

import { formatPhoneNumber } from 'react-phone-number-input';


//MATERIAL UI STYLES;
const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    heading: {
        color: '#714723'
    },
    backButton: {
        float: 'left',
        color: 'white',
        backgroundColor: '#457736',
    },
    doneButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 550px 0px 0px'
    },
    cardContent: {
        margin: '25px'
    }

})


class VolunteerSignup extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_SPECIFIC_VOLUNTEER_ROLE',
            payload: this.props.match.params.id
        })
    }

    //ONCLICK ALERT USER AND DISPATCH TO CLEAR THE SIGN UP LIST REDUCER THEN PUSH TO PREVIOUS PAGE;
    handleBackButton = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your information has not been saved!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'CLEAR_SIGNUP_LIST'
                });
                this.props.history.goBack();
            }
        })
    }

    //ONCLICK DISPATCH VOLUNTEER SIGNUP AND CLEAR VOLUNTEERS REDUCER THEN PUSH TO EVENT DETAILS URL;
    handleDoneButton = () => {
        this.props.dispatch({
            type: 'VOLUNTEER_SIGNUP',
            payload: this.props.signedup
        });
        this.props.dispatch({
            type: 'CLEAR_SIGNUP_LIST'
        });
        let id = this.props.role.event_id;
        this.props.history.push(`/eventDetails/${id}`);
    }

    render() {

        return (

            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >Volunteers Sign Up</h1>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <CardContent>
                            <NonprofitDetails />
                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <CardContent>
                            {/* <h3>signup information goes here</h3> */}
                            {this.props.event.map((item) => {
                                let startDate = moment(item.start_date).format('MM[/]DD[/]YYYY')
                                let endDate = moment(item.end_date).format('MM[/]DD[/]YYYY')
                                return (
                                    <>
                                    <h2>{item.name}</h2>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td valign="top"><Typography><b>Date:</b></Typography></td>
                                                    <td><Typography>{startDate} - {endDate}</Typography></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><Typography><b>Location:</b></Typography></td>
                                                    <td><Typography>{item.address}<br />
                                                        {item.city},&nbsp;{item.state}&nbsp;{item.zip_code}</Typography></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <footer></footer>
                                        <Typography>{item.description}</Typography>
                                    </>
                                )
                            })}
                        </CardContent>
                        <CardContent>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td valign="top"><Typography><b>Role:</b></Typography></td>
                                            <td><Typography>{this.props.role.name} ({this.props.role.number_needed} volunteers needed)</Typography></td>
                                        </tr>
                                        <tr>
                                            <td valign="top"><Typography><b>Description:</b></Typography></td>
                                            <td><Typography>{this.props.role.description}</Typography></td>
                                        </tr>
                                        <tr>
                                            <td valign="top"><Typography><b>Date:</b></Typography></td>
                                            <td><Typography>{moment(this.props.role.date).format('MM[/]DD[/]YYYY')} </Typography></td>
                                        </tr>
                                        <tr>
                                            <td valign="top"><Typography><b>Time:</b></Typography></td>
                                            <td><Typography>{moment(this.props.role.start_time, 'hh:mm').format('LT')} - {moment(this.props.role.end_time, 'hh:mm').format('LT')} </Typography></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <SignupForm roleId={this.props.match.params.id} />
                    </Grid>

                    <Grid item xs={12}>
                        <CardContent>
                            {this.props.signedup.length > 0 ?
                                <>
                                    <h3>Thank you for volunteering! Your information has been sent to the organization.</h3>
                                    {/* {JSON.stringify(this.props.saved)} */}
                                    {this.props.signedup.map((volunteer) => {
                                        // let moment = moment().format('hh:mm')

                                        return (
                                            <CardContent className={this.props.classes.cardContent} >
                                                <Typography><b>Name:</b> {volunteer.name} </Typography><br />
                                                <Typography><b>Phone:</b> {formatPhoneNumber(volunteer.phone_number)} </Typography><br />
                                                <Typography><b>Date/time:</b> {moment(volunteer.date).format('MM[/]DD[/]YYYY')} from {moment(volunteer.start_time, 'hh:mm').format('LT')} - {moment(volunteer.end_time, 'hh:mm').format('LT')}</Typography><br />

                                            </CardContent>
                                        )
                                    })}</> : <span></span>}
                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <CardContent>
                            <Button className={this.props.classes.backButton} variant="contained"
                                onClick={this.handleBackButton} >back</Button>
                            <Button className={this.props.classes.doneButton} variant="contained"
                                onClick={this.handleDoneButton} >Done</Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        event: reduxStore.event.eventDetails,
        user: reduxStore.user,
        role: reduxStore.volunteer.specificRole,
        saved: reduxStore.volunteer.previousSignUps,
        signedup: reduxStore.volunteer.signedUpVolunteers,
        nonprofit: reduxStore.nonprofit.nonprofit,
    }
}



export default withStyles(styles)(connect(mapStateToProps)(VolunteerSignup));