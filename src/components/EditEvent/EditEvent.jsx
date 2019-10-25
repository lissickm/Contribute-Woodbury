import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import { withStyles } from '@material-ui/styles';
import { CardContent, Grid, FormControl, TextField, Button } from '@material-ui/core';

//MATERIAL UI STYLES;
const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    grid: {
        justify: 'center'
    },
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    submitButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 50px 0px 0px'
    },
    editButton: {
        color: 'white',
        backgroundColor: '#714723',
        marginLeft:'34%'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '400px',
        color: '#714723',
        fontSize: '20px'
    },
    urlField: {
        margin: '10px 10px 10px 30px',
        width: '200px',
        color: '#714723',
        fontSize: '20px'
    },
    stateZip: {
        margin: '10px 10px 10px 30px',
        width: '178px',
        color: '#714723',
        fontSize: '20px'
    },
    description: {
        margin: '10px 10px 10px 30px',
        width: '1045px'
    },
    times: {
        margin: '10px 10px 10px 30px'
    },
    dateFields: {
        margin: '10px 10px 10px 30px',
        width: '40%'
    },
    label: {
        color: '#714723',
        fontSize: '20px'
    },
    uploadButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '20px 10px 0px 10px'
    },
    regButtons: {
        margin: '5px'
    }
})

class EditEvent extends Component {

