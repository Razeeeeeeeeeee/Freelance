import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function(){
    
    const navigate = useNavigate();


  

    const initialFormData = {
      Jobname: '',
      Skillrequirement: '',
      budget: '',
      max_workers: '',
      min_workers: '',
      mode: 'offline',
      Ad_date: '',
      dead_date:'',
    };
  
  
    const [formData, setFormData] = useState(initialFormData);


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
              Candidate Form
              </div>

      
       
          <div className="flex justify-center ml-20 mr-10 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-10 mr-10" >Candidate Name</label>
           <input
           type="text"
             id="Jobname"
             name="Jobname"
             value = {formData.Jobname}
             onChange={handleChange}
             className="border rounded w-17 py-1 pl-8 mr-10 ml-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center ml-20 mr-10 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-14 mr-20" >Skills</label>
           <input
           type="text"
             id="Skillrequirement"
             name="Skillrequirement"
             value = {formData.Skillrequirement}
             onChange={handleChange}
             className="border rounded w-17 pr-0 mr-0 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-14 mr-10 pl-2" >Desired Salary</label>
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
                 
                {formData.mode == "online" ? 
                (<div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" >Save</button>
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>) : 
                (<div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={()=> navigate('/offlline_mode_candi')}>Next</button> 
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>
                )}
                 
                
          

        </div>
      </div>
    </div>
    
    )
}
