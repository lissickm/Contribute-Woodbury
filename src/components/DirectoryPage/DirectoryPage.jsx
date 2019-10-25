import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Swal from 'sweetalert2';

import{ Button, Divider, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { AssistantPhoto } from '@material-ui/icons';


//MATERIAL UI TABLE STYLES
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#878787',
        color: 'white',
        fontSize: 24
    },
    body: {
        fontSize: 18,
    }
}))(TableCell);

//OTHER MATERIAL UI STYLES
const styles = theme => ({
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    backButtonText: {
        color: 'white',
        textDecoration: 'none',
    },
    root: {
        maxHeight: '1000px',
        width: '90%',
        marginTop: theme.spacing(3),
        overflowY: 'scroll',
        margin: 'auto',
    },
    search: {
        float: 'right',
        width: '25%',
        margin: theme.spacing(3),
    },
    rows: {
        height: '100px',
    },
    flag: {
        color: 'red'
    },
    heading: {
        color: '#714723'
    },
    rootDiv: {
        backgroundColor: '#f1f5f9',
        padding: '30px',
        textAlign: 'center',
    },

})


class DirectoryPage extends Component {

    state = {
        searchbar: ''
    }

    componentDidMount() {
        this.getOrganizationDetails();
    }

    //GETS THE DIRECTORY FOR ADMIN VIEW;
    componentDidUpdate(prevProps) {
        if (this.props.reduxStore.user.name === 'Admin' && prevProps.reduxStore.user.name !== this.props.reduxStore.user.name) {
            this.props.dispatch({
                type: 'GET_ADMIN_DIRECTORY'
            });
        }
    }

    //GETS ALL ORGANIZATIONS IN DATABASE TO DISPLAY ON DOM
    getOrganizationDetails = () => {
        this.props.dispatch({
            type: 'GET_DIRECTORY'
        });
        this.props.dispatch({
            type: 'GET_ADMIN_DIRECTORY'
        });
    }

    //ONCLICK PUSH TO NONPROFIT HOME PAGE
    handleVolunteerButton = (id) => {
        this.props.history.push(`/organizationhome/${id}`)
    }

    //SEARCH BAR; SEARCH FOR NONPROFITS IN DATABASE
    searchbarInput = (event) => {
        this.setState({
            searchbar: event.target.value
        });
    }

