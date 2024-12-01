import { useContext, useState } from "react";
import { FaCopy, FaRegCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { TaskContext } from "../AuthProvider/AuthProvider";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const [dataFormate, setDataFormate] = useState("Code");
  const [expireData, setExpireData] = useState("1 Month");
  const [dataType, setDataType] = useState("Public");
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const { loading } = useContext(TaskContext);

  const dataFormateHandler = (e) => {
    setDataFormate(e.target.value);
  };

  const expireDataHandler = (e) => {
    setExpireData(e.target.value);
  };

  const dataTypHandler = (e) => {
    setDataType(e.target.value);
  };

  const createTaskHandler = () => {
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
    fetch("https://task-next-server.vercel.app/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Task Saved",
            text: "Please Do It Soon",
            icon: "success",
            confirmButtonText: "Cool",
          });
          setDataFormate("Code");
          setDataType("Public");
          setExpireData("1 MOnth");
          setTask("");
          setTitle("");
        } else {
          Swal.fire({
            title: "Failed To Save Task",
            text: "Please Try Again",
            icon: "error",
            confirmButtonText: "Thanks",
          });
        }
      });
  };

  if (loading) {
    return (
      <div className="w-full lg:w-4/5 mx-auto p-4">
        {/* select-container skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <Skeleton height={40} />
            </div>
          ))}
          <div>
            <Skeleton height={40} />
          </div>
        </div>

        {/* input-container skeleton */}
        <div className="w-full mx-auto my-5">
          <Skeleton height={40} />
        </div>

        {/* task-container skeleton */}
        <div className="my-5 bg-[#333333] min-h-[550px] rounded-lg">
          {/* copy and circle-container skeleton */}
          <div className="px-5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} circle width={20} height={20} />
              ))}
            </div>
            <Skeleton width={20} height={20} />
          </div>

          {/* textarea skeleton */}
          <div className="m-1 rounded-lg min-h-[500px]">
            <Skeleton height={500} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  lg:w-4/5 mx-auto p-4">
      {/* select-container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
        <div>
          <select
            onChange={dataFormateHandler}
            defaultValue={dataFormate}
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
            defaultValue={expireData}
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
            defaultValue={dataType}
            className="select select-success w-full max-w-xs"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
        <div>
          <button
            onClick={createTaskHandler}
            className="btn bg-green-600 text-white hover:text-green-600"
          >
            Create Task
          </button>
        </div>
      </div>
      {/* input-container */}
      <div className="w-full  mx-auto my-5">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
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
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Write Your Content Here"
            className="textarea textarea-bordered textarea-lg w-full min-h-[500px]"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
