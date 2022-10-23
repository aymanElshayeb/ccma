import React, {useEffect, useRef, useState} from 'react';
import {Dropdown, Nav, Tab} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment/moment";
import FilteredRequestListGrid from "./FilteredRequestListGrid";
import {COMPLETED, DRAFT, fetchRequestList, PENDING, READY} from "../../../backCallMock/RequestServiceMock";



const DropdownRequest = (props) =>{
    return(
        <>
            <Dropdown className="dropdown">
                <Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item className="dropdown-item" >Approve</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item">Execute</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item">Archive</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

const RequestsListGrid = ()=>{

    const [selectBtn, setSelectBtn] = useState("Newest");

    const [requestsList, setRequestsList] = useState([]);
    const [requestsDraftList, setRequestsDraftList] = useState([]);
    const [requestsPendingList, setRequestsPendingList] = useState([]);
    const [requestsReadyList, setRequestsReadyList] = useState([]);
    const [requestsCompletedList, setRequestsCompletedList] = useState([]);

    const [data, setData] = useState(
        document.querySelectorAll("#example2_wrapper tbody tr")
    );
    const sort = 8;
    const activePag = useRef(0);
    // Active data
    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove("d-none");
            } else {
                data[i].classList.add("d-none");
            }
        }
    };
    // use effect
    useEffect(() => {
        setData(document.querySelectorAll("#example2_wrapper tbody tr"));
        setRequestsList(fetchRequestList());
        setRequestsDraftList(requestsList.filter((request)=> request.status === DRAFT));
        setRequestsPendingList(requestsList.filter((request)=> request.status === PENDING));
        setRequestsReadyList(requestsList.filter((request)=> request.status === READY));
        setRequestsCompletedList(requestsList.filter((request)=> request.status === COMPLETED));
    }, []);


    // Active pagginarion
    activePag.current === 0 && chageData(0, sort);
    // paggination
    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1);

    // Active paggination & chage data
    const onClick = (i) => {
        activePag.current = i;
        chageData(activePag.current * sort, (activePag.current + 1) * sort);
        //settest(i);
    };


    const chackbox = document.querySelectorAll(".sorting_1 input");
    const motherChackBox = document.querySelector(".sorting_asc input");
    // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
    const chackboxFun = (type) => {
        for (let i = 0; i < chackbox.length; i++) {
            const element = chackbox[i];
            if (type === "all") {
                if (motherChackBox.checked) {
                    element.checked = true;
                } else {
                    element.checked = false;
                }
            } else {
                if (!element.checked) {
                    motherChackBox.checked = false;
                    break;
                } else {
                    motherChackBox.checked = true;
                }
            }
        }
    };

    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;
    const handleCallback = (start, end) => {
        setState({ start, end });
    };
    const label =
        start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');

    return(
        <Tab.Container defaultActiveKey="All">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="card-action coin-tabs mb-2">
                    <Nav as="ul" className="nav nav-tabs">
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey="All">All Requests</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey="Draft">Draft</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey="Pending">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey="Ready">Ready</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey="Completed">Completed</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="d-flex align-items-center mb-2 flex-wrap">
                    <div className="guest-calendar">
                        <DateRangePicker
                            initialSettings={{
                                startDate: start.toDate(),
                                endDate: end.toDate(),
                                ranges: {
                                    Today: [moment().toDate(), moment().toDate()],
                                    Yesterday: [
                                        moment().subtract(1, 'days').toDate(),
                                        moment().subtract(1, 'days').toDate(),
                                    ],
                                    'Last 7 Days': [
                                        moment().subtract(6, 'days').toDate(),
                                        moment().toDate(),
                                    ],
                                    'Last 30 Days': [
                                        moment().subtract(29, 'days').toDate(),
                                        moment().toDate(),
                                    ],
                                    'This Month': [
                                        moment().startOf('month').toDate(),
                                        moment().endOf('month').toDate(),
                                    ],
                                    'Last Month': [
                                        moment().subtract(1, 'month').startOf('month').toDate(),
                                        moment().subtract(1, 'month').endOf('month').toDate(),
                                    ],
                                },
                            }}
                            onCallback={handleCallback}
                        >
                            <div
                                id="reportrange"
                                className="pull-right reportrange"
                                style={{
                                    width: '100%',
                                }}
                            >
                                {/* <i className="fa fa-calendar"></i>&nbsp;&nbsp; */}
                                <span>{label}</span> <i className="fas fa-chevron-down ms-3"></i>
                            </div>
                        </DateRangePicker>

                    </div>
                    <div className="newest ms-3">
                        <Dropdown>
                            <Dropdown.Toggle as="div" className=" btn-select-drop default-select btn i-false">
                                {selectBtn} <i className="fas fa-angle-down ms-2 "></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setSelectBtn("Oldest")} eventKey="All">Oldest</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setSelectBtn("Newest")} eventKey="All">Newest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body p-0">
                            <Tab.Content>
                                <Tab.Pane eventKey="All">
                                    <FilteredRequestListGrid requestLists = {requestsList} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Draft">
                                    <FilteredRequestListGrid requestLists = {requestsDraftList} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Pending">
                                    <FilteredRequestListGrid requestLists = {requestsPendingList} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Ready">
                                    <FilteredRequestListGrid requestLists = {requestsReadyList} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Completed">
                                    <FilteredRequestListGrid requestLists = {requestsCompletedList} />
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </div>
                </div>
            </div>
        </Tab.Container>
    );
}
export    {RequestsListGrid, DropdownRequest};
