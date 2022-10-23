export const DRAFT = "DRAFT";
export const PENDING ="PENDING";
export const READY ="READY";
export const COMPLETED ="COMPLETED";

export const requestList = [
    { ID:1 , requester_ID:"000001", project_ID: "000001", sub_project_ID:"000001", SVN_Access: "0", Jira_Access: "0", status:DRAFT},
    { ID:2 , requester_ID:"000002", project_ID: "000002", sub_project_ID:"000002", SVN_Access: "1", Jira_Access: "1", status: PENDING},
    { ID:3 , requester_ID:"000003", project_ID: "000003", sub_project_ID:"000003", SVN_Access: "2", Jira_Access: "2", status: READY},
    { ID:4 , requester_ID:"000004", project_ID: "000004", sub_project_ID:"000004", SVN_Access: "2", Jira_Access: "2", status: COMPLETED},
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