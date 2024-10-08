import { useEffect, useState } from "react";
import AppUtility from "../common/AppUtility";
import axios from "axios";
import JWTService from "../common/JWTService";
import { useNavigate } from "react-router-dom";

const ViewAuthor = ({ id, onCloseModal }) => {
  const navigate = useNavigate();
  const apiUrl = AppUtility.getAPIUrl();
  const token = JWTService.getToken();
  const [authorObj, setAuthorObj] = useState({});
  useEffect(() => {
    loadAutor();
  }, [id]);

  const loadAutor = async () => {
    debugger;
    try {
      const response = await axios.get(`${apiUrl}/author/getById?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthorObj(response.data);
      console.log(authorObj);
      var x = 1;
    } catch (error) {
      debugger;
      if (error.response) {
        if (error.response.status === 401) {
          sessionStorage.setItem("isAuthenticated", "false");
          JWTService.setToken("");
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    console.log("Updated authorObj:", authorObj);
  }, [authorObj]);

  const handleCloseModal = (e) => {
    e.preventDefault();
    onCloseModal();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* <div className="modal-header invisible hidden">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> */}
          <div className="modal-body">
            <div
              style={{
                backgroundImage: `url(${authorObj.Image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundSize: "contain",
              }}
            >
              <div className="flex-col">
                <h1>{authorObj.Name}</h1>
                <p>{authorObj.Email}</p>
                <p>{authorObj.Website}</p>
                <div>{authorObj.Biography}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer" onClick={(e) => handleCloseModal(e)}>
            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-1/5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAuthor;
