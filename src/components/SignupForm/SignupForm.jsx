import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

//MATERIAL UI STYLES;
const styles = theme => ({
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '300px'
    },
    messageInput: {
        margin: '10px 10px 10px 30px',
        width: '645px'
    },
    saveButton: {
        color: 'white',
        backgroundColor: '#714723',
        margin: '10px 10px 10px 30px',
    },
    stateZipPhone: {
        margin: '10px 0px 10px 30px'
    },
    card: {
        width: '900px',
    }
})

class SignupForm extends Component {
        
    state = {
        name: '',
        role_id: this.props.roleId,
        start_time: '', 
        end_time: '',
        comments: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
    }


    //SET STATE WITH VOLUNTEER INFORMATION
    handleChange = (propertyName, event) => {
        this.setState ({
            ...this.state,
            [propertyName]: event.target.value,
            start_time: this.props.role.start_time,
            end_time: this.props.role.end_time 
        })
    }

    //ALERT AND DISPATCH STATE WITH VOLUNTEER INFORMATION TO SAGA/SERVER POST;
    handleAddVolunteer = (id) => {
        this.props.dispatch({
            type: 'SAVE_VOLUNTEER',
            payload: this.state
        })
        // CLEAR FIELDS
        this.setState ({
            name: '',
            role_id: this.props.roleId,
            start_time: this.props.role.start_time,
            end_time: this.props.role.end_time,
            comments: '',
            email: '',
            phone_number: '',
            address: '',
            city: '',
            state: '',
            zip_code: ''
        })
        Swal.fire({
            title: 'Success!',
            text: `We've sent your information to the organization. Please reach out to the organization if you have additional questions.`,
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        })
    }


    render () {

        return (

            <div>
                <h3 onClick={()=>this.demoVolunteer1()}>Sign me up!</h3>
                <Card className={this.props.classes.card} >
                <CardContent>
                    <TextField className={this.props.classes.textFields} type="text" placeholder="Full Name" variant="outlined" label="Full Name"
                                value={this.state.name} onChange={(event) => this.handleChange('name', event)} />
                    <TextField className={this.props.classes.textFields} type="text" placeholder="email" variant="outlined" label="email" 
                        value={this.state.email} onChange={(event) => this.handleChange('email', event)} />
                    <br />
                    <TextField className={this.props.classes.textFields} type="text" placeholder="address" variant="outlined" label="address"
                        value={this.state.address} onChange={(event) => this.handleChange('address', event)} />
                    <TextField className={this.props.classes.textFields} type="text" placeholder="city" variant="outlined" label="city" 
                        value={this.state.city} onChange={(event) => this.handleChange('city', event)} />
                    <br />
                    <TextField className={this.props.classes.stateZipPhone} type="text" placeholder="state" variant="outlined" label="state"
                        value={this.state.state} onChange={(event) => this.handleChange('state', event)} />
                    <TextField className={this.props.classes.stateZipPhone} type="text" placeholder="zipcode" variant="outlined" label="zip code"
                        value={this.state.zip_code} onChange={(event) => this.handleChange('zip_code', event)}/>
                    {/* <br /> */}
                    {/* <TextField className={this.props.classes.stateZipPhone} type="text" placeholder="phone number" variant="outlined" label="phone number"
                        value={this.state.phone_number} onChange={(event) => this.handleChange('phone_number', event)} /> */}
                    <PhoneInput autoComplete country='US' style={{maxWidth: '250px'}}
                        placeholder="Enter phone number"
                        value={this.state.phone_number}
                        onChange={value => this.setState({ ...this.state, phone_number: value })} />
                    <br />
                    <TextField className={this.props.classes.messageInput} type="text"
                        placeholder="Have a question or comment? Let the organization know by leaving a message here!"
                        variant="outlined" label="Questions/Comments?" multiline rows={4}
                        value={this.state.comments} onChange={(event) => this.handleChange('comments', event)} /><br />
                        <h4 onClick={() => this.demoVolunteer2()}>Thank you for your help!</h4>
                    <Button variant="contained" className={this.props.classes.saveButton}
                            onClick={this.handleAddVolunteer} >Sign Up!</Button>
                    
                </CardContent>
                </Card>

            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        role: reduxStore.volunteer.specificRole
    }
}


export default withStyles(styles) (connect(mapStateToProps) (SignupForm));