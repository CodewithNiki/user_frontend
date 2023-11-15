import { useState } from "react";
import axios from "axios";
import useAuth from "../hook/useAuth";

// eslint-disable-next-line react/prop-types
const ContactForm = ({ contacts, setContacts,  }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const { accessToken } = useAuth();

  const createContact = async (e) => {
    e.preventDefault();

    const contactDetails = { firstName, lastName, email, phoneNumber };

    if (!accessToken) {
      // Handle the case where the token is missing or invalid
      setError("User is not authorized, please login/register");
      return;
    }

    await axios
      .post("https://user-fgrs.onrender.com/api/contacts", contactDetails, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setContacts([...contacts, response.data]);
        setEmail("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
      })
      .catch((error) => {
        console.error("Adding contact failed:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred during creating.");
        }
      });
  };

  return (

    <>
      <div className=" text-xl text-slate-700 md:pt-8 pt-3">Create contact</div>

      <div className=" flex flex-col gap-6 py-4 w-1/2">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className=" px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200  "
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className=" px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200 "
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          className="px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className="px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200 "
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button
        onClick={createContact}
        className=" text-white text-lg font-semibold bg-green-800 px-6 py-2 rounded-2xl hover:bg-green-500"
      >
        Add
      </button>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </>
  );
};

export default ContactForm;
