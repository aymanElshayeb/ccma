import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import user from "../../../images/task/user.jpg";
import swal from "sweetalert";
import {fetchRequesterList, fetchProjectList, fetchAllSystemAccessList, getSystemList, getSystemAccessList, submitRequest, saveAsDraftRequest} from "../../../services/Request/RequestService";
import requestTemplate from "../../../template/request.json"

let requesterList =[];
let projectList =[];
let allSystemAccessList=[]
let systemList =[];
let systemAccessListInit=[];

fetchRequesterList().then((response) => requesterList = response.data);
fetchProjectList().then((response) => projectList = response.data);

const RequestForm = ({show, onShow})=>{

    //Add data
    const [addFormData, setAddFormData ] = useState({
        Requester_ID:'',
        Project_ID:'',
        Sub_Project_ID:'',
        system_access_ID:'',
    });



    const [file, setFile] = React.useState(null);
    const [systemAccessList, setSystemAccessList]=useState(systemAccessListInit);
    useEffect(()=>{
        fetchAllSystemAccessList().then((response)=>{
            allSystemAccessList= response.data;
            systemList= getSystemList(allSystemAccessList);
            setSystemAccessList(getSystemAccessList(allSystemAccessList ,allSystemAccessList[0].systemName ));
        });
    },show)

    //Add Submit data
    const submitHandler = (event)=> {
        event.preventDefault();
        onShow(false);
        submitRequest(requestTemplate);
        swal('Good job!', 'Successfully submitted', "success");
    };
    const saveAsDraftHandler = (event)=> {
        event.preventDefault();
        onShow(false);
        saveAsDraftRequest(requestTemplate);
        swal('Good job!', 'Successfully save as draft', "success");
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
                                                className="form-control " onChange={(event)=>setSystemAccessList(getSystemAccessList(allSystemAccessList, event.target.value))}
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
                                    <button type="submit" className="btn btn-secondary  m-2 col" onClick={saveAsDraftHandler}>save as draft</button>
                                    <button type="button"  onClick={submitHandler} className="btn btn-secondary  m-2 col "> <i className="flaticon-delete-1"></i>submit</button>
                                    <button type="submit" className="btn btn-danger m-2 col " onClick={(event)=> {event.preventDefault(); onShow(false);}}>cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </Modal>
    )
}

export default RequestForm;
