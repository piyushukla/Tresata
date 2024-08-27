import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UpIcon } from "../Icons/upIcon.svg";
import { ReactComponent as DownIcon } from "../Icons/downIcon.svg";
import { ReactComponent as EditIcon } from "../Icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../Icons/delete.svg";


const getDotClass = (status) => {
    switch (status) {
      case 'In Progress':
        return 'dot-in-progress';
      case 'Pending':
        return 'dot-pending';
      case 'Completed':
        return 'dot-completed';
      default:
        return ''; // Default class if needed
    }
  };

const CollapsibleList = ({ list, deleteTodo,status }) => {
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const editTask = (value)=>{

    navigate("/editTask",{ state:value });
  }

  return (
    <div className="task-list">
      <div className="list-header" onClick={toggleList}>
        <div className="list-title">{status}({list?.length})</div>
        <div className="list-toggle-icon">
          {isOpen ? (
            <UpIcon style={{ width: "10px" }} />
          ) : (
            <DownIcon style={{ width: "10px" }} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="list-items">
          {list
            ?.slice()
            .reverse()
            .map((item, index) => (
              <div key={index} className="list-item">
                <div className="list-item-left">
                  <div className="list-item-icon">{item?.title[0]}</div>
                  <div className="list-item-content">
                    <div className="list-item-title">{item?.title}</div>
                    <div className="list-item-description">
                      {item?.description}
                    </div>
                    <div className="list-item-date">{item?.date}</div>
                  </div>
                </div>
                <div className="list-item-right">
                  <div className="statusContainer">
                    <div className={`status-dot ${getDotClass(item.status)}`}></div>
                    <div className="status-text">{item?.status}</div>
                  </div>
                  <div className="actionContainer">
                    <EditIcon style={{ width: "10px" }} onClick={()=>{
                        editTask(item) }} />
                    <DeleteIcon
                      style={{ width: "10px" }}
                      onClick={() => {
                        deleteTodo(item?.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleList;
