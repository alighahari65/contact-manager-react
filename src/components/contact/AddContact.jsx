import { Link, useNavigate } from "react-router-dom";

import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import Spinner from "../Spinner";
import { useState } from "react";
import { createContact } from "../../services/contactService";

const AddContact = ({ loading, groups }) => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState("");
  const [job, setJob] = useState("");
  const [group, setGroup] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("ali");
      const user = { fullname, mobile, email, job, photo, group };
      console.log(user);
      const {status} = await createContact(user);

      if (status === 201) {
        reset();
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setFullname("");
    setMobile("");
    setPhoto("");
    setEmail("");
    setJob("");
    setGroup("");
  };
  

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/landing.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={handleSubmitForm}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="job"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className="form-control"
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group, index) => (
                            <option key={index} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ساخت مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
