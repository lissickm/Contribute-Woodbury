import React, { Component } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Button, Paper, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';
import './EventDetails.css';

//MATERIAL UI TABLE STYLES;
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#878787',
        color: 'white',
        fontSize: 24,
    },
    body: {
        fontSize: 20
    }
}))(TableCell);

//MATERIAL UI STYLES;
const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px',
        marginTop: '50px',
    },
    root: {
        width: '100%',
        overfloxX: 'auto'
    },
    table: {
        minWidth: 700,
    },
    button: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '10px'
    },
    nonprofitLogoGrid: {
        display: 'inline-flex'
    },
    image: {
        textAlign: 'center'
    }
})

class EventDetails extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.match.params.id
        })
    }

    //ONCLICK PUSH TO VOLUNTEERS SIGN UP URL;
    handleClick = (id) => {
        this.props.history.push(`/signup/${id}`)
    }

    //ONCLICK PUSH TO VOLUNTEERS LIST URL;
    handleButtonClick = () => {
        let id = this.props.match.params.id
        this.props.history.push(`/volunteerList/${id}`)
    }

    //ONCLICK PUSH TO EDIT EVENT URL;
    handleEditEvent = () => {
        let id = this.props.match.params.id
        this.props.history.push(`/editEvent/${id}`)
    }

    render() {
        let nonprofitInfo = this.props.nonprofit[0] || 'a';

        return (
            <div className={this.props.classes.rootDiv}>
                <Grid container spacing={3}>

                    <Grid className={this.props.classes.nonprofitLogoGrid} item xs={12}>

                        <CardContent>
                            <img src={this.props.nonprofit[0] && this.props.nonprofit[0].logo} alt="nonprofit logo" width="250" />
                        </CardContent>

                        <CardContent>
                            <h2 className="name">{this.props.nonprofit[0] && this.props.nonprofit[0].nonprofit_name}</h2>
                            <address className="address">
                                {this.props.nonprofit[0] && this.props.nonprofit[0].address} <br></br>
                                {this.props.nonprofit[0] && this.props.nonprofit[0].city}&nbsp;
                        {this.props.nonprofit[0] && this.props.nonprofit[0].state}&nbsp;
                        {this.props.nonprofit[0] && this.props.nonprofit[0].zip_code}
                            </address>
                        </CardContent>
                    </Grid>
                </Grid>
                <Grid containter spacing={3}>

                    <Grid className={this.props.classes.nonprofitLogoGrid} item xs={12}>


                        <Grid item xs={6}>

                            <CardContent>
                                {this.props.event.eventDetails.map(info => (
                                    <>
                                        <h2>{info.name}</h2>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><Typography><b>Date: </b></Typography> </td>
                                                    <td><Typography>{moment(info.start_date).format("MM/DD/YYYY")}</Typography></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><Typography><b>Time: </b></Typography></td>
                                                    <td><Typography>{moment(info.start_time, 'hh:mm').format('LT')} - {moment(info.end_time, 'hh:mm').format('LT')}</Typography></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><Typography><b>Location: </b></Typography></td>
                                                    <td><Typography><address>
                                                        {info.address}<br />
                                                        {info.city},&nbsp;{info.state}&nbsp;{info.zip_code}
                                                    </address></Typography></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><Typography><b>Contact: </b></Typography></td>
                                                    <td><Typography> {this.props.nonprofit[0] && this.props.nonprofit[0].contact_email} </Typography></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <footer></footer>
                                        <Typography>{info.description}</Typography>
                                    </>
                                ))}
                                {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleEditEvent}>Edit</Button>}

                            </CardContent>


                        </Grid>

                        <Grid item xs={6}>
                            <CardContent className={this.props.classes.image} >
                                {this.props.event.eventDetails.map(info => (
                                    <img src={info.event_url} alt="Event Logo" width="400" />
                                ))}
                                
                            </CardContent>
                        </Grid>



                    </Grid>
                    


                    <Grid item xs={12}>
                        <h3 className="header">Volunteer Opportunities for this event:</h3>
                        <Paper className={this.props.classes.root}>
                            <Table className={this.props.classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Name</CustomTableCell>
                                        <CustomTableCell align="right">Times</CustomTableCell>
                                        <CustomTableCell align="right">Volunteers Needed</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.volunteers.volunteerRoleList.map((person) => {
                                            return (<>
                                                <TableRow key={person.id}>
                                                    <CustomTableCell>{person.name}</CustomTableCell>
                                                    <CustomTableCell align="right">
                                                        {moment(person.start_time, "hh:mm").format('LT')} - {moment(person.end_time, "hh:mm").format('LT')}
                                                    </CustomTableCell>
                                                    <CustomTableCell align="right"><Link component="button"
                                                        variant="body2"
                                                        onClick={() => { this.handleClick(person.id) }}>Volunteers Needed({person.number_needed})
                                            </Link></CustomTableCell>
                                                </TableRow>
                                            </>)
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container justify='center'>
                    {nonprofitInfo.nonprofit_name === this.props.user.name && <Button className={this.props.classes.button} onClick={this.handleButtonClick}> Volunteer List </Button>}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        nonprofit: state.nonprofit.nonprofit,
        volunteers: state.volunteer,
        user: state.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));