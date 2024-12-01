import React, { useEffect, useState } from "react";
import { FaCopy, FaRegCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TaskEdit = () => {
  const [existTask, setExistTask] = useState(null);
  const [dataFormate, setDataFormate] = useState("Code");
  const [expireData, setExpireData] = useState("1 Month");
  const [dataType, setDataType] = useState("Public");
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const dataFormateHandler = (e) => {
    setDataFormate(e.target.value);
  };

  const expireDataHandler = (e) => {
    setExpireData(e.target.value);
  };

  const dataTypHandler = (e) => {
    setDataType(e.target.value);
  };

  useEffect(() => {
    fetch(`task-next-server.vercel.app/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExistTask(data);
        setDataFormate(data.dataFormate);
        setExpireData(data.expireData);
        setDataType(data.dataType);
        setTitle(data.title);
        setTask(data.task);
      });
  }, [id]);

  const createTaskHandler = (id) => {
    if (!title.trim()) {
      Swal.fire({
        title: "Title is required!",
        text: "Please provide a title before creating a task.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    } else if (!task.trim()) {
      Swal.fire({
        title: "Task is required!",
        text: "Please Write Task before creating a task.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    }

    const date = new Date().toDateString();

    const data = {
      dataFormate,
      dataType,
      expireData,
      title,
      task,
      date,
    };
    fetch(`task-next-server.vercel.app/tasks/editTask/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Your Task Is Updated",
          text: "Be Concern In Your Words",
          icon: "success",
          confirmButtonText: "Thanks",
        });
        navigate("/Tasks");
      });
  };

  {
    if (!existTask)
      return (
        <p className="my-6 text-center text-3xl font-bold text-green-500">
          Task Is Loading ....
        </p>
      );
  }

  return (
    <div className="w-full  lg:w-4/5 mx-auto p-4">
      {/* select-container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
        <div>
          <select
            onChange={dataFormateHandler}
            defaultValue={existTask.dataFormate}
            className="select select-success w-full max-w-xs"
          >
            <option>Code</option>
            <option>Text</option>
            <option>Json</option>
          </select>
        </div>
        <div>
          <select
            onChange={expireDataHandler}
            defaultValue={existTask.expireData}
            className="select select-success w-full max-w-xs"
          >
            <option>1 Month</option>
            <option>1 Year</option>
            <option>Never</option>
          </select>
        </div>
        <div>
          <select
            onChange={dataTypHandler}
            defaultValue={existTask.dataType}
            className="select select-success w-full max-w-xs"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => createTaskHandler(existTask._id)}
            className="btn bg-green-600 text-white hover:text-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>
      {/* input-container */}
      <div className="w-full  mx-auto my-5">
        <input
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={existTask.title}
          type="text"
          placeholder="Title"
          required
          className="input input-bordered input-accent w-full "
        />
      </div>
      {/* task-container */}
      <div className="my-5 bg-[#333333] min-h-[550px] rounded-lg">
        {/* copy and circle-container */}
        <div className="px-5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaRegCircle className="rounded-full bg-orange-400" />
            <FaRegCircle className="rounded-full bg-yellow-400" />
            <FaRegCircle className="rounded-full bg-green-400" />
          </div>
          <div>
            <button>
              <FaCopy size={20} />
            </button>
          </div>
        </div>
        {/* task-container */}
        <div className="m-1 rounded-lg min-h-[500px]">
          <textarea
            defaultValue={existTask.task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write Your Content Here"
            className="textarea textarea-bordered textarea-lg w-full min-h-[500px]"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
