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
      Location : '',
      Arrival_deadline:''
    };
  
  
    const [formData, setFormData] = useState(initialFormData);

   const subform = (event)=>{
      axios.post(
      "http://127.0.0.1:8000/user/employer/",
      {
        "name": formData.Jobname,
        "skills":formData.Skillrequirement,
        "budget":parseInt(formData.budget),
        "arrival_deadline":parseInt(formData.Arrival_deadline),
        "location":formData.Location
      }) 
      .then((response)=>{
        console.log(response)
        alert("Saved Succesfully")
        handleClear()
        }
      )
      .catch((error) => {
          console.log(error.message);
        }
      )}
      
    const handleClear = () => {
      console.log(formData)
      setFormData(initialFormData);
      
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value, 
      }
      );
      console.log(formData)
    };
    



    return(
      <div className="flex flex-col pt-32 justify-center px-0 pb-20">
        <div className="grid grid-flow-col grid-cols-11">
          <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-5 col-start-4">
            <div className="font-bold pb-10 text-3xl">
              Employer Form
              </div>

      
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] mx-20" >Job Name </label>
           <input
           type="text"
             id="Jobname"
             name="Jobname"
             value = {formData.Jobname}
             onChange={handleChange}
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>

          <div className="flex justify-center mx-20 mb-5">
            <label className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10">Requirement for Task </label>
            <input
              type="text"
              id="Skillrequirement"
              name="Skillrequirement"
              value={formData.Skillrequirement}
              onChange={handleChange}
              className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
              placeholder="Enter Skills"
            />
          </div>
         
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-14 mr-10 pl-2" >Budget allotted </label>
           <input
           type="text"
             id="budget"
             name="budget"
             value = {formData.budget}
             onChange={handleChange}
             placeholder="Enter the value in INR"
             className="border rounded w-17 px-2 py-1 ml-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>

           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" > Arrival Deadline </label>
           <input
           type="text"
             id="Arrival_deadline"
             name="Arrival_deadline"
             value = {formData.Arrival_deadline}
             onChange={handleChange}
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
             placeholder="Enter an Integer"
           />
           </div>

           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" >Location</label>
           <input
           type="text"
             id="Location"
             name="Location"
             value = {formData.Location}
             onChange={handleChange}
             placeholder="Enter an Integer"
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
      

             
                <div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={subform}>Save</button>
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>
              
                 
                
          
          </div>
        </div>
      </div>
    
    
    )
}
