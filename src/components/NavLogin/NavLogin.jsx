import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';


//MATERIAL UI STYLES
const styles = theme => ({
    loginDiv: {
        color: 'white',
    }
})

class NavLogin extends Component {
    state = {
        username: '',
        password: '',
    };

    //ONCLICK LOG IN USER WITH VERIFIED CREDENTIALS OR DISPLAY LOGIN ERROR;
    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    }

    //SETSTATE FOR INPUT CHANGES;
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                {this.props.errors.loginMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.loginMessage}
                    </h2>
                )}

                <form onSubmit={this.login}>
                    <div className={this.props.classes.loginDiv} >
                        <span>Already signed up?</span>
                        <label htmlFor="username">
   
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.handleInputChangeFor('username')}
                            />
                        </label>
            
                        <label htmlFor="password">
        
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleInputChangeFor('password')}
                            />
                        </label>
 
                        <input

                            className="log-in"
                            type="submit"
                            name="submit"
                            value="Log In"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
});

export default withStyles(styles) (connect(mapStateToProps)(NavLogin));
