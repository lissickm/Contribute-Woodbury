import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import { withStyles } from '@material-ui/styles';
import { Button, Link, CardContent, Grid, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import './OrganizationHome.css';


//MATERIAL UI TABLE STYLES;
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#878787',
        color: 'white',
        fontSize: 24,
    },
    body: {
        fontSize: 20,
    }
}))(TableCell);

//MATERIAL UI STYLES;
const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    root: {
        width: '100%',
        overfloxX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        color: 'white',
        backgroundColor: '#457736'
    }
})

class OrganizationHome extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_NONPROFIT',
            payload: this.props.match.params.id
        })
        this.props.dispatch({
            type: 'GET_CATEGORIES',
        })
    }

    //ONCLICK PUSH TO EVENT DETAILS URL;
    handleVolunteerClick = (id) => {
        this.props.history.push(`/eventDetails/${id}`);
    }

    //ONCLICK PUSH TO EDIT NONPROFIT URL;
    handleEditDetails = () => {
        let id = this.props.match.params.id
        this.props.history.push(`/editNonprofit/${id}`)
    }

    //ONCLICK PUSH TO VOLUNTEERS LIST URL;
    handleVolunteerListClick = (id) => {
        this.props.history.push(`/volunteerList/${id}`)
    }

    //ONCLICK PUSH TO EDIT EVENT URL;
    handleEditClick = (id) => {
        this.props.history.push(`/editEvent/${id}`)
    }

    //ONCLICK CHECK TO SEE IF USER IS APPROVED AND ALERT OR PUSH TO ADD EVENT URL;
    handleAddEvent = () => {
        if (this.props.user.is_approved) {
            let id = this.props.match.params.id
            this.props.history.push(`/addEvent/${id}`)
        } else {
            Swal.fire({
                title: 'Oops!',
                text: 'Contribute Woodbury has recieved your request to join and will get back to you upon acceptance. Please wait for the email signalling your approval before trying to add any events.',
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        }
    }

    //LOOP THROUGH THE NONPROFIT CATEGORIES TO GET THE CATEGORY NAME WITH CORRESPONDING ID;
    getCategory = (id) => { 
        for (let cat of this.props.categories) {
            if(cat.id === id) {
                return cat.name
            } 
        }
    }

    render() {
        let nonprofitInfo = this.props.nonprofit[0] || 'a';
        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        
                            <h1 className="name">{this.props.nonprofit[0] && this.props.nonprofit[0].nonprofit_name}</h1>
                            <address className="address">
                            {this.props.nonprofit[0] && this.props.nonprofit[0].address}<br></br>
                            {this.props.nonprofit[0] && this.props.nonprofit[0].city}&nbsp;
                            {this.props.nonprofit[0] && this.props.nonprofit[0].state}&nbsp;
                            {this.props.nonprofit[0] && this.props.nonprofit[0].zip_code}
                            </address><br></br>
                            {
                            nonprofitInfo.category_id && <div className="cat">
                                Area of service: {this.props.nonprofit[0] && this.getCategory(this.props.nonprofit[0].category_id)}
                            </div>
                            } 
                            
                    </Grid>
                    <Grid item xs={5}>
                        <CardContent>
                            <img src={this.props.nonprofit[0] && this.props.nonprofit[0].logo} alt="nonprofit logo" width="400" />
                        </CardContent>
                    </Grid>
                </Grid>
                

                <table>
                <tbody>
                <tr>
                <td><Typography><b>Contact: </b></Typography> </td>
                <td><Typography>{this.props.nonprofit[0] && this.props.nonprofit[0].contact_name}</Typography></td>
                </tr>

                <tr>
                <td><Typography><b>Phone: </b></Typography> </td>
                <td><Typography>{this.props.nonprofit[0] && this.props.nonprofit[0].contact_phone}</Typography></td>
                </tr>

                <tr>
                <td><Typography><b>Email: </b></Typography> </td>
                <td><Typography>{this.props.nonprofit[0] && this.props.nonprofit[0].contact_email}</Typography></td>
                </tr>

                </tbody>
                </table>
                <footer></footer>
                {this.props.nonprofit[0] && this.props.nonprofit[0].description}<br/><br/>
                <Link variant="body1" href={this.props.nonprofit[0] && this.props.nonprofit[0].website} target="_blank" rel="noopener noreferrer">Link To Website</Link><br/>

                {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleEditDetails}>Edit Details</Button>}
                <Grid container spacing={1} justify="center">
                    <h2>Event List</h2>
                </Grid>
                <Grid container spacing={3}>
                    <Paper className={this.props.classes.root}>
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Name</CustomTableCell>
                                    <CustomTableCell align="right">Event Date</CustomTableCell>
                                    <CustomTableCell align="right">Start Time</CustomTableCell>
                                    <CustomTableCell align="right"></CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.nonprofit.map((info) => {
                                        if (moment(info.start_date).format('YYYYMMDD') > moment().format('YYYYMMDD')) {
                                            let button = '';
                                            if (info.nonprofit_name === this.props.user.name) {
                                                let vkey = `Volunteer${info.event_id}`;
                                                let ekey = `Edit${info.event_id}`;
                                                button = <>
                                                    <Button className={this.props.classes.button}
                                                        onClick={() => this.handleVolunteerListClick(info.event_id)} key={vkey}>Volunteer List
                                                </Button> &nbsp;
                                                <Button key={ekey}
                                                        className={this.props.classes.button} onClick={() => this.handleEditClick(info.event_id)}>Edit
                                                </Button>
                                                </>
                                            }
                                            if (info.event_id) {
                                                let vkey = `Volunteer${info.id}`;
                                                return (
                                                    <TableRow key={info.id}>
                                                        <CustomTableCell>{info.event_name}</CustomTableCell>
                                                        <CustomTableCell align="right">{moment(info.start_date).format("MM/DD/YYYY")}</CustomTableCell>
                                                        <CustomTableCell align="right">{moment(info.start_time, `hhmm`).format("LT")}</CustomTableCell>
                                                        <CustomTableCell align="right"><Button className={this.props.classes.button} key={vkey}
                                                            onClick={() => { this.handleVolunteerClick(info.event_id) }}>Volunteer</Button> &nbsp; {button}</CustomTableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return <TableRow><CustomTableCell>No listed events</CustomTableCell></TableRow>
                                            }
                                        } else {
                                            return false;
                                        }
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <br></br>
                <Grid container spacing={1} justify="center">
                    {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleAddEvent}>Add Event</Button>}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nonprofit: state.nonprofit.nonprofit,
        user: state.user,
        categories: state.nonprofit.categories
    }
}


export default connect(mapStateToProps)(withStyles(styles)(OrganizationHome));