import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hook/useAuth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EditContact = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { accessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchCurrentUser(accessToken);
    getContact(accessToken, id);
  }, [accessToken, id]);

  const fetchCurrentUser = useCallback(async (accessToken) => {
    // Make an authenticated request to the "current" endpoint
    await axios
      .get("https://user-fgrs.onrender.com/api/users/current", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        const decoded = jwtDecode(accessToken);
        // console.log(decoded)
        setUsername(decoded.user.username);
      })
      .catch((error) => {
        // Handle any errors here, such as unauthorized access
        console.error(error);
      });
  }, []);

  const getContact = useCallback(
    async (accessToken, id) => {
      try {
        const response = await axios.get(
          `https://user-fgrs.onrender.com/api/contacts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setError(null);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNumber(response.data.phoneNumber);
      } catch (error) {
        setError(error.response.data.message);
      }
    },
    [accessToken, id]
  );

  const updateContact = async (accessToken, id) => {
    await axios
      .put(
        `https://user-fgrs.onrender.com/api/contacts/${id}`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveClick = (id) => {
    updateContact(accessToken, id);
  };

  return (
    <div className=" w-1/2 flex flex-col justify-center items-center ">
      <div className="text-yellow-300 font-bold text-xl">Edit contact</div>
      <p className=" text-left w-1/2 text-green-500 font-thin text-lg pt-4 ">
        <span className=" capitalize">Hello {username}</span>, what will you
        like to change?
      </p>
      <div className="flex flex-col gap-6 pb-4 w-1/2">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          className="px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className="px-2 py-3 outline-none rounded-lg placeholder:text-green-700 bg-gray-200"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button
        onClick={() => handleSaveClick(id)}
        className="text-white text-lg font-semibold bg-green-800 px-12 py-2 rounded-2xl hover:bg-green-500"
      >
        Save
      </button>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default EditContact;
