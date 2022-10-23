import React, {useEffect, useState} from 'react';
import user from "../../../images/task/user.jpg";
import {Modal} from "react-bootstrap";
import swal from "sweetalert";

const ApprovalForm = ({show, onShow})=>{
    const [file, setFile] = React.useState(null);
    //Add data
    const [addFormData, setAddFormData ] = useState({
        Cust_Id:'',
        Date_Join:'',
        Cust_Name:'',
        Location:'',
        image:'',
    });
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };

    //Execute data
    const handleExecuteRequest = (event)=> {
        event.preventDefault();
        onShow(false);
        swal('Good job!', 'Successfully Added', "success");
    };
    return(
        <Modal className="modal fade"  show={show} onHide={onShow} >
            <div className="" role="document">
                <div className="">
                    <form >
                        <div className="modal-header">
                            <h4 className="modal-title fs-20">Add Access Request</h4>
                            <button type="button" className="btn-close" onClick={()=> onShow(false)} data-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <i className="flaticon-cancel-12 close"></i>
                            <div className="add-contact-box">
                                <div className="add-contact-content">
                                    <div className="image-placeholder">
                                        <div className="avatar-edit">
                                            <label htmlFor="imageUpload" name=''  ></label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div id="imagePreview">
                                                <img id="saveImageFile" src={file? URL.createObjectURL(file) : user}
                                                     alt={file? file.name : null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Requester</label>
                                        <div className="contact-occupation">
                                            <select
                                                defaultValue={"Ayman El-shayeb"}
                                                className="form-control "
                                            >
                                                <option>Ayman El-shayeb</option>
                                                <option>Raghavan Chakravarty</option>
                                                <option>Pasha Pasha</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Project Id</label>
                                        <div className="contact-name">
                                            <input type="text"  className="form-control"  autoComplete="off"
                                                   name="Cust_Id" required="required"
                                                   onChange={handleAddFormChange}
                                                   placeholder="Project ID"
                                            />
                                            <span className="validation-text"></span>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Sub Project Id</label>
                                        <div className="contact-name">
                                            <input type="text"  className="form-control"  autoComplete="off"
                                                   name="Date_Join" required="required"
                                                   onChange={handleAddFormChange}
                                                   placeholder="Sub Project Id"
                                            />
                                            <span className="validation-text"></span>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">SVN Access</label>
                                        <div className="contact-occupation">
                                            <select
                                                defaultValue={"Read"}
                                                className="form-control "
                                            >
                                                <option>Read Access</option>
                                                <option>Write Access</option>
                                                <option>Admin Access</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Jira Access</label>
                                        <div className="contact-occupation">
                                            <select
                                                defaultValue={"Read Access"}
                                                className="form-control "
                                            >
                                                <option>Read Access</option>
                                                <option>Write Access</option>
                                                <option>Admin Access</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" modal-footer">
                            <div className="container">
                                <div className="row p-2">

                                    <button type="submit" className="btn btn-secondary  m-2 col" onClick={handleExecuteRequest}>Execute Manually</button>
                                    <button type="submit" className="btn btn-secondary m-2 col " onClick={handleExecuteRequest}>Execute Automatically</button>
                                </div>
                                <div className="row">
                                    <button type="button" onClick={()=> onShow(false)} className="btn btn-danger m-2 col "> <i className="flaticon-delete-1"></i>Return to Requester</button>
                                    <button type="button" onClick={()=> onShow(false)} className="btn btn-danger m-2 col "> <i className="flaticon-delete-1"></i>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </Modal>
    );
}
export  default  ApprovalForm;