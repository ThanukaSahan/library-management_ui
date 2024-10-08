import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import JWTService from "../common/JWTService";
import { useNavigate } from "react-router-dom";
import ViewAuthor from "./ViewAuthor";

const Author = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [bography, setBiography] = useState("");
  const [nationality, setNationality] = useState("");
  const [authorDetails, setAuthorDetails] = useState([]);
  const [image64, setImage64] = useState({
    myFile: "",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [authId, setAuthId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!JWTService.pageAccess("Admin,Manager")) {
      navigate("/");
    }
    loadAuthorDetails();
  }, []);
  const token = JWTService.getToken();
  const loadAuthorDetails = async (e) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/author/AllAuthors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthorDetails(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSaveNew = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/author/createAuthor`,
        {
          Name: name,
          Email: email,
          Website: web,
          Biography: bography,
          Nationality: nationality,
          CreateUser: "",
          Image: image64.myFile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthorDetails(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleUpdateImage = async (e) => {
    debugger;
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      const maxSize = 4.8;

      if (fileSizeInMB > maxSize) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        return;
      } else {
        const base64 = await convertToBase64(file);
        setImage64({ ...image64, myFile: base64 });
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleViewAuthor = async (id) => {
    setIsOpenModal(true);
    setAuthId(id);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div>
      <div>
        <h1>Author</h1>
      </div>
      <form onSubmit={handleSaveNew}>
        <div className="w-4/5">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>

            <div className="w-1/2">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="w-1/2">
              <label>Website</label>
              <input
                type="text"
                value={web}
                onChange={(e) => setWeb(e.target.value)}
              ></input>
            </div>
          </div>
        </div>

        <div className="w-4/5">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label>Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              ></input>
            </div>
            <div className="w-1/2">
              <label>Bography</label>
              <textarea
                type="text"
                value={bography}
                onChange={(e) => setBiography(e.target.value)}
                rows="2"
                cols="50"
              ></textarea>
            </div>

            <div className="w-1/2">
              <label>Upload Image</label>
              <input
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUpdateImage(e)}
              />
            </div>
          </div>
        </div>
        <div className=" flex w-1/5 mt-4 space-x-3">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Reset
          </button>
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      <div className="mt-10 relative rounded-xl overflow-auto">
        <table className="table-auto w-full rounded">
          <thead>
            <tr className="bg-gray-400 justify-center text-center h-5">
              <th className="h-5">Name</th>
              <th>Email</th>
              <th>Website</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {authorDetails.map((item, index) => (
              <tr>
                <td value={index}>{item.Name}</td>
                <td value={index}>{item.Email}</td>
                <td value={index}>{item.Website}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-1/2"
                    onClick={() => handleViewAuthor(item._id)}
                  />
                  <FontAwesomeIcon
                    icon={faPen}
                    className="w-1/2"
                    values={item.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpenModal && (
        <>
          <ViewAuthor id={authId} onCloseModal={handleCloseModal}></ViewAuthor>
        </>
      )}
    </div>
  );
};
export default Author;
