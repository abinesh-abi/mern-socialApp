import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getReports } from "../../redux/actions/adminAction";
import config from "../../utils/config";
import { patchDataAPI } from "../../utils/fetchData";

function ReportTable({pageNumber}) {
  const { admin } = useSelector((state) => state);
  const dispatch = useDispatch();

  function ban(id) {
    patchDataAPI('/admin/banPost',{id})
    .then(({data})=>{
      dispatch(getReports({ pageNumber }));
    })
  }

  function unBan(id) {
    patchDataAPI('/admin/unBanPost',{id})
    .then(({data})=>{
      dispatch(getReports({ pageNumber }));
    })
  }

  return (
    <div id="table">
      <table
        className="table table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th className="th-sm">Index</th>
            <th className="th-sm">Image</th>
            <th className="th-sm">User Name</th>
            <th className="th-sm">Discription</th>
            <th className="th-sm">NO of Reports</th>
            <th className="th-sm">Ban</th>
          </tr>
        </thead>
        <tbody>
          {
            admin?.reports?.reports?.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + ((pageNumber - 1) * 5)}</td>
                  <td><img width={130} src={`${config.SERVER_URL}/images/posts/${val._id}.jpg`} /></td>
                  <td>{val?.userDetails?.username}</td>
                  <td>{val?.postDetails?.content}</td>
                  <td>{val?.noOfReports}</td>
                  <td>
                    {
                      val?.postDetails?.isBanned?
                      <button onClick={()=>unBan(val._id)} className="btn btn-success">Unban</button>
                      :
                      <button onClick={()=>ban(val._id)} className="btn btn-danger" >Ban</button>
                    }
                  </td>
                </tr>
              );
            })
            }
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
