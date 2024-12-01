import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Task from "../Pages/Task";
import CompletedTask from "../Pages/CompletedTask";
import Home from "../Pages/Home";
import SingIn from "../Pages/SingIn";
import Tasks from "../Pages/Tasks";
import TaskEdit from "../Pages/TaskEdit";
import ViewTask from "../Pages/ViewTask";
import LogIn from "../components/LogIn";
import Register from "../components/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";



const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element ={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="Tasks" element={<PrivateRoute><Tasks/></PrivateRoute>}>

        <Route index element={<Task/>}/>
        <Route path="/Tasks/TaskEdit/:id" element={<TaskEdit/>}/>
        <Route path="/Tasks/ViewTask/:id" element={<ViewTask/>}/>

        </Route>
        <Route path="CompletedTask" element ={<PrivateRoute><CompletedTask/></PrivateRoute>}/>
        <Route path="SignIn" element ={<SingIn/>}>
          <Route index element={<LogIn/>}></Route>
          <Route path="/SignIn/Register" element={<Register/>}></Route>
        </Route>  
        </Route>
    </Routes>
  )
}

export default AppRoutes
