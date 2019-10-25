import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

//MATERIAL UI STYLES;
const styles = theme => ({
    nonprofitInfo: {
        display: 'inline-flex',
        padding: '20px',
    },
    logo: {
        height: '80px',
        margin: '10px'
    },
})


class NonprofitDetails extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.role.event_id
        })
    }


    render () {



        return (
            <>

                        <div className={this.props.classes.nonprofitInfo} >
                            <img className={this.props.classes.logo} src={this.props.nonprofit[0].logo} alt="nonprofit logo" />
                    <Typography>
                        {this.props.nonprofit[0] && this.props.nonprofit[0].nonprofit_name}<br />
                        {this.props.nonprofit[0] && this.props.nonprofit[0].address}<br />
                        {this.props.nonprofit[0] && this.props.nonprofit[0].city},
                        {this.props.nonprofit[0] && this.props.nonprofit[0].state}
                        {this.props.nonprofit[0] && this.props.nonprofit[0].zip_code}<br />
                    </Typography>
                        </div><br/>
                        
                        

            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        nonprofit: reduxStore.nonprofit.nonprofit,
        role: reduxStore.volunteer.specificRole,
        user: reduxStore.user
    }
}

export default withStyles(styles) (connect(mapStateToProps) (NonprofitDetails));