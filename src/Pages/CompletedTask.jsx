import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CompletedTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`task-next-server.vercel.app/completedTask`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const historyHandler = () => {
    fetch("task-next-server.vercel.app/completedTask", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([]);
        Swal.fire({
          title: "History Cleared",
          text: "Be Consistent Be a Achiever",
          icon: "success",
          confirmButtonText: "Congress",
        });
      });
  };

  return (
    <div className="bg-[#1d232a] min-h-[500px]  my-6 rounded-lg p-4">
      <div className="w-full flex items-center justify-end p-2">
        <button onClick={historyHandler} className="btn btn-success text-white">
          Clear History
        </button>
      </div>
      <div className="flex flex-col  gap-3">
        {tasks.length === 0 && (
          <p className="text-3xl font-bold text-red-500 text-center my-6">
            No Task Available
          </p>
        )}
        {tasks.map((task) => (
          <div
            className="bg-black flex flex-col md:flex-row items-center justify-between gap-5 p-4 rounded-lg border-2 border-green-500"
            key={task._id}
          >
            <div className="flex flex-col items-center md:items-start justify-center gap-3">
              <h3 className="text-3xl font-bold ">{task.title}</h3>
              <p className="text-base font-medium">{task.task}</p>
              <p className="text-base font-medium">{task.date}</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-3">
              <h3 className="text-base font-medium">
                Data Formate :
                <span className="text-xl font-semibold pl-2">
                  {task.dataFormate}
                </span>
              </h3>
              <h3 className="text-base font-medium">
                Data Type :
                <span className="text-xl font-semibold pl-2">
                  {task.dataType}
                </span>
              </h3>
              <h3 className="text-base font-medium">
                Created:
                <span className="text-xl font-semibold pl-2">{task.date}</span>
              </h3>
              <h3 className="text-base font-medium">
                Completed:
                <span className="text-xl font-semibold pl-2">
                  {task.achievedDate}
                </span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTask;