    state = {
        id: Number(this.props.match.params.id),
        uploadButton: false,
        uploadFile: '',
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: Number(this.props.match.params.id)
        })
    }

    //ON UPLOAD OF NEW IMAGE UPDATE THE INPUT FIELD WITH NEW URL;
    componentDidUpdate(prevProps) {
        if (this.props.upload !== prevProps.upload) {
            this.setState({
                event_url: this.props.upload.url
            })
        }
    }

    //SET STATE FOR INPUT CHANGES;
    handleChange = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value,
            id: this.props.match.params.id,
            non_profit_id: this.props.event[0].non_profit_id
        })
    }

    //ONCLICK ALERT THEN PUSH TO PREVIOUS URL;
    handleBackButton = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "If any changes have been made they won't be saved!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {
                this.props.history.goBack()
            }
        })
    }

    //ONCLICK RETURN ERROR IF END DATE PRECEEDS START DATE THEN DISPATCH STATE AND RETURN TO PREVIOUS PAGE URL
    handleSubmitButton = () => {
        let end_date = this.state.end_date || this.props.event[0].end_date;
        let start_date = this.state.start_date || this.props.event[0].start_date;
        if (moment(end_date).format('YYYYMMDD') < moment(start_date).format('YYYYMMDD')) {
            this.props.dispatch({ type: 'DATE_ERROR' });
            return false;
        } else {
            this.props.dispatch({
                type: 'EDIT_EVENT',
                payload: {
                    name: this.state.name || this.props.event[0].name,
                    description: this.state.description || this.props.event[0].description,
                    address: this.state.address || this.props.event[0].address,
                    city: this.state.city || this.props.event[0].city,
                    zip_code: this.state.zip_code || this.props.event[0].zip_code,
                    event_url: this.state.event_url || this.props.event[0].event_url,
                    start_date: this.state.start_date || this.props.event[0].start_date,
                    end_date: this.state.end_date || this.props.event[0].end_date,
                    states: this.state.states || this.props.event[0].state,
                    start_time: this.state.start_time || this.props.event[0].start_time,
                    end_time: this.state.end_time || this.props.event[0].end_time,
                    non_profit_id: this.props.event[0].non_profit_id,
                    id: Number(this.props.match.params.id)
                }
            });
            this.props.history.goBack()
        }
    }//end handleSubmitButton

    //ONCLICK PUSH TO EDIT VOLUNTEERS URL
    handleEditVolunteerRoles = () => {
        this.props.history.push(`/addvolunteers/${this.props.match.params.id}`)
    }

    //TOGGLES UPLOAD BUTTON TO TRUE AND DISPLAY UPLOAD OPTIONS;
    handleUploadButton = () => {
        this.setState({
            uploadButton: true
        })
    }

    //ONCLICK TOGGLES UPLOAD BUTTON TO FALSE AND DISPLAY INPUT FIELD;
    handleCancelUpload = () => {
        this.setState({
            uploadButton: false
        })
    }

    //ONCLICK SET STATE WITH SELECTED FILE TO UPLOAD
    handleFileSelection = (event) => {
        let file = event.target.files[0]
        this.setState({
            uploadFile: file
        })
    }

    //ONCLICK DISPATCH FILE TO UPLOAD AND TOGGLE UPLOAD BUTTON TO FALSE TO DISPLAY INPUT FIELD
    handleFileUpload = () => {
        const data = new FormData();
        data.append('file', this.state.uploadFile)
        this.props.dispatch({
            type: 'IMAGE_UPLOAD',
            payload: data
        })
        this.setState({
            uploadButton: false
        })
    }

    render() {
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Edit Your Event: {this.props.event.map(event => (<span>{event.name}</span>))}</h1>
                        <p>Make changes to your event here. Click submit to save the changes.</p>
                    </Grid>
                </Grid>
                {this.props.formError &&
                    <h2
                        className="alert"
                        role="alert">
                        {this.props.formError}
                    </h2>}
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <CardContent>

                            <FormControl variant="outlined">
                                {
                                    this.props.event.map((ev) => {
                                        return <>
                                            <Grid container spacing={3} justify="center">
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields} key={ev.id}>Event Name</label><br/>
                                                        <TextField
                                                            className={this.props.classes.textFields}
                                                            type="text"
                                                            label="Event name"
                                                            placeholder={ev.name}
                                                            defaultValue={ev.name}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('name', event)}
                                                        />
                                                    </CardContent>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields}>Change the event description</label><br/>
                                                        <TextField
                                                            className={this.props.classes.textFields}
                                                            type="text"
                                                            label="Event Description"
                                                            placeholder={ev.description}
                                                            defaultValue={ev.description}
                                                            variant="outlined"
                                                            multiline rows="4"
                                                            onChange={(event) => this.handleChange('description', event)}
                                                        />
                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                            

                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields}>The current start date is: {moment(ev.start_date).format("MM/DD/YYYY")}</label><br/>
                                                        <TextField
                                                            className={this.props.classes.dateFields}
                                                            type="date"
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange(('start_date'), event)}
                                                        />
                                                    </CardContent>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields}>The current end date is: {moment(ev.end_date).format("MM/DD/YYYY")}</label><br/>
                                                        <TextField
                                                            className={this.props.classes.dateFields}
                                                            type="date"
                                                            placeholder="End"
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange(('end_date'), event)}
                                                        />
                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={3} justify="center">
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        
                                                        <TextField
                                                            className={this.props.classes.times}
                                                            type="time"
                                                            placeholder="Start Time"
                                                            label="Start Time"
                                                            defaultValue={ev.start_time}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('start_time', event)}
                                                        />
                                                        
                                                        <TextField
                                                            className={this.props.classes.times}
                                                            type="time"
                                                            placeholder="End Time"
                                                            label="End Time"
                                                            defaultValue={ev.end_time}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('end_time', event)}
                                                        />
                                                    </CardContent>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields}>Address</label><br />
                                                        <TextField
                                                            className={this.props.classes.textFields}
                                                            type="text"
                                                            placeholder="Address"
                                                            label="Address"
                                                            defaultValue={ev.address}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('address', event)}
                                                        />
                                                       
                                                    </CardContent>
                                                </Grid>

                                            </Grid>
                                            <Grid container spacing={3} justify="center">
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields}>Change event image url</label><br/>
                                                        
                                                        {this.state.uploadButton ?
                                                            <div  >
                                                                <input type="file" name="file" onChange={this.handleFileSelection} />
                                                                <button className={this.props.classes.regButtons} onClick={this.handleFileUpload}>Upload</button>
                                                                <button className={this.props.classes.regButtons} onClick={this.handleCancelUpload} >Cancel</button>
                                                            </div>
                                                            :
                                                            <>
                                                                <TextField className={this.props.classes.urlField} type="text" defaultValue={ev.event_url} placeholder="Image URL" label="Image URL" variant="outlined" onChange={(event) => { this.handleChange('event_url', event) }} />
                                                                <Button className={this.props.classes.uploadButton}
                                                                    onClick={this.handleUploadButton} >Upload</Button>
                                                            </>

                                                        }
                                                        
                                                    </CardContent>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CardContent>
                                                        <label className={this.props.classes.textFields}>City</label><br/>
                                                        <TextField
                                                            className={this.props.classes.textFields}
                                                            type="text"
                                                            placeholder="City"
                                                            label="City"
                                                            defaultValue={ev.city}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('city', event)}
                                                        />
                                                        <label className={this.props.classes.textFields}>State and Zip Code</label><br />
                                                        <TextField
                                                            className={this.props.classes.stateZip}
                                                            type="text"
                                                            placeholder="State"
                                                            label="State"
                                                            defaultValue={ev.state}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('states', event)}
                                                        />
                                                        <TextField
                                                            className={this.props.classes.stateZip}
                                                            type="number"
                                                            placeholder="Zip Code"
                                                            label="Zip Code"
                                                            defaultValue={ev.zip_code}
                                                            variant="outlined"
                                                            onChange={(event) => this.handleChange('zip_code', event)}
                                                        />
                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                        </>
                                    })
                                }

                            </FormControl>
                        </CardContent>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Button className={this.props.classes.backButton} variant="contained"
                                onClick={this.handleBackButton}>Back</Button>

                            <Button className={this.props.classes.submitButton} variant="contained"
                                onClick={this.handleSubmitButton}>Submit</Button>

                            <Button className={this.props.classes.editButton} variant="contained"
                                onClick={this.handleEditVolunteerRoles}>Edit Volunteer Roles</Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event.eventDetails,
        formError: state.errors.formMessage,
        upload: state.upload.uploadedImage
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EditEvent));