import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function(){
    
  const navigate = useNavigate();


  

    const initialFormData = {
      name: '',
      emailid : ''
    };
  
  
    const [formData, setFormData] = useState(initialFormData);
    const [formfill, setformfill] = useState(false);
   
    

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  ;
      if (formData.name == '' || formData.emailid == '') {
        setformfill(false);
        console.log('Fill fields');
    } else {
        // Form is valid, submit the data or perform other actions
        console.log('Form submitted:', formData);
        setformfill(true);
    }
      console.log(formData)
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Fill the fields');
  };



    return(
      <div className="flex flex-col pt-32 justify-center px-0 pb-20">
        <div className="grid grid-flow-col grid-cols-11">
          <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-5 col-start-4">
         <div>
           <h1 style={{ color: 'green', fontStyle: 'italic', fontFamily: 'Covered By Your Grace',fontSize: '30px' }}>
                Registration Form
            </h1>
            </div>
            <div className="font-semibold pt-3 pb-5 text-3xl">
              Start your Success 
              </div>
              <div className="font-semibold pb-10 text-3xl">
              Journey here! 
              </div>


      
           <div className="flex justify-center pt-2 mx-20 mb-5">
           <input
           type="text"
             id="name"
             name="name"
             value = {formData.name}
             onChange={handleChange}
             className="border-2 rounded-md w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
              placeholder="Enter your Name"/>
           </div>

          <div className="flex justify-center mx-20 mb-5">
      
            <input
              type="email"
              id="emailid"
              name='emailid'
              value={formData.emailid}
              onChange={handleChange}
              className="border-2 rounded-md w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
              placeholder="Enter your Email id"
            />
          </div>
          <div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick= {() => navigate('/admin_panel')}>Close</button> 
              </div>
              {formfill ? (
            <div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick= {() => navigate('/employer_offline')}>Submit</button> 
              </div>) : ( <div className=""><button className="btn btn-primary rounded-md mr-10 mt-10" onClick={handleSubmit}>Submit</button> 
              </div> ) }


        </div>
        </div>
      </div>
    
    
    )
}
