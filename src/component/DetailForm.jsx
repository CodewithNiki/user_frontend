/* eslint-disable react/prop-types */

const DetailForm = ({ setIsOpen, contactDetails }) => {
  return (
    <>
      <div className=" text-2xl">
        <p className=" capitalize text-slate-700">
          Contact details
        </p>
      </div>

      <div className=" text-green-700 text-xl flex flex-col gap-3 py-3">
        <p className=" capitalize">First Name : {contactDetails.firstName}</p>
        <p className=" capitalize">Last Name : {contactDetails.lastName}</p>
        <p className=" capitalize">
          Phone Number : {contactDetails.phoneNumber}
        </p>
        <p className=" capitalize">Email Address : {contactDetails.email}</p>
        <div className=" flex gap-4">
          <button
            className=" text-white text-lg font-semibold bg-green-800 px-6 py-2 rounded-2xl hover:bg-green-500 mx-auto"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailForm;
