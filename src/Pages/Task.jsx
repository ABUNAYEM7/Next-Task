import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaEye, FaShareAlt } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const [search,setSearch] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/task?searchParams=${search}`)
      .then((res) => res.json())
      .then((data) =>setTasks(data));
  }, [search]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-next-server.vercel.app/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = tasks.filter((task) => task._id !== id);
              setTasks(remaining);
            }
          });
      }
    });
  };

  const viewTaskHandler = (id) => {
    navigate(`/Tasks/ViewTask/${id}`);
  };

  const taskEditHandler = (id) => {
    navigate(`/Tasks/TaskEdit/${id}`);
  };

  const shareHandler = (id) => {
    const link = `${window.location.origin}/tasks/ViewTask/${id}`;
    setShareLink(link);
    shareModal.showModal();
  };

  const achieveHandler = (id) => {
    const task = tasks.find((t) => t._id === id);
    const achievedDate = new Date().toDateString();

    task.achievedDate = achievedDate;

    fetch(`https://task-next-server.vercel.app/completedTask`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          fetch(`https://task-next-server.vercel.app/tasks/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                const remaining = tasks.filter((task) => task._id !== id);
                setTasks(remaining);
                Swal.fire({
                  title: "Good Job Dude",
                  text: "Be Consistent Be a Achiever",
                  icon: "success",
                  confirmButtonText: "Congress",
                });
              }
            });
        }
      });
  };

  return (
    <div>
      {/* task-container */}
      <div className="bg-[#1d232a] my-6 rounded-lg p-6">
        <div className="flex flex-col gap-3">
        <div className="w-full lg:w-4/5 mx-auto p-4">
        <input
          onChange={(e)=>setSearch(e.target.value)}
          type="text"
          placeholder="Search Here"
          className="input input-bordered input-accent w-full"
        />
      </div>
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
              <div className="w-full md:w-2/3 flex flex-col items-center md:items-start justify-center gap-3">
                <h3 className="text-3xl font-bold ">{task.title}</h3>
                <p className="text-base font-medium">{task.task}</p>
                <p className="text-base font-medium">
                  Create Date : {task.date}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <button
                  onClick={() => taskEditHandler(task._id)}
                  className="btn"
                >
                  <FaPencilAlt className="text-green-500" />
                </button>
                <button
                  onClick={() => {
                    viewTaskHandler(task._id);
                  }}
                  className="btn"
                >
                  <FaEye className="text-green-500" />
                </button>
                <button onClick={() => deleteHandler(task._id)} className="btn">
                  <FaTrashAlt className="text-green-500" />
                </button>
                <button onClick={() => shareHandler(task._id)} className="btn">
                  <FaShareAlt className="text-green-500" />
                </button>
                <button
                  onClick={() => achieveHandler(task._id)}
                  className="btn btn-outline btn-accent col-span-2"
                >
                  Achieved
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* share-modal */}
        <dialog id="shareModal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-xl font-bold">Share Task</h3>
            <p className="mt-3">Copy the link to share the task with others:</p>
            <input
              type="text"
              defaultValue={shareLink}
              readOnly
              className="input input-bordered w-full mt-3 mb-3"
            />
            <div>
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="btn btn-primary"
              >
                Copy Link
              </button>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Task;
