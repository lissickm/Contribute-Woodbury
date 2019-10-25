import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, CardContent, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
import moment from 'moment';

//MATERAIL UI STYLES;
const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    heading: {
        color: '#714723'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '500px'
    },
    times: {
        margin: '10px 10px 10px 30px',
    },
    addRolesButton: {
        color: 'white',
        backgroundColor: '#457736',
        float: 'right',
        margin: '20px 690px 0px 0px'
    },
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    doneButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 130px 0px 0px'
    },
    removeButton: {
        color: 'white',
        backgroundColor: '#999898',
        margin: '0px 0px 0px 30px',
    },
    displayRoles: {
        margin: '10px 10px 10px 30px'
    }
})



class AddVolunteerRoles extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_VOLUNTEER_ROLES',
            payload: this.props.match.params.id
        });
    }

    state = {
        name: '',
        description: '',
        number_needed: '',
        start_time: '',
        end_time: '',
        date: '',
        event_id: this.props.match.params.id,
    }

    //SET STATE FOR INPUT CHANGES;
    handleChange = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    //ONCLICK DISPATCH STATE THEN CLEAR STATE;
    handleAddRolesButton = () => {
        if (this.state.name && this.state.description && this.state.number_needed && this.state.start_time && this.state.end_time
            && this.state.date) {
            this.props.dispatch({
                type: 'ADD_VOLUNTEERS',
                payload: this.state
            })
            this.setState({
                name: '',
                description: '',
                number_needed: '',
                start_time: '',
                end_time: '',
                date: ''
            })
        } else {
            this.props.dispatch({ type: 'REQUIRED_ERROR' })
            return false;
        }
    }


    //ONCLICK ALERT WITH WARNING THEN PUSH TO CORRECT URL;
    handleBackButton = () => {
        Swal.fire({
            text: "Only your saved roles have been saved. Do you wish to go back?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.value) {
                this.props.history.push(`/editEvent/${this.props.match.params.id}`);
            }
        })
    }

    //ONCLICK ALERT THEN PUSH TO EVENT DETAILS URL;
    handleDoneButton = () => {
        Swal.fire({
            title: 'Success!',
            text: `You're done!`,
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        })
        this.props.history.push(`/eventDetails/${this.props.match.params.id}`)
    }

    //ONCLICK ALERT THEN DISPATCH AND DELETE THE ROLE TO REMOVE FROM SERVER
    handleRemoveRole = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This role will be deleted forever.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_ROLE',
                    payload: { role_id: id, event_id: this.props.match.params.id }
                })
            }
        })
    }


    render() {


        return (
            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >
                    <span >Add Volunteer</span>
                    <span > Roles</span></h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CardContent>
                            <p>Please enter the required information for each volunteer role for your event. <br />
                                Add as many roles as you would like. <br />
                                The roles will be displayed on your event page.
                                </p>
                        </CardContent>
                    </Grid>
                    {this.props.reduxStore.errors.formMessage &&
                        <h2
                            className="alert"
                            role="alert">
                            {this.props.reduxStore.errors.formMessage}
                        </h2>}
                    <Grid item xs={12}>
                        <CardContent>
                            <h2 className={this.props.classes.heading} >What do you need volunteers to help with?</h2>
                            <TextField className={this.props.classes.textFields} type="text" label="Role" variant="outlined" required={true}
                                value={this.state.name} onChange={(event) => this.handleChange('name', event)} />
                            <TextField className={this.props.classes.textFields} type="date" variant="outlined" required={true}
                                value={this.state.date} onChange={(event) => this.handleChange('date', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="Description" variant="outlined" required={true} multiline rows="4"
                                value={this.state.description} onChange={(event) => this.handleChange('description', event)} />
                            <TextField className={this.props.classes.textFields} type="number" label="Number of volunteers needed" required={true} variant="outlined"
                                value={this.state.number_needed} onChange={(event) => this.handleChange('number_needed', event)} />
                            <br />
                            <TextField className={this.props.classes.times} type="time" variant="outlined" required={true}
                                value={this.state.start_time} onChange={(event) => this.handleChange('start_time', event)} />
                            <TextField className={this.props.classes.times} type="time" variant="outlined" required={true}
                                value={this.state.end_time} onChange={(event) => this.handleChange('end_time', event)} />
                            <Button className={this.props.classes.addRolesButton} variant="contained" size="small"
                                onClick={this.handleAddRolesButton} >Add role(s)</Button>
                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>
                        <CardContent className={this.props.classes.displayRoles} >

                            <h3>Current Volunteer Roles:</h3>

                            {this.props.reduxStore.volunteer.volunteerRoleList.map(roleInfo => (
                                <>
                                    <CardContent>
                                        <span><b>Role: </b>{roleInfo.name}</span><br />
                                        <span><b>Description: </b>{roleInfo.description}</span><br />
                                        <span><b>Volunteers needed: </b>{roleInfo.number_needed}</span><br />
                                        <span><b>Date: </b>{moment(roleInfo.date).format('MMM Do YYYY')}</span><br />
                                        <span><b>Time: </b>{roleInfo.start_time} - {roleInfo.end_time} </span><br />
                                        <Button className={this.props.classes.removeButton} onClick={() => this.handleRemoveRole(roleInfo.id)} >Remove</Button>
                                    </CardContent>
                                </>
                            ))}

                        </CardContent>
                    </Grid>

                    <Grid item xs={12}>

                        <CardContent>
                            <Button className={this.props.classes.backButton} variant="contained"
                                onClick={this.handleBackButton} >Back</Button>
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
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(AddVolunteerRoles));