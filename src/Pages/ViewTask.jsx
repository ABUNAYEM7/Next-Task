import React, { useEffect, useState } from "react";
import { FaCopy, FaRegCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ViewTask = () => {
  const [task, setTask] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`task-next-server.vercel.app/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  {
    if (!task)
      return (
        <p className="my-6 text-center text-3xl font-bold text-green-500">
          Task Is Loading ....
        </p>
      );
  }

  return (
    <div>
      <div className="w-full  mx-auto my-5">
        <input
          defaultValue={task.title}
          type="text"
          placeholder="Title"
          required
          readOnly
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
            defaultValue={task.task}
            readOnly
            placeholder="Write Your Content Here"
            className="textarea textarea-bordered textarea-lg w-full min-h-[500px]"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
