import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import user from "../../../images/task/user.jpg";
import swal from "sweetalert";
import {fetchRequesterList, fetchProjectList, fetchAccessList, fetchSystemList, fetchSystemAccessList} from "../../../backCallMock/RequestServiceMock";

const RequestForm = ({show, onShow})=>{

    //Add data
    const [addFormData, setAddFormData ] = useState({
        Requester_ID:'',
        Project_ID:'',
        Sub_Project_ID:'',
        system_access_ID:'',
    });

    const requesterList= fetchRequesterList();
    const projectList =fetchProjectList();
    const systemList = fetchSystemList();
    const [systemAccessList, setSystemAccessList]=useState(fetchSystemAccessList(systemList[0]))
    const [file, setFile] = React.useState(null);
    //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        onShow(false);
        swal('Good job!', 'Successfully Added', "success");
    };
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    return (
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
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>save as draft</button>
                            <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>submit</button>
                            <button type="button" onClick={()=> onShow(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>
                        </div>
                    </form>

                </div>
            </div>
        </Modal>
    )
}

export default RequestForm;
