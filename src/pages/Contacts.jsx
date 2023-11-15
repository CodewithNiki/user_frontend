import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import Logout from "../component/Logout";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import ContactForm from "../component/ContactForm";
import DetailForm from "../component/DetailForm";
import useAuth from "../hook/useAuth";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/display-name
const Contacts = React.memo(() => {
  const [username, setUsername] = useState("");
  const [contacts, setContacts] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  // const [isEditOpen, setIsEditOpen] = useState(false);

  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      fetchCurrentUser(accessToken);
      fetchAllContacts(accessToken);
    }
  }, [accessToken]);

  const fetchCurrentUser = useCallback(async (accessToken) => {
    // Make an authenticated request to the "current" endpoint
    await axios
      .get("https://user-fgrs.onrender.com/api/users/current", {
        method: "GET",
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

  const fetchAllContacts = useCallback(async (accessToken) => {
    await axios
      .get("https://user-fgrs.onrender.com/api/contacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getContact = useCallback(
    async (accessToken, id) => {
      try {
        const response = await axios.get(
          `https://user-fgrs.onrender.com/api/contacts/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setContactDetails(response.data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    },
    [setContactDetails]
  );

  const handleContactClick = (id) => {
    const accessToken = localStorage.getItem("accessToken");

    getContact(accessToken, id);
    setIsOpen(true);
  };

  // Delete contact
  const deleteContact = async (accessToken, id) => {
    await axios
      .delete(`https://user-fgrs.onrender.com/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        const updatedContacts = contacts.filter(
          (contact) => contact._id !== id
        );
        setContacts(updatedContacts);
      })

      .catch((error) => {
        console.error("Error fetching contact details:", error);
      });
  };

  const handleDelContact = (id) => {
    deleteContact(accessToken, id);
    setIsOpen(false);
  };


  return (
    <div className=" w-full h-full grid grid-cols-7 ">
      <nav className=" col-span-2 p-6">
        <div className=" flex justify-between pb-6">
          <div className=" flex gap-2 px-2 py-1">
            <p className="text-green-500">Welcome,</p>
            <p className=" text-yellow-50"> {username.toUpperCase()}</p>
          </div>
          <Logout />
        </div>

        <div>
          <p className=" text-yellow-300 font-bold text-lg">My Contacts</p>
          <div>
            {contacts.map((contact) => {
              return (
                <div
                  key={contact._id}
                  className="text-zinc-200 capitalize flex justify-between bg-slate-700 hover:opacity-90 px-2 py-2 mb-2"
                >
                  <p
                    onClick={() => handleContactClick(contact._id)}
                    className=" cursor-pointer"
                  >
                    {contact.firstName} {contact.lastName}
                  </p>

                  <div className=" flex gap-3">
                    <Link to={contact._id} >
                      <FaEdit
                        className=" hover:scale-105 cursor-pointer"
                      />
                    </Link>
                    <FaRegTrashAlt
                      onClick={() => handleDelContact(contact._id)}
                      className=" hover:scale-105 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      <form className=" bg-green-200 col-span-5 ">
        <div className=" w-full h-full border ">
          <div className=" w-full h-1/2 flex flex-col justify-center items-center">
            {!isOpen && (
              <ContactForm contacts={contacts} setContacts={setContacts} />
            )}

            {isOpen && (
              <DetailForm
                setIsOpen={setIsOpen}
                contactDetails={contactDetails}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default Contacts;
