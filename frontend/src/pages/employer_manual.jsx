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
      no_tasks:'',
      mode: 'offline',
      Ad_date: '',
      dead_date:'',
    };
  
  
    const [formData, setFormData] = useState(initialFormData);

      const [numTasks, setNumTasks] = useState(0);
      const [tasks, setTasks] = useState([]);
    
      const handleNumTasksChange = (e) => {
        const count = (e.target.value);
        setNumTasks(count);
        setTasks(Array.from({ length: count }, () => ({ job_name:'', budget:'', max_workers: '', min_workers: '', requirements: ''  })));
      };
    
      const handleTaskChange = (index, field, value) => {
        setTasks((prevTasks) =>
          prevTasks.map((task, i) => (i === index ? { ...task, [field]: value } : task))
        );
      };

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
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" >No of Tasks</label>
           <input
           type="number"
             id="no_tasks"
             name="no_tasks"
             value = {numTasks}
             onChange={handleNumTasksChange}
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
             placeholder="Enter an Integer"
           />
           </div>


           {tasks.map((task, index) => (
          <div key={index}> 

            <div className="font-bold pb-10 text-3xl">
              Task {index + 1}
              </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] mx-20" >Job Name {index+1}</label>
           <input
           type="text"
             id="Jobname"
             name="Jobname"
             value = {task.job_name}
             onChange={(e) => handleTaskChange(index, 'job_name', e.target.value)}
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
          <div className="flex justify-center mx-20 mb-5">
            <label htmlFor={`requirement${index}`} className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10">Requirement for Task {index + 1}</label>
            <input
              type="text"
              id={`requirement${index}`}
              name={`requirement${index}`}
              value={task.requirement}
              onChange={(e) => handleTaskChange(index, 'requirements', e.target.value)}
              className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
              placeholder={`Requirement for Task ${index + 1}`}
            />
          </div>
         
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-14 mr-10 pl-2" >Budget allotted {index+1}</label>
           <input
           type="text"
             id="budget"
             name="budget"
             value = {tasks.budget}
             onChange={(e) => handleTaskChange(index, 'budget', e.target.value)}
             placeholder="Enter the value in INR"
             className="border rounded w-17 px-2 py-1 ml-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" >Max Workers Required {index+1}</label>
           <input
           type="text"
             id="max_workers"
             name="max_workers"
             value = {tasks.max_workers}
             onChange={(e) => handleTaskChange(index, 'max_workers', e.target.value)}
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
             placeholder="Enter an Integer"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" >Min Workers Required {index+1}</label>
           <input
           type="text"
             id="min_workers"
             name="min_workers"
             value = {tasks.min_workers}
             onChange={(e) => handleTaskChange(index, 'min_workers', e.target.value)}
             placeholder="Enter an Integer"
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
          
          </div>
        ))}

       
  
           <div className="mb-4">
                 <label className="mt-3 ml-10 mr-8 block text-base font-medium text-[#07074D]">Job Location</label>
           <select
             id="mode"
             name="mode"
             value = {formData.mode}
             onChange= {handleChange}
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
                       Advertisement Date
                       </label>
                       <input
                         type="date"
                         name="Ad_date"
                         id="Ad_date"
                         value = {formData.Ad_date}
                        onChange= {handleChange}
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
                       Deadline Date
                       </label>
                       <input
                         type="date"
                         name="dead_date"
                         id="dead_date"
                         value = {formData.dead_date}
                         onChange= {handleChange}
                         className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                       />
                     </div>
                 </div>
                 
                {formData.mode == "online" ? 
                (<div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" >Save</button>
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>) : 
                (<div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={()=> navigate('/employer_offline')}>Next</button> 
                <button  onClick ={handleClear} className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button></div>
                )}
                 
                
          

        </div>
      </div>
    </div>
    
    )
}
