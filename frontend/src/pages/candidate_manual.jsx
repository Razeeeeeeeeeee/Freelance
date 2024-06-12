import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function(){
    
    const navigate = useNavigate();
    const initialFormData = {
      Jobname: '',
      Skillrequirement: '',
      budget: '',
      mode: 'offline',
      Ad_date: '',
      dead_date:'',
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [preferences, setPreferences] = useState(['', '', '', '']);
    
    const subform = (event)=>{
      console.log("Preferences",preferences);
      const preference_string = preferences.join(',');
      axios.post(
      "http://127.0.0.1:8000/user/candidate/",
      {
        "Candi_name": formData.Jobname,
        "mode":formData.mode,
        "Skills":formData.Skillrequirement,
        "Payment":parseInt(formData.budget),
        "Start_date":formData.Ad_date,
        "End_date":formData.dead_date,
        "Preferences": preference_string
      }) 
      .then((response)=>{
        console.log(response.data)
        alert("Saved Succesfully")
        handleClear()
        }
      )
      .catch((error) => {
      
          console.log(error.message);
        }
      )}
    
    const handleClear = () => {
      setFormData(initialFormData);
      setPreferences(['','','','']);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value, 
      }
      );
      console.log(formData)
    };

    const handlePreferenceChange = (e, index) => {
      const updatedPreferences = [...preferences];
      updatedPreferences[index] = e.target.value;
      setPreferences(updatedPreferences);
    };


    return(
      <div className="flex flex-col pt-32 justify-center px-0 pb-20">
        <div className="grid grid-flow-col grid-cols-11">
          <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-5 col-start-4">
            <div className="font-bold pb-10 text-3xl">
              Candidate Form
              </div>

      
       
          <div className="flex ml-20 mr-10 mb-5 justify-between">
           <label  className="align-baseline font-medium text-[#07074D]" >Candidate Name</label>
           <input
           type="text"
             id="Jobname"
             name="Jobname"
             value = {formData.Jobname}
             onChange={handleChange}
             className="border rounded text-gray-700 align-baseline pl-2 "
           />
           </div>
           <div className="flex ml-20 mr-10 mb-5 justify-between">
           <label  className="align-baseline font-medium text-[#07074D]" >Skills</label>
           <input
           type="text"
             id="Skillrequirement"
             name="Skillrequirement"
             value = {formData.Skillrequirement}
             onChange={handleChange}
             className="border rounded text-gray-700 align-baseline pl-2"
           />
           </div>
           <div className="flex ml-20 mr-10 mb-5 justify-between">
           <label  className="align-baseline font-medium text-[#07074D]" >Desired Salary</label>
           <input
           type="text"
             id="budget"
             name="budget"
             value = {formData.budget}
             onChange={handleChange}
             placeholder="Enter the value in INR"
             className="border rounded w-17 text-gray-700 align-baseline pl-2"
           />
           </div>

           <div className="mb-4">
                 <label className="mt-3 ml-10 mr-8 block text-base font-medium text-[#07074D]">Mode</label>
           <select
             id="mode"
             name="mode"
             value = {formData.mode}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
         
             <option value="online" className="text-green-500">Online</option>
             <option value="offline" className="text-red-500">Offline</option>
           </select>
           </div>

           <div className="flex-wrap pt-8">
                     <div className="mb-4">
                       <label
                         htmlFor="date"
                         className="mb-3 block text-base font-medium text-[#07074D]"
                       >
                       Available from 
                       </label>
                       <input
                         type="date"
                         name="Ad_date"
                         id="Ad_date"
                         value = {formData.Ad_date}
                         onChange={handleChange}
                         className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                       />
                     </div>
                 </div>
                 <div className="flex-wrap pt-4">
                     <div className="mb-5">
                       <label
                         htmlFor="dead_date"
                         className="mb-3 block text-base font-medium text-[#07074D]"
                       >
                       Available till 
                       </label>
                       <input
                         type="date"
                         name="dead_date"
                         id="dead_date"
                         value = {formData.dead_date}
                         onChange={handleChange}
                         className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                       />
                     </div>
                 </div>
                 <div className="flex justify-center">
                 <div className="mb-4 flex flex-col">
                    <label htmlFor="preferenceSelect" className="block text-gray-700 text-sm font-bold mb-4">
                                        Select Preference Order
                    </label>
            
               {preferences.map((preference, index) => (
            <select
              key={index}
              value={preference}
              onChange={(e) => handlePreferenceChange(e, index)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            >
              <option value="">Select...</option>
              <option value="FrontEnd">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Full Stack</option>
              <option value="Aiml">AI/ML</option>
            </select>
            
          ))}
        </div>
        </div>

                {formData.mode == "online" ? 
                (<div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={subform}>Save</button>
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>) : 
                (<div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={()=> navigate('/offlline_mode_candi')}>Next</button> 
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>
                )}
                 
                
          

        </div>
      </div>
    </div>
    
    )
}
