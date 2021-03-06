import React, { Component, Fragment } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import friends from "../../images/users.svg";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([
            authService.isAuthenticated(),
            authService.getUser(),
        ]);
        this.setState({
            isAuthenticated,
            userName: user && user.name,
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = {
            pathname: `${ApplicationPaths.LogOut}`,
            state: { local: true },
            };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (
            <Fragment className="loginSignUpBlock">
                <div className="row" style={{float: "right"}}>
                <NavItem>
                <NavLink tag={Link} className="navHeader" to={profilePath}>
                Hello {userName}
                </NavLink>
            </NavItem>
             <NavItem>
                <NavLink tag={Link} className="navHeader" to='/hosted-events'>
                Hosted Events
                </NavLink>
                </NavItem> 
                 <NavItem>
                <NavLink tag={Link} className="navHeader" to={logoutPath}>
                Logout
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={Link} to="/friend-request" className="friends">
                    <img id="friends" className="" alt="friends" src={friends} />
                </NavLink>
                </NavItem> 
                </div>
            </Fragment>
        );
    }

    anonymousView(registerPath, loginPath) {
        return (
            <Fragment>
                <NavItem className="navItem">
                    <NavLink tag={Link} className="navHeader" to={registerPath}>
                        Sign up
                    </NavLink>
                </NavItem>
                <NavItem className="navItem">
                    <NavLink tag={Link} className="navHeader" to={loginPath}>
                        Login
                    </NavLink>
                </NavItem>
            </Fragment>
        );
    }
}
