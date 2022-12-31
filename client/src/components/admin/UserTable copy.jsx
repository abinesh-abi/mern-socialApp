import React from "react";
import { useSelector } from "react-redux";

function UserTable() {
  const { admin } = useSelector((state) => state);

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
                  <td>{"hi"}</td>
                </tr>
              );
            })
            :
            admin?.users?.users.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.fullname}</td>
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td>{"hi"}</td>
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
