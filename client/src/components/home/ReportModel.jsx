import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../../styles/report.css'
import { postDataAPI } from "../../utils/fetchData";

function ReportModel({setReport,postId}){
  const {auth} = useSelector(state=>state)
  const [reportMessage, setReportMessage] = useState('')

    function closeModel() {
       setReport(false)
    }

    function sendReport(e) {
        e.preventDefault()
        if (!reportMessage)return 
        postDataAPI('/user/report/post',{postId,message:reportMessage},auth.token)
        .then(({data})=>{
            setReport(false)
        })
    }
  return (
    <div id="report" className="custom-model">
      <div className="modal__content">
        <div className=" m-3 justify-content-center">
            <form onSubmit={sendReport}>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="one" onChange={()=>setReportMessage('Inappropriate Content')}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">Inappropriate Content</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="two" onChange={()=>setReportMessage('Inappropriate Picture')}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">Inappropriate Picture</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="three" onChange={()=>setReportMessage('Offensive Content')}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">Offensive Content</label>
            </div>
            <div className="d-flex">
                <input type="submit" className="btn btn-warning mx-auto" />
            </div>
            </form>
        </div>
        <Link onClick={closeModel} className="modal__close">&times;</Link>
      </div>
    </div>
  );
}

export default ReportModel;
