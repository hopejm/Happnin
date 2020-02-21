﻿import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './UserCreation.css';
import { Button } from 'reactstrap';
import Recaptcha from 'react-recaptcha';
import $ from 'jquery';
 
//use bootstrap to make page prettier
//send email confirmation

export class UserCreation extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            user: { 
            userName: '',
            firstName : '',
            lastName : '',
            locationId : 1,
            password: '',
            email: '',
        }, 
            loading: true,
            show: false,
            isValidZip: false   
        }
        this.validateZip = this.validateZip.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            user : {
                [name] : value
            } 
        });
        console.log(this.state)
    }

    componentDidMount() {

        $(function() {
            //shows password requirements when user starts input
            $("#password").focus(function() {
                $('#passwordreq').slideDown();
            });
            $("#password").blur(function() {
                $('#passwordreq').hide();
            });

            //shows username requirements when user starts input
            $("#username").focus(function() {
                $('#usernamereq').slideDown();
            });
            $("#username").blur(function() {
                $('#usernamereq').hide();
            });

            //shows zip code requirements when user starts input
/*            $("#zip").focus(function() {
                $('#zipreq').slideDown();
            });
            $("#zip").blur(function() {
                $('#zipreq').hide();
            });*/

            //checks while user is typing to see if username requirements are being met
            $("#username").keyup(function() {
                //gets username value
                var usernameValue = $("#username").val();

                //making sure username only contains alphanumeric characters
                var regUsername = new RegExp("^[A-Za-z0-9]*$");
                if (regUsername.test(usernameValue)) {
                    //add valid class, get rid of invalid class
                    $('#userAlphaNum').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#userAlphaNum').removeClass("valid").addClass("invalid");
                }

                if(usernameValue.length >= 4){
                    $('#userMin').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#userMin').removeClass("valid").addClass("invalid");
                }

                if(usernameValue.length <= 15){
                    $('#userMax').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#userMax').removeClass("valid").addClass("invalid");
                }

            });

            // $("#zip").keyup(function(){
            //     //gets zip code value
            //     var zipValue = $("#zip").val();

            //     //making sure zip code is 5 digits
            //     if (zipValue.length == 5) {
            //         //add valid class, get rid of invalid class
            //         $('#zipDigits').removeClass("invalid").addClass("valid");
            //     }
            //     else{
            //         $('#zipDigits').removeClass("valid").addClass("invalid");
                    
            //     }
            // });

            /*checks while user is typing to see if password requirements are being met, and changes font from red to green and
            adds a checkmark if requirements are met*/
            $("#password").keyup(function() {
                //get password value
                var value = $("#password").val();

                //testing that password has at least one lowercase letter
                var regLower = new RegExp("[a-z]");
                if (regLower.test(value)) {
                    $('#lower').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#lower').removeClass("valid").addClass("invalid");
                }

                //testing that password has at least one uppercase letter
                var regUpper = new RegExp("[A-Z]");
                if (regUpper.test(value)) {
                    $('#upper').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#upper').removeClass("valid").addClass("invalid");
                }

                //testing that password has at least one number
                var regNum = new RegExp("[0-9]");
                if (regNum.test(value)) {
                    $('#number').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#number').removeClass("valid").addClass("invalid");
                }

                //testing that password is at least 8 characters
                if(value.length >= 8){
                    $('#minlength').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#minlength').removeClass("valid").addClass("invalid");
                }

                //testing that password isn't longer than 30 characters
                if(value.length > 30){
                    $('#maxlength').removeClass("valid").addClass("invalid");
                }
                else{
                    $('#maxlength').removeClass("invalid").addClass("valid");
                }

                //testing that password contains at least one special character
                var regSpecial = new RegExp("[!@#$%^&*(),.?\":{}|<>]");
                if (regSpecial.test(value)) {
                    $('#special').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#special').removeClass("valid").addClass("invalid");
                }
            });
        });
    }


    //this shows or hides the dropdowns that are focused on
    showOrHide = () => this.setState((currentState) => ({show: !currentState.show}));

    validateZip(event){
        var zipValue = $("#zip").val();
        if(zipValue.length == 5){
            this.setState({isValidZip: true});
            console.log("Zip is valid");
        }
        else{
            this.setState({isValidZip: false});
            console.log("Zip is not valid");
        }
    }


    

    render() {
        const focus = this.state.focus;
        let zipDiv;

        if (focus) {
            
        }

        return (
            <div id="accountform">
                <h1 class="header">Sign Up!</h1>
                <form>
                    <div class="form-group">
                        <label>First name:</label>
                        <input id="fname" class="form-control" name="firstName" type="text" pattern="^[A-Za-z]+$" 
                            minLength="1" maxLength="40" placeholder="Jane" 
                            value={this.state.user.firstName} onChange={this.handleInputChange} required/>
                    </div>
                    <div class="form-group">
                        <label>Last name:</label>
                        <input id="lname" class="form-control" name="lastName" type="text" pattern="^[A-Za-z]+$" minLength="1" maxLength="40" placeholder="Doe"
                            value={this.state.user.lastName} onChange={this.handleInputChange} required/>
                    </div>
                    <div class="form-group">
                        <label>Username:</label>
                        <input id="username" class="form-control" name="userName" type="text" pattern="^[A-Za-z0-9]{4,15}$" placeholder="user123" 
                            value={this.state.user.firstName} onChange={this.handleInputChange} required/>
                    </div>
                    <div id="usernamereq">
                        <p id="userAlphaNum" className="valid">Username must only contain letters and numbers</p>
                        <p id="userMin" className="invalid">Username must be have a minimum length of 4</p>
                        <p id="userMax" className="valid">User must have a maximum length of 15</p>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input id="email" class="form-control" name="email" type="email" placeholder="example@gmail.com"
                            value={this.state.user.email} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="form-group">
                    <label>Zip code: </label>
                        <input id="zip" className="rounded form-control" name="zipcode" type="number" pattern="^\d{5}$" placeholder="99004" onFocus={this.showOrHide} onBlur={this.showOrHide}
                         onKeyUp={this.validateZip} required/>
                        {this.state.show && <p id="zipDigits" className="invalid">Zip code must be 5 digits</p>}
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input id="password" class="form-control" name="password" type="password" 
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$" 
                        value={this.state.user.password} onChange={this.handleInputChange} required/>
                    </div>
                    <div id="passwordreq">
                    <h4>Password must contain the following:</h4>
                        <p id="lower" className="invalid">At least one lowercase letter</p>
                        <p id="upper" className="invalid">At least one uppercase letter</p>
                        <p id="number" className="invalid">A number</p>
                        <p id="special" className="invalid">At least one special character</p>
                        <p id="minlength" className="invalid">Minimum 8 characters</p>
                        <p id="maxlength" className="valid">Maximum 30 characters</p>
                    </div>
                    <div>
                    <input type="checkbox" name="13orolder" required/>
                    <label for="13orolder"> I am 13 or older</label>
                    </div>

                    <Recaptcha
                        sitekey="6Lf3W9gUAAAAABostmeeDYxgtLyJpsckK4Bei6I-"
                    />
                    <br/>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

