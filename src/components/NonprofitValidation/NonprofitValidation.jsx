import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';

//MATERIAL UI STYLES;
const styles = theme => ({
    card: {
        width: '400px',
        height: '400px',
        margin: '40px 20px 10px 100px',
        overflowY: 'scroll',
    },
    approveButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '40px 10px 10px 10px'
    },
    declineButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '40px 10px 10px 10px'
    },
    directoryButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '10px 150px 10px 10px'
    },
    heading: {
        margin: '40px 10px 10px 40px',
        color: '#714723'
    }
})

class NonprofitValidation extends Component {

    componentDidMount() {
        this.handleGetRequests();
    }

    //ON MOUNT GETS ALL NONPROFIT REQUESTS TO BE APPROVED;
    handleGetRequests = ( ) => {
        this.props.dispatch({
            type: 'GET_NONPROFIT_REQUESTS'
        })
    }

    //ONCLICK PUSH TO DIRECTORY URL;
    handleDirectoryButton = () => {
        this.props.history.push('/directory');
    }

    //ONCLICK ALERT USER AND DISPATCH STATE TO SAGA TO SERVER TO PUT;
    handleApproveButton = (id) => {
        Swal.fire({
            title: 'Success!',
            text: 'Nonprofit approved.',
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'APPROVE_NONPROFIT',
                    payload: id
                })
                
            }
        })
    }

    //ONCLICK ALERT AND DISPATCH ID TO SAGA/SERVER FOR DELETE;
    handleDeclineButton = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Declining will delete the nonprofit.",
            type: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DECLINE_NONPROFIT',
                    payload: id
                });
            }
        })
    }


    render () {

        return (
            <div>
                <h1 className={this.props.classes.heading}>Nonprofit Validation</h1>
                
                <Button className={this.props.classes.directoryButton} onClick={this.handleDirectoryButton} variant="contained">Directory</Button>
                
                <Grid container spacing={3}>
                       
                    {this.props.admin[0] ? this.props.admin.map(nonprofit => (
                     
                        <Card className={this.props.classes.card}>
                            <CardContent key={nonprofit.id}>
                                <b>Nonprofit:</b> {nonprofit.name}
                                <br/>
                                <b>Description:</b> {nonprofit.description}
                                <br />
                                <b>Contact </b> {nonprofit.contact_name}
                                <br/>
                                <b>Email:</b> {nonprofit.contact_email}
                                <br />
                                <b>Address: </b> {nonprofit.address}
                                <br />
                                <b>City:</b> {nonprofit.city}
                                <br />
                                <b>State: </b> {nonprofit.state}
                                <br />
                                <b>Zip Code:</b> {nonprofit.zip_code}
                                <br/>
                                    <Button className={this.props.classes.approveButton} variant="contained"
                                        onClick={(event) => this.handleApproveButton(nonprofit.id)} >Approve</Button>
                                    <Button className={this.props.classes.declineButton} variant="contained"
                                        onClick={(event) => this.handleDeclineButton(nonprofit.id)} >Decline</Button>
                            </CardContent>
                            
                        </Card>
                    ))
                :
                        <h3 className="validationText">No new nonprofits at this time.</h3>
                }
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        admin: reduxStore.admin.admin,
    }
}


export default withStyles(styles)(connect(mapStateToProps) (NonprofitValidation));