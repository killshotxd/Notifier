import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ res, handleCheckboxChange, deleteNotify, checked }) => {
  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => handleCheckboxChange(e, res)}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={res.avatar} alt="profile" />
            </div>
          </div>
          <div>
            <div className="font-bold">{res.senderName}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="font-bold">{res.subject.slice(0, 10)}</span>
        <br />
        <span className="badge badge-primary badge-sm">{res.timeAgo}</span>
      </td>
      <td>
        <span className="badge badge-red">
          {res.important ? "Important" : "General"}
        </span>
      </td>
      <th>
        {checked === res.did ? (
          <span
            className="btn btn-ghost pl-0"
            onClick={() => deleteNotify(res.did)}
          >
            Delete
          </span>
        ) : (
          <Link
            to={"/notifyMail"}
            state={{
              data: {
                avatar: res.avatar,
                did: res.did,
                from: res.from,
                important: res.important,
                message: res.message,
                senderName: res.senderName,
                subject: res.subject,
                timeAgo: res.timeAgo,
              },
            }}
          >
            View
          </Link>
        )}
      </th>
    </tr>
  );
};

export default TableRow;
