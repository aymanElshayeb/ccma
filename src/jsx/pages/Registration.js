import React,{useState} from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
// image
import logo from "../../images/Logo.svg";

function Register(props) {
    const [username, setUsername] = useState('nabil');
    const [email, setEmail] = useState('nabilmokhtar15@gmail.com');
    const [password, setPassword] = useState('poiuytrewq');
    const [confirmPassword, setConfirmPassword] = useState('poiuytrewq');
    const [fullName, setFullName] = useState('nabil mokhtar');
    // const [role, setRole] = useState('');

    let errorsObj = { username: '', password: '' ,email:'',fullName:''};
    const [errors, setErrors] = useState(errorsObj);


    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (username === '') {
            errorObj.username = 'username is Required';
            error = true;
			swal('Oops', errorObj.username, "error");
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
			swal('Oops', errorObj.password, "error");
        }

        if (password !=confirmPassword) {
            errorObj.password = 'Password Not Match';
            error = true;
            swal('Oops', errorObj.password, "error");
        }

        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
            swal('Oops', errorObj.email, "error");
        }
        if (fullName === '') {
            errorObj.fullName = 'FullName is Required';
            error = true;
            swal('Oops', errorObj.fullName, "error");
        }
        // if (role === '') {
        //     errorObj.role = 'Role is Required';
        //     error = true;
        //     swal('Oops', errorObj.role, "error");
        // }

        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(signupAction(username, password,email,fullName, props.history));
    }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
					{props.errorMessage && (
						<div className=''>
							{props.errorMessage}
						</div>
					)}
					{props.successMessage && (
						<div className=''>
							{props.successMessage}
						</div>
					)}
                    <form onSubmit={onSignUp}>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="username"
                          defaultValue={username}
                        />
                      </div>
                        {errors.username && <div>{errors.username}</div>}

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
							defaultValue={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
							placeholder="email"
                        />
                      </div>
					  {errors.email && <div>{errors.email}</div>}

                        {/*<div className="form-group mb-3">*/}
                        {/*    <label className="mb-1 ">*/}
                        {/*        <strong>Role</strong>*/}
                        {/*    </label>*/}
                        {/*    <input*/}

                        {/*        onChange={(e) => setRole(e.target.value)}*/}
                        {/*        className="form-control"*/}
                        {/*        placeholder="Role"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*{errors.role && <div>{errors.role}</div>}*/}


                        <div className="form-group mb-3">
                            <label className="mb-1 ">
                                <strong>Full Name</strong>
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setFullName(e.target.value)}
                                className="form-control"
                                placeholder="full name"
                                defaultValue={fullName}
                            />
                        </div>
                        {errors.fullName && <div>{errors.fullName}</div>}

                        {/*<label id="role" className="mb-1 "><strong>Role</strong></label>*/}
                        {/*<select name="role" id="role" className="form-control">*/}
                        {/*    <option value="Member">Member</option>*/}
                        {/*    <option value="Project">Project</option>*/}
                        {/*</select>*/}


                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
							defaultValue={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
							className="form-control"
							placeholder="password"

                        />
                      </div>
					  {errors.password && <div>{errors.password}</div>}
                        <div className="form-group mb-3">
                            <label className="mb-1 ">
                                <strong>Confirm Password</strong>
                            </label>
                            <input
                                defaultValue={password}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="form-control"
                                placeholder="Confirm password"

                            />

                        </div>
                        {errors.password && <div>{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);

