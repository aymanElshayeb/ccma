import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';
import {MANAGER, MEMBER} from "./Request/RequestService";

import {ccmaInstance} from "./CcmaInstance";

export function signUp(username, password,email,fullName,role=MEMBER) {
    //axios call
    const postData = {
        "email":email,
        "password":password,
        "role":role,
        "full_name":fullName,
        "user_name":username

    };
    return ccmaInstance.post(
        'requester/register',
        postData,
    );
}

export function login(username, password) {

    return ccmaInstance.get(
        'login/',
        {
            auth:   {
                username,
                password,
            }
        });
}

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + (30*60*1000) ,
    );

    saveRole(tokenDetails.role)


    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout(history));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);
}



export function saveRole(role) {
    localStorage.setItem('userRole', JSON.stringify(role));
}


export function getRole() {
   const role= localStorage.getItem('userRole');
   return JSON.parse(role);
}
