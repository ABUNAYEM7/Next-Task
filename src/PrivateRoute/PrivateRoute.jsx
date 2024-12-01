import React, { useContext } from 'react'
import { TaskContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const PrivateRoute = ({children}) => {
    const {pathname} = useLocation()

    const{users,loading} = useContext(TaskContext)

    if(loading){
        return   <div className="w-full lg:w-4/5 mx-auto p-4">
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
    }

    if(users){
        return children;
    }
    
  return <Navigate state={pathname} to={'/SignIn'}></Navigate>
}

export default PrivateRoute
