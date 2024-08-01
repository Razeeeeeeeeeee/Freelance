import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function(){
    
    const navigate = useNavigate();
    const initialFormData = {
      Jobname: '',
      Skillrequirement: '',
      cost : '',
      velocity : '',
      max_dist : '',
      location : '',
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [preferences, setPreferences] = useState(['', '', '', '']);
    
    const subform = (event)=>{
      console.log("Preferences",preferences);
      const preference_string = preferences.join(',');
      axios.post(
      "http://127.0.0.1:8000/api/candidate/",
      {
        "name": formData.Jobname,
        "skills":formData.Skillrequirement,
        "cost":parseInt(formData.cost),
        "velocity":parseInt(formData.velocity),
        "max_distance":parseInt(formData.max_dist),
        "location":formData.location
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
           <label  className="align-baseline font-medium text-[#07074D]" >Location</label>
           <input
           type="text"
             id="location"
             name="location"
             value = {formData.location}
             onChange={handleChange}
             className="border rounded text-gray-700 align-baseline pl-2"
           />
           </div>
           <div className="flex ml-20 mr-10 mb-5 justify-between">
           <label  className="align-baseline font-medium text-[#07074D]" >cost</label>
           <input
           type="text"
             id="cost"
             name="cost"
             value = {formData.cost}
             onChange={handleChange}
             placeholder="Enter the value in INR"
             className="border rounded w-17 text-gray-700 align-baseline pl-2"
           />
           </div>

           <div className="flex ml-20 mr-10 mb-5 justify-between">
           <label  className="align-baseline font-medium text-[#07074D]" >velocity</label>
           <input
           type="text"
             id="velocity"
             name="velocity"
             value = {formData.velocity}
             onChange={handleChange}
             placeholder="Enter the value in m/s"
             className="border rounded w-17 text-gray-700 align-baseline pl-2"
           />
           </div>

           <div className="flex ml-20 mr-10 mb-5 justify-between">
           <label  className="align-baseline font-medium text-[#07074D]" >Maximum Distance</label>
           <input
           type="text"
             id="max_distance"
             name="max_distance"
             value = {formData.distance}
             onChange={handleChange}
             placeholder="Enter the value in m"
             className="border rounded w-17 text-gray-700 align-baseline pl-2"
           />
           </div>

               
                <div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={subform}>Save</button>
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>
               
                 
          
        </div>
      </div>
    </div>
    
    )
}
