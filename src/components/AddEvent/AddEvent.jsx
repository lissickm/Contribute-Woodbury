import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, Grid, InputLabel, MenuItem, FormControlLabel, Checkbox, FormControl, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
import moment from 'moment';


//MATERAIL UI STYLES;
const styles = theme => ({
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    submitButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 130px 0px 0px'
    },
    dropdownBox: {
        width: '500px'
    },
    checkbox: {
        margin: '0px 0px 10px 0px',
    },
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '400px'
    },
    dateFields: {
        margin: '10px 10px 10px 30px',
        width: '40%'
    },
    description: {
        margin: '10px 10px 10px 30px',
        width: '1030px'
    },
    times: {
        margin: '10px 10px 10px 30px',
        width: '40%'
    },
    uploadFile: {
        height: '300px'
    },
    uploadButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '20px 10px 0px 10px'
    },
    regButtons: {
        margin: '5px'
    },
    logoTextField: {
        margin: '10px 10px 10px 30px',
        width: '300px'
    },

})


class AddEvent extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_PAST_EVENTS',
            payload: +(this.props.match.params.id)
        })
    }
    //UPDATE IMAGE UPLOAD URL IN TEXTFIELD/INPUT;
    componentDidUpdate(prevProps) {
        if (this.props.upload !== prevProps.upload) {
            this.setState({
                event_url: this.props.upload.url
            })
        }
    }

    state = {
        name: '',
        non_profit_id: +(this.props.match.params.id),
        description: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        event_url: '',
        past_event_id: '',
        volunteers_needed: true,
        uploadFile: '',
        uploadButton: false
    }

    //SET STATE FOR INPUT CHANGES;
    handleChange = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        })
    }

    //SET STATE FOR 'VOLUNTEERS NEEDED' CHECKBOX;
    handleVolunteerChange = () => {
        if (this.state.volunteers_needed === true) {
            this.setState({
                volunteers_needed: false,
            })
        } else {
            this.setState({
                volunteers_needed: true
            })
        }
    }

    //BACK BUTTON CLICKED AND ALERT OPTIONS AND PUSH TO CORRECT PAGE VIEW;
    handleBackButton = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "The event has not been saved.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.value) {
                this.props.history.push(`/organizationHome/${id}`)
            }
        })
    }

    //FORM WAS SUBMITTED; DISPATCH STATE TO REDUX AND SERVER;
    handleSubmitButton = () => {
        //RETURN ERROR IF START DATE DOES NOT OCCUR BEFORE END DATE;
        if (moment(this.state.end_date).format('YYYYMMDD') < moment(this.state.start_date).format('YYYYMMDD')) {
            this.props.dispatch({ type: 'DATE_ERROR' });
            return false;
        } else if (this.state.name && this.state.description && this.state.start_date && this.state.end_date && this.state.start_time && this.state.end_time
            && this.state.address && this.state.city && this.state.state && this.state.zip_code) {
            //IF THIS IS A BRAND NEW EVENT DISPATCH STATE; POSTS IN SERVER;
            if (!this.state.past_event_id) {
                this.props.dispatch({
                    type: 'ADD_EVENT',
                    payload: this.state,
                    history: this.props.history
                })
            } else {
                //IF THIS IS AN OLD EVENT BEING USED DISPATCH WITH DIFFERENT TYPE; POSTS THEN DELETES IN SERVER;
                this.props.dispatch({
                    type: 'ADD_PAST_EVENT',
                    payload: this.state,
                    history: this.props.history
                })
            }
        } else {
            this.props.dispatch({ type: 'REQUIRED_ERROR' });
            return false;
        }
        Swal.fire({
            title: 'Success!',
            text: 'Your event was submitted.',
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        })
    }

    // SET STATE FOR SELECTED PAST EVENT;
    handleChangeFor = (event) => {
        this.setState({
            name: event.target.value.name,
            non_profit_id: this.props.match.params.id,
            description: event.target.value.description,
            address: event.target.value.address,
            city: event.target.value.city,
            state: event.target.value.state,
            zip_code: event.target.value.zip_code,
            start_time: event.target.value.start_time,
            end_time: event.target.value.end_time,
            event_url: event.target.value.event_url,
            past_event_id: event.target.value.id
        })
    }

    //SET STATE FOR SELECTED FILE TO UPLOAD;
    handleFileSelection = (event) => {
        let file = event.target.files[0]
        this.setState({
            uploadFile: file
        })
    }

    //DISPATCH THE UPLOADED FILE/IMAGE TO REDUX AND SERVER THEN CLOUDINARY; TOGGLE UPLOAD BUTTON TO FALSE;
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

    //TOGGLE UPLOAD BUTTON TO TRUE; DISPLAY UPLOAD OPTIONS;
    handleUploadButton = () => {
        this.setState({
            uploadButton: true
        })
    }

    //TOGGLE UPLOAD BUTTON TO FALSE; DISPLAY INPUT FIELDS
    handleCancelUpload = () => {
        this.setState({
            uploadButton: false
        })
    }

    render() {


        return (

            <div className={this.props.classes.rootDiv}>
                <h1>Add Event</h1>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CardContent>
                            <h2>Advertise your upcoming event</h2>
                            <p>Please complete the required fields to add your event. <br />
                                Select from the dropdown list to reuse information from a previous event. <br />
                                Leave the "Volunteers Needed" checkbox unchecked if you do not want to add volunteer opportunities at this time for the event.
                            </p>
                            <FormControl variant="filled">
                                <InputLabel >
                                    Re-Use previous event
                                </InputLabel>
                                <Select
                                    className={this.props.classes.dropdownBox}
                                    onChange={(event) => this.handleChangeFor(event)}
                                    value={this.state.name}>
                                    <MenuItem value={this.state.name}>
                                        <em>{this.state.past_event_id ? this.state.name : 'Re-Use previous event'} </em>
                                    </MenuItem>
                                    {this.props.pastEvents.map(each => (
                                        <MenuItem key={each.id} value={each} >{each.name}</MenuItem>
                                    ))}
                                </Select>

                                <FormControlLabel
                                    className={this.props.classes.checkbox}
                                    control={
                                        <Checkbox
                                            defaultChecked
                                            onChange={this.handleVolunteerChange}
                                            color="primary" />
                                    }
                                    label="Volunteers Needed"
                                />

                                <TextField className={this.props.classes.textFields} type="text" label="Enter the event Name" variant="outlined" required={true}
                                    value={this.state.name} onChange={(event) => this.handleChange('name', event)} />

                                <TextField className={this.props.classes.description} type="text"
                                    placeholder="Enter the event description and any links where tickets can be purchased if required to attend"
                                    label="description" required={true}
                                    variant="outlined" multiline rows="4"
                                    value={this.state.description} onChange={(event) => this.handleChange('description', event)} />
                            </FormControl>
                        </CardContent>
                    </Grid>
                </Grid>
                {this.props.formError &&
                    <h2
                        className="alert"
                        role="alert">
                        {this.props.formError}
                    </h2>}

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <CardContent>

                            <h2>Date and Time:</h2>
                            <TextField className={this.props.classes.dateFields} type="date" placeholder="Start" required={true}
                                variant="outlined" value={this.state.start_date} onChange={(event) => this.handleChange('start_date', event)} />
                            <TextField className={this.props.classes.dateFields} type="date" placeholder="End" variant="outlined"
                                value={this.state.end_date} onChange={(event) => this.handleChange('end_date', event)} />
                            <br />

                            <TextField className={this.props.classes.times} type="time" placeholder="Start Time" required={true}
                                variant="outlined" value={this.state.start_time} onChange={(event) => this.handleChange('start_time', event)} />
                            <TextField className={this.props.classes.times} type="time" placeholder="End Time" required={true}
                                variant="outlined" value={this.state.end_time} onChange={(event) => this.handleChange('end_time', event)} />
                            <br />

                            <br />
                            {this.state.uploadButton ?
                                <div className={this.props.classes.textFields} >
                                    <input type="file" name="file" onChange={this.handleFileSelection} />
                                    <button className={this.props.classes.regButtons} onClick={this.handleFileUpload}>Upload</button>
                                    <button className={this.props.classes.regButtons} onClick={this.handleCancelUpload} >Cancel</button>
                                </div>
                                :
                                <>
                                    <TextField className={this.props.classes.logoTextField} type="text" placeholder="Image URL here or upload an image" label="image"
                                        value={this.state.event_url} variant="outlined" onChange={(event) => { this.handleChange('event_url', event) }} />
                                    <Button className={this.props.classes.uploadButton}
                                        onClick={this.handleUploadButton} >Upload</Button>
                                </>

                            }
                            <br />

                        </CardContent>
                    </Grid>

                    <Grid item xs={6}>
                        <CardContent>
                            <h2>Location:</h2>
                            <TextField className={this.props.classes.textFields} type="text" label="Address" variant="outlined" required={true}
                                value={this.state.address} onChange={(event) => this.handleChange('address', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="City" variant="outlined" required={true}
                                value={this.state.city} onChange={(event) => this.handleChange('city', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="State" variant="outlined" required={true}
                                value={this.state.state} onChange={(event) => this.handleChange('state', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="Zip Code" variant="outlined" required={true}
                                value={this.state.zip_code} onChange={(event) => this.handleChange('zip_code', event)} />
                            <br />

                        </CardContent>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Button className={this.props.classes.backButton} variant="contained"
                                onClick={() => this.handleBackButton(this.props.match.params.id)} >Back</Button>
                            <Button className={this.props.classes.submitButton} variant="contained"
                                onClick={this.handleSubmitButton} >Submit</Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        nonprofit: reduxStore.nonprofit.nonprofit,
        pastEvents: reduxStore.nonprofit.nonprofitPastEvents,
        formError: reduxStore.errors.formMessage,
        upload: reduxStore.upload.uploadedImage
    }
}


export default withStyles(styles)(connect(mapStateToProps)(AddEvent));