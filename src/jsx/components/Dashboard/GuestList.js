import React,{ useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Dropdown, Tab, Nav, Modal } from "react-bootstrap";

///Import
import PendingBlog from './Guest/PendingBlog';
import BookedBlog from './Guest/BookedBlog';
import CanceledBlog from './Guest/CanceledBlog';
import RefundBlog from './Guest/RefundBlog';

//Images
import pic1 from './../../../images/avatar/1.jpg';
import pic2 from './../../../images/avatar/2.jpg';
import pic3 from './../../../images/avatar/3.jpg';
import pic4 from './../../../images/avatar/4.jpg';
import pic5 from './../../../images/avatar/5.jpg';
import pic6 from './../../../images/avatar/6.jpg';
import user from "../../../images/task/user.jpg";
import {nanoid} from "nanoid";
import swal from "sweetalert";
import card1 from "../../../images/task/img1.jpg";
import card2 from "../../../images/task/img2.jpg";
import card3 from "../../../images/task/img3.jpg";
import card4 from "../../../images/task/img4.jpg";
import card5 from "../../../images/task/img5.jpg";
import card6 from "../../../images/task/img6.jpg";
import card7 from "../../../images/task/img7.jpg";
import card8 from "../../../images/task/img8.jpg";
import RequestForm from "../Requests/RequestForm";
import ApprovalForm from "../Requests/ApprovalForm";
import {RequestsListGrid} from "../Requests/RequestsListGrid";

const CardListBlog = [
	{
		id:1, image: card1, Cust_Id:"01234",  Date_Join:"19/02/2022",
		Cust_Name: "Munaroh Steffani", Location:"India"
	},
	{
		id:2, image: card2, Cust_Id:"01235", Date_Join:"20/03/2022",
		Cust_Name: "Geovanny Anderson", 	Location:"London "
	},
	{
		id:3, image: card3, Cust_Id:"01236", Date_Join:"21/04/2022",
		Cust_Name: "Louis Ali", Location:"Afghanistan"
	},
	{
		id:4, image: card4, Cust_Id:"01237", Date_Join:"22/05/2022",
		Cust_Name: "Marquezz", Location:"Belgium"
	},
	{
		id:5, image: card5, Cust_Id:"01238", Date_Join:"23/06/2022",
		Cust_Name: "Richard ", Location:"Colombia"
	},
	{
		id:6, image: card6, Cust_Id:"01239", Date_Join:"24/07/2022",
		Cust_Name: "Andrew Stevano",  	Location:"Czechia"
	},
	{
		id:7, image: card7, Cust_Id:"01240", Date_Join:"25/08/2022",
		Cust_Name: "Cathenna ",  Location:"El Salvador"
	},
	{
		id:8, image: card8, Cust_Id:"01241", Date_Join:"26/09/2022",
		Cust_Name: "Hrisovalantis ",  	Location:"Guatemala"
	}
];


const DropdownBlog = (props) =>{
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

const GuestList = () =>{


	const [showAddRequest, onShowAddRequest] = useState(false);
	const [showApporvalRequest, onShowApporvalRequest] = useState(false);
	
	const [selectBtn, setSelectBtn] = useState("Newest");
	
	const [data, setData] = useState(
		document.querySelectorAll("#example2_wrapper tbody tr")
	);
	const sort = 8;
	const activePag = useRef(0);
	//const [test, settest] = useState(0);

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
      //chackboxFun();
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
		<>
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				<div className=" mb-2 me-auto">
				<Link to={"#"} className="btn btn-primary font-w600" onClick={()=> {onShowAddRequest(true)}}>+ New Request</Link>
				<Link to={"#"} className="btn btn-secondary font-w600" onClick={()=> onShowApporvalRequest(true)}>Approve</Link>
				</div>
				{/* <!-- Modal --> */}
				<RequestForm  show={showAddRequest} onShow={onShowAddRequest} />
				<ApprovalForm  show={showApporvalRequest} onShow={onShowApporvalRequest} />
				<div>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3"> <i className="fas fa-envelope"></i></Link>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3"><i className="fas fa-phone-alt"></i></Link>
					<Link to={"#"} className="btn btn-primary btn-sm"><i className="fas fa-info"></i></Link>
				</div>
			</div>
			<RequestsListGrid/>
		</>
	)
}
export {DropdownBlog};
export default GuestList;