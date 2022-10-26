export const DRAFT = "DRAFT";
export const PENDING ="PENDING";
export const READY ="READY";
export const COMPLETED ="COMPLETED";

export const requestList = [
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
    return requestList;
}

const  fetchRequest = (id)=>{
    const existingRequest = requestList.find((existingRequest)=> existingRequest.ID == id);
    return existingRequest;
}

const saveAsDraftRequest= (request)=>{
    request.status = DRAFT;
    addRequest(request);
    console.log(request);
    console.log(requestList);
}

const submitRequest= (request)=>{
    request.status = PENDING;
    addRequest(request);
    console.log(request);
    console.log(requestList);
}

const executeRequest= (request)=>{
    request.status = READY;
    updateRequest(request);
    console.log(request);
    console.log(requestList);
}

const returnRequest= (request)=>{
    request.status = DRAFT;
    updateRequest(request);
}