import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/adminAction";
import { patchDataAPI } from "../../utils/fetchData";

function UserTable({pageNumber}) {
  const { admin } = useSelector((state) => state);
  const dispatch = useDispatch();

  function ban(id) {
    patchDataAPI('/admin/banUser',{id})
    .then(({data})=>{
      dispatch(getUsers({ pageNumber }));
    })
  }
  function unBan(id) {
    patchDataAPI('/admin/unBanUser',{id})
    .then(({data})=>{
      dispatch(getUsers({ pageNumber }));
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
            <th className="th-sm">Name</th>
            <th className="th-sm">Username</th>
            <th className="th-sm">Email</th>
            <th className="th-sm">Joined At</th>
            <th className="th-sm">Block</th>
          </tr>
        </thead>
        <tbody>
          {
            admin?.searchUsers ?
            admin?.searchUsers.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.fullname}</td>
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td>
                    {
                      val.isBanned?
                      <button onClick={()=>unBan(val._id)} className="btn btn-success">Unban</button>
                      :
                      <button onClick={()=>ban(val._id)} className="btn btn-danger" >Ban</button>
                    }
                  </td>
                </tr>
              );
            })
            :
            admin?.users?.users.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + ((pageNumber - 1) * 5)}</td>
                  <td>{val.fullname}</td>
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td>
                    {
                      val.isBanned?
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

export default UserTable;
