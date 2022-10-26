import React, {useEffect, useState} from 'react';
import user from "../../../images/task/user.jpg";
import {Modal} from "react-bootstrap";
import swal from "sweetalert";
import {
    fetchProjectList,
    fetchRequesterList,
    fetchSystemAccessList,
    fetchSystemList
} from "../../../backCallMock/RequestServiceMock";

const ApprovalForm = ({show, onShow})=>{
    const [file, setFile] = React.useState(null);
    const requesterList= fetchRequesterList();
    const projectList =fetchProjectList();
    const systemList = fetchSystemList();
    const [systemAccessList, setSystemAccessList]=useState(fetchSystemAccessList(systemList[0]))
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
                            <h4 className="modal-title fs-20">Access Request</h4>
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
                                                className="form-control "
                                            >
                                                {requesterList.map((requester) => <option id={requester.id}>{requester.fullName}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Project</label>
                                        <div className="contact-occupation">
                                            <select
                                                className="form-control "
                                            >
                                                {projectList.map((project) => <option id={project.id}>{project.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Systems</label>
                                        <div className="contact-occupation">
                                            <select
                                                className="form-control " onChange={(event)=>setSystemAccessList(fetchSystemAccessList(event.target.value))}
                                            >
                                                {systemList.map((system) => <option value={system}>{system}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Access</label>
                                        <div className="contact-occupation">
                                            <select
                                                className="form-control "
                                            >
                                                {systemAccessList.map((systemAccess) => <option value={systemAccess.id}>{systemAccess.accessPermission}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" modal-footer">
                            <div className="container">
                                <div className="row">
                                    <button type="button" onClick={()=> onShow(false)} className="btn btn-secondary m-2 col "> <i className="flaticon-delete-1"></i>Return to Requester</button>
                                    <button type="submit" className="btn btn-secondary m-2 col " onClick={handleExecuteRequest}>Approve</button>
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