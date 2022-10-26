import React,{ useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

import {DropdownRequest} from './RequestsListGrid';

import pic3 from './../../../images/avatar/3.jpg';

const FilteredRequestListGrid = ({requestLists}) =>{
	const [data, setData] = useState(
		document.querySelectorAll("#pending_wrapper tbody tr")
	);
	const sort = 10;
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
      setData(document.querySelectorAll("#pending_wrapper tbody tr"));
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
		
	};

   
	const chackbox = document.querySelectorAll(".sorting_2 input");
	const motherChackBox = document.querySelector(".sorting_asc_2 input");
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
	return(
		<>
			<div className="table-responsive">
				<div id="pending_wrapper" className="dataTables_wrapper no-footer">
					<table
						id="example2"
						className="table card-table default-table display mb-4 dataTablesCard dataTable no-footer"
					>
						<thead>
							<tr role="row">
								<th className="sorting_asc_2 bg-none" >
									<div className="form-check  style-1">
										<input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required=""/>
									</div>
								</th>
								<th className="sorting_asc">ID</th>
								<th className="sorting">requester</th>
								<th className="sorting">Project</th>
								<th className="sorting">SVN Access</th>
								<th className="sorting">Jira Access</th>
								<th className="sorting">Status</th>
								<th className="sorting">creationDate</th>
								<th className="sorting bg-none"></th>
							</tr>
						</thead>
						<tbody>
						{ requestLists.map((request, index)=> {
							const requestEntries =(<>
										<td>
											<div>
												<h5 className="text-nowrap">{request.id}</h5>
											</div>
										</td>

										<td>
											<div>
												<h5 className="text-nowrap">{request.requester.fullName}</h5>
											</div>
										</td>
										<td>
											<div>
												<h5 className="text-nowrap">{request.project.name}</h5>
											</div>
										</td>
										<td>
											<div>
												<h5 className="text-nowrap">{request.systemAccess.systemName=="JIRA"? request.systemAccess.accessPermission:""}</h5>
											</div>
										</td>
										<td>
											<div>
												<h5 className="text-nowrap">{request.systemAccess.systemName=="SVN"? request.systemAccess.accessPermission:""}</h5>
											</div>
										</td>
										<td>
											<div>
												<h5 className="text-nowrap">{request.status}</h5>
											</div>
										</td>
										<td>
											<div>
												<h5 className="text-nowrap">{request.creationDate}</h5>
											</div>
										</td>
							</>);

							return (<>
								<tr role="row" className={(index % 2 == 0)?"even":"odd"}>
									<td className="sorting_2">
										<div className="form-check   style-1">
											<input type="checkbox" onClick={() => chackboxFun()}
												   className="form-check-input" id="customCheckBox24" required=""
											/>
										</div>
									</td>
									{requestEntries}
									<td><DropdownRequest/></td>
								</tr>
							</>)
							}
						)
						}

						</tbody>
					</table>
					<div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
						<div className="dataTables_info">
							Showing {activePag.current * sort + 1} to{" "}
							{data.length > (activePag.current + 1) * sort
								? (activePag.current + 1) * sort
								: data.length}{" "}
							of {data.length} entries
						</div>
						<div
							className="dataTables_paginate paging_simple_numbers mb-0"
							id="example2_paginate"
						>
							<Link
								className="paginate_button previous disabled"
								to="/guest-list"
								onClick={() =>
								   activePag.current > 0 &&
								   onClick(activePag.current - 1)
								}
							 >
								<i className="fa fa-angle-double-left"></i>
							</Link>
							<span>
								{paggination.map((number, i) => (
								   <Link
									  key={i}
									  to="/guest-list"
									  className={`paginate_button  ${
										 activePag.current === i ? "current" : ""
									  } `}
									  onClick={() => onClick(i)}
								   >
									  {number}
								   </Link>
								))}
							</span>

							<Link
								className="paginate_button next"
								to="/guest-list"
								onClick={() =>
								   activePag.current + 1 < paggination.length &&
								   onClick(activePag.current + 1)
								}
							>
								<i className="fa fa-angle-double-right" aria-hidden="true"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default FilteredRequestListGrid;