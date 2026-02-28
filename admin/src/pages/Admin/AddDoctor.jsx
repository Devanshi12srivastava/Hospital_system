import { assets } from "../../assets/assets_admin/assets";

const AddDoctor = () => {
  return (
    <div>
      <form className="m-5 w-full">
        <p className="font-medium text-lg mb-3">Add Doctor</p>
        <div className="bg-white px-8 py-8 border border-white rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
          <div className="flex items-center gap-4 mb-8 text-gray-600">
            <label htmlFor="doc-img">
              <img className="w-16 bg-gray-200 rounded-full cursor-pointer"src={assets.upload_area} alt="" />
            </label>
            <input type="file" id="doc-img" hidden />
            <p>Upload Picture</p>
          </div>
          <div className="flex felc-col lg:flex-row items-start gap-10 text-gray-600">
            <div>
              <div>
                <p>Doctor Name</p>
                <input type="text" placeholder="Name" required />
              </div>
              <div>
                <p>Doctor email</p>
                <input type="email" placeholder="email" required />
              </div>

              <div>
                <p>Doctor password</p>
                <input type="password" placeholder="password" required />
              </div>

              <div>
                <p>Doctor Experience</p>
                <select name="" id="">
                  <option value="" disabled>
                    {" "}
                    select
                  </option>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                </select>
              </div>
              <div>
                <p>Doctor Fees</p>
                <input type="text" placeholder="Fess. Rs" required />
              </div>

              <div>
                <div>
                  <p>Speciality</p>
                  <select>
                    <option value="" hidden>
                      Select
                    </option>
                    <option value="">General Physician</option>
                    <option value="">Gynecologist</option>
                    <option value="">Dermatologist</option>
                    <option value="">Pediatricans</option>
                    <option value="">Neuro</option>
                    <option value="">Gasterologist</option>
                  </select>
                </div>

                <div>
                  <p>Education</p>
                  <input type="text" placeholder="education" />
                </div>
                <div>
                  <p>Address</p>
                  <input type="text" placeholder="Address" />
                </div>
              </div>
            </div>

            <div>
              <p>About Me</p>
              <textarea placeholder="something" row={5}></textarea>
            </div>
          </div>
          <button>Add Doctor</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
