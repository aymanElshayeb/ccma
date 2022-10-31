import {ccmaInstance} from "../CcmaInstance";

export const DRAFT = "DRAFT";
export const PENDING ="PENDING";
export const COMPLETED ="COMPLETED";
export const READY ="READY";

export const MEMBER = "MEMBER"
export const MANAGER ="MANGER"

export const REQUEST_READABLE_DRAFT = {
    editable:false,
    isSaveAsDraftActive: true,
    isSubmitActive:true,
    isReturnToRequester:false,
    isExecuteActive:false
};
export const REQUEST_EDITABLE_DRAFT = {
    editable:true,
    isSaveAsDraftActive: true,
    isSubmitActive:true,
    isReturnToRequester:false,
    isApproveActive:false
};
export const REQUEST_EDITABLE_PENDING = {
    editable:true,
    isSaveAsDraftActive: false,
    isSubmitActive:false,
    isReturnToRequester:true,
    isApproveActive:true
};
export const REQUEST_READABLE = {
    editable:false,
    isSaveAsDraftActive: false,
    isSubmitActive:false,
    isReturnToRequester:false,
    isApproveActive:false
};
const requestList = [
    {
        "id": 1,
        "requester": {
            "id": 2,
            "userName": "lnzautomationuser",
            "email": "no.mail@nomail.nomail",
            "fullName": "LNZautomationuser None (IFL ATV SC D RAD PJM)"
        },
        "systemAccess": {
            "id": 3,
            "systemName": "JIRA",
            "accessPermission": "ADMIN"
        },
        "status": "COMPLETED",
        "project": {
            "id": 1,
            "name": "CTRX Radar Family [CTRXFAMILY]"
        },
        "creationDate": "2022-10-19T22:00:00.000+00:00",
        "lastModifiedDate": "2022-10-20T22:00:00.000+00:00",
        "lastModifier": {
            "id": 2,
            "userName": "lnzautomationuser",
            "email": "no.mail@nomail.nomail",
            "fullName": "LNZautomationuser None (IFL ATV SC D RAD PJM)"
        }
    },
    {
        "id": 2,
        "requester": {
            "id": 2,
            "userName": "lnzautomationuser",
            "email": "no.mail@nomail.nomail",
            "fullName": "LNZautomationuser None (IFL ATV SC D RAD PJM)"
        },
        "systemAccess": {
            "id": 6,
            "systemName": "SVN",
            "accessPermission": "ADMIN"
        },
        "status": "COMPLETED",
        "project": {
            "id": 1,
            "name": "CTRX Radar Family [CTRXFAMILY]"
        },
        "creationDate": "2022-10-19T22:00:00.000+00:00",
        "lastModifiedDate": "2022-10-20T22:00:00.000+00:00",
        "lastModifier": {
            "id": 2,
            "userName": "lnzautomationuser",
            "email": "no.mail@nomail.nomail",
            "fullName": "LNZautomationuser None (IFL ATV SC D RAD PJM)"
        }
    }
];

const accessList=[
    {
        "id": 1,
        "systemName": "JIRA",
        "accessPermission": "READ"
    },
    {
        "id": 2,
        "systemName": "JIRA",
        "accessPermission": "WRITE"
    },
    {
        "id": 3,
        "systemName": "JIRA",
        "accessPermission": "ADMIN"
    },
    {
        "id": 4,
        "systemName": "SVN",
        "accessPermission": "READ"
    },
    {
        "id": 5,
        "systemName": "SVN",
        "accessPermission": "WRITE"
    },
    {
        "id": 6,
        "systemName": "SVN",
        "accessPermission": "ADMIN"
    }
];
const  projectList=[
    {
        "id": 1,
        "name": "CTRX Radar Family [CTRXFAMILY]"
    }
];
const requesterList  = [
    {
        "id": 1,
        "userName": "elshayeb",
        "email": "Elshayeb.external@infineon.com",
        "fullName": "Elshayeb Ayman (IFAT DCL ATV SC D RAD PJM)"
    },
    {
        "id": 2,
        "userName": "lnzautomationuser",
        "email": "no.mail@nomail.nomail",
        "fullName": "LNZautomationuser None (IFL ATV SC D RAD PJM)"
    }
];
const SystemAccessList = [
    {
        "id": 1,
        "systemName": "JIRA",
        "accessPermission": "READ"
    },
    {
        "id": 2,
        "systemName": "JIRA",
        "accessPermission": "WRITE"
    },
    {
        "id": 3,
        "systemName": "JIRA",
        "accessPermission": "ADMIN"
    },
    {
        "id": 4,
        "systemName": "SVN",
        "accessPermission": "READ"
    },
    {
        "id": 5,
        "systemName": "SVN",
        "accessPermission": "WRITE"
    },
    {
        "id": 6,
        "systemName": "SVN",
        "accessPermission": "ADMIN"
    }
];
const addRequest= (request)=>{
    request.ID = requestList.length;
    requestList.push(request);
    console.log(request);
    console.log(requestList);
}

const updateRequest= (request)=>{
    const existingRequest = requestList.find((existingRequest)=> existingRequest.ID == request.ID);
    [...existingRequest] = [...request];
    console.log(request);
    console.log(requestList);
}

export const  fetchRequestList = ()=>{
    return ccmaInstance.get('request/')

}
export const fetchProjectList= ()=>{
    return ccmaInstance.get('project/')
}
export const fetchRequesterList= ()=>{
    return ccmaInstance.get('requester/')
}
export const   fetchAllSystemAccessList = ()=>{
    return ccmaInstance.get('systemAccess/');
}
export const submitRequest=(request)=>{
    ccmaInstance.post('requestAction/submit/',request).catch((reason)=>{console.log("Error occurs", reason)})
}
export const saveAsDraftRequest= (request)=>{
    ccmaInstance.post('requestAction/saveAsDraft/',request)
}


export const approveRequest= (request)=>{
    ccmaInstance.post('requestAction/execute/',request)
}

export const returnToRequester= (request)=>{
    ccmaInstance.post('requestAction/returnToRequester/',request)
}
export const getSystemList =(SystemAccessList)=>{
    console.log("getSystemList ");
    console.log( SystemAccessList);
    return SystemAccessList.map((systemAccess)=>systemAccess.systemName).filter((value, index, self)=>  self.indexOf(value) === index);
    }

export const getSystemAccessList =(systemAccessList, systemName)=>{
    console.log("getSystemAccessList");
    console.log(systemAccessList );
    console.log("systemName");
    console.log(systemName)

     return systemAccessList.filter((systemAccess)=> systemAccess.systemName ===systemName);
}

const  fetchRequest = (id)=>{
    const existingRequest = requestList.find((existingRequest)=> existingRequest.ID == id);
    return existingRequest;
}

