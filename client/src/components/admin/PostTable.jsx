import React from "react";
import { useSelector } from "react-redux";
import config from "../../utils/config";

function PostTable() {
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
            <th className="th-sm">Image</th>
            <th className="th-sm">User Name</th>
            <th className="th-sm">Discription</th>
            <th className="th-sm">Created At</th>
            <th className="th-sm">Hide</th>
          </tr>
        </thead>
        {console.log(admin)}
        <tbody>
          {
            admin?.searchPosts ?
            admin?.searchPosts.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img width={130} src={`${config.SERVER_URL}/images/posts/${val._id}.jpg`} /></td>
                  <td>{val?.userDetail?.username}</td>
                  <td>{val.content}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td>{"hi"}</td>
                </tr>
              );
            })
            :
            admin?.posts?.posts.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img width={130} src={`${config.SERVER_URL}/images/posts/${val._id}.jpg`} /></td>
                  <td>{val?.userDetail?.username}</td>
                  <td>{val.content}</td>
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

export default PostTable;
