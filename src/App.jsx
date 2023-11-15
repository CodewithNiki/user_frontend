import { Outlet } from "react-router-dom";

const App = () => {

  return (
    <div className=" bg-gray-800 w-screen h-screen overflow-y-hidden md:flex items-center justify-center">
      <Outlet/>
    </div>
  )

}

export default App