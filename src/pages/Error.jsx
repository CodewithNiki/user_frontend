import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className=" bg-gray-800 w-screen h-screen flex flex-col items-center justify-center text-slate-50">
      <p className=" text-4xl">Page not found</p>
      <p className=" text-green-400"><Link to="/">Go to home page</Link></p>
    </div>
  )
}

export default Error