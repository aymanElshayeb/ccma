import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import user from "../../../images/task/user.jpg";
import swal from "sweetalert";
import {fetchRequesterList, fetchProjectList, fetchAllSystemAccessList, getSystemList, getSystemAccessList, submitRequest, saveAsDraftRequest} from "../../../services/Request/RequestService";
import requestTemplate from "../../../template/request.json"





const RequestForm = ({show, onShow, intialRequest})=>{

    const [file, setFile] = React.useState(null);
    const [requesterList, setRequesterList]=useState([{}]);
    const [projectList, setProjectList]=useState([{}]);
    const [allSystemAccessList, setAllSystemAccessList]=useState([{}]);
    const [systemList, setSystemList]=useState([]);
    const [systemAccessList, setSystemAccessList]=useState([{}]);
    if(!intialRequest){
        intialRequest={
            requesterId: 1,
            projectId:1,
            systemAccessId:1
        }
    }
    const [request, setRequest]=useState(intialRequest);


    useEffect(()=>{
        fetchRequesterList().then((response) => {
            const responseList = response.data;
            setRequesterList(responseList);
            request.requesterId=responseList[0].id;
            setRequest(request)
        } );
        fetchProjectList().then((response) => {
            const responseList = response.data;
            setProjectList(responseList);
            request.projectId=responseList[0].id;
            setRequest(request);
        });
        fetchAllSystemAccessList().then((response)=>{
            const responseList = response.data;
            setAllSystemAccessList(responseList);
            let systemList= getSystemList(responseList);
            setSystemList(systemList);
            let systemAccessList = getSystemAccessList(responseList ,responseList[0].systemName );
            setSystemAccessList(systemAccessList);
            request.systemAccessId=systemAccessList[0].id;
            setRequest(request);
        });
    },show)

    //Add Submit data
    const submitHandler = (event)=> {
        event.preventDefault();
        onShow(false);
        requestTemplate.requester.id = request.requesterId;
        requestTemplate.project.id = request.projectId;
        requestTemplate.systemAccess.id= request.systemAccessId;
        submitRequest(requestTemplate);
        swal('Good job!', 'Successfully submitted', "success");
    };
    const saveAsDraftHandler = (event)=> {
        event.preventDefault();
        onShow(false);
        saveAsDraftRequest(requestTemplate);
        swal('Good job!', 'Successfully save as draft', "success");
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
                                            <select className="form-control"  value={request.requesterId} onChange={(event)=>setRequest((prev)=>({...prev, requesterId:event.target.value}))}>
                                                {requesterList.map((requester) => <option value={requester.id}>{requester.fullName}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="text-black font-w500">Project</label>
                                        <div className="contact-occupation">
                                            <select className="form-control" value={request.projectId} onChange={(event)=>setRequest((prev)=>({...prev, projectId:event.target.value}))}>
                                                {projectList.map((project) => <option value={project.id}>{project.name}</option>)}
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
                                            <select  className="form-control" value={request.systemAccessId} onChange={(event)=>setRequest((prev)=>({...prev, systemAccessId:event.target.value}))}>
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