    //ONCLICK DISPATCH SEARCH QUERY;
    searchSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH', payload: this.state.searchbar });
    }

    //ONCLICK ALERT USER AND DISPATCH ID TO BE DELETED FROM DATABASE;
    handleDelete = (id, orgName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${orgName}. Do you wish to continue?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'DECLINE_NONPROFIT', payload: id });
            }
        });
    }

    render() {

        const nonprofitName = this.props.reduxStore.user.name;
        let sixMonthsBeforeTodaysDate = moment().subtract(6, "months").format("YYYY-MM-DD");

        return (
            <div className={this.props.classes.rootDiv} >
                <h1 className={this.props.classes.heading} >
                    Directory
                </h1>

                <Paper className={this.props.classes.root}>

                    <div className={this.props.classes.search}>
                        <Paper elevation={1}>
                            <form onSubmit={this.searchSubmit}>
                                <IconButton aria-label="Search" onClick={this.searchSubmit} >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase placeholder="Search Nonprofits" onChange={this.searchbarInput} value={this.state.searchbar} />
                            </form>
                            <Divider />
                        </Paper>
                    </div>


                    <Table hover="true" size="medium">

                        {/* conditional rendering of the COLUMN HEADINGS based on the user being an admin or not */}
                        {
                            nonprofitName === 'Admin' ?
                                <TableHead>
                                    <TableRow className={this.props.classes.rows}>
                                        <CustomTableCell align="left">Image</CustomTableCell>
                                        <CustomTableCell align="left">Agency</CustomTableCell>
                                        <CustomTableCell align="left">Category</CustomTableCell>
                                        <CustomTableCell align="left">Flagged</CustomTableCell>
                                        <CustomTableCell align="center"></CustomTableCell>
                                    </TableRow>
                                </TableHead>

                                :

                                <TableHead>
                                    <TableRow className={this.props.classes.rows}>
                                        <CustomTableCell align="left">Image</CustomTableCell>
                                        <CustomTableCell align="left">Agency</CustomTableCell>
                                        <CustomTableCell align="left">Category</CustomTableCell>
                                        <CustomTableCell align="left">Volunteer Opportunities</CustomTableCell>
                                        <CustomTableCell align="center">Website Link</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                        }

                        {/* conditional rendering of the TABLE ROWS based on the user being an admin or not */}
                        {
                            nonprofitName === 'Admin' ?
                                <TableBody>
                                    {this.props.reduxStore.admin.adminDirectory &&
                                        this.props.reduxStore.admin.adminDirectory.map(nonprofit => {
                                            let lastConfirmed = moment(nonprofit.last_confirmed).format("YYYY-MM-DD");
                                            if (nonprofit.name !== 'Admin') {
                                                return (
                                                    <TableRow key={nonprofit.id} className={this.props.classes.rows} hover={true}>
                                                        <CustomTableCell align="left"><img src={nonprofit.logo} alt="Nonprofit Logo" width="300" height="200" /></CustomTableCell>
                                                        <CustomTableCell align="left">{nonprofit.name}<br />
                                                            {nonprofit.address}<br />
                                                            {nonprofit.city},
                                                              {nonprofit.state}
                                                            {nonprofit.zip_code}  </CustomTableCell>
                                                        <CustomTableCell align="left" >{nonprofit.category_name}</CustomTableCell>

                                                        <CustomTableCell align="left">
                                                            {lastConfirmed < sixMonthsBeforeTodaysDate &&
                                                                <div>
                                                                    {/* conditionally show this if date of lastConfirmed is <6months */}
                                                                    <AssistantPhoto fontSize="large" className={this.props.classes.flag} />
                                                                </div>
                                                            }
                                                        </CustomTableCell>

                                                        <CustomTableCell align="center">
                                                            <Button className={this.props.classes.backButton} variant="contained"
                                                                onClick={() => { this.handleDelete(nonprofit.id, nonprofit.name) }}> Delete
                                                        </Button>
                                                        </CustomTableCell>
                                                    </TableRow>
                                                )
                                            } else { return false; }
                                        })}
                                </TableBody>

                                :

                                <TableBody>

                                    {this.props.reduxStore.directory.map((nonprofit) => {
                                        if (nonprofit.name !== 'Admin') {
                                            return (
                                                <TableRow key={nonprofit.id} className={this.props.classes.rows} hover={true}
                                                    onClick={() => this.handleVolunteerButton(nonprofit.id)}>
                                                    <CustomTableCell align="left"><img src={nonprofit.logo} alt="Nonprofit Logo" width="300" height="200" /></CustomTableCell>
                                                    <CustomTableCell align="left">{nonprofit.name}<br />
                                                        {nonprofit.address}<br />
                                                        {nonprofit.city},&nbsp;{nonprofit.state}&nbsp;
                                                        {nonprofit.zip_code}  </CustomTableCell>
                                                    <CustomTableCell align="left">{nonprofit.category_name}</CustomTableCell>
                                                    <CustomTableCell align="left"><Button className={this.props.classes.backButton} variant="contained"
                                                        onClick={() => this.handleVolunteerButton(nonprofit.id)} >Volunteer</Button></CustomTableCell>
                                                    <CustomTableCell align="center"><Button className={this.props.classes.backButton} variant="contained">
                                                        <a className={this.props.classes.backButtonText} href={nonprofit.website} target="_blank" rel="noopener noreferrer">
                                                            Website
                                                        </a></Button></CustomTableCell>
                                                </TableRow>
                                            )
                                        } else { return false; }
                                    })}

                                </TableBody>
                        }
                    </Table>
                </Paper>
            </div >
        )


    }


}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default withStyles(styles)(connect(mapStateToProps)(DirectoryPage));
