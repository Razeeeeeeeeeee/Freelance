import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



export default function(){

 // Import useHistory from React Router
    const navigate = useNavigate();
  
    const [seconds, setSeconds] = useState(5); // Initial countdown time in seconds

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1); // Decrease seconds by 1 every second
        }, 1000); // 1000 milliseconds = 1 second

        return () => clearInterval(countdownInterval); // Clean up the interval on unmount
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            // Redirect to the desired page when the countdown reaches 0
            navigate('/admin_panel') // Replace '/destination' with the actual path
        }
    }, [seconds, history]);

    
return(

    <div className="flex  flex-row pt-32 justify-center px-0 pb-20">
    <div className="grid grid-flow-col grid-cols-11">
      <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 mr-10 drop-shadow-lg grid col-span-5 col-start-4">
      <div>
           <h1 style={{ color: 'green', fontStyle: 'italic', fontFamily: 'Covered By Your Grace',fontSize: '30px' }}>
                Success Submitted
            </h1>
            </div>
            <div className="font-semibold pt-3 pb-5 text-3xl">
              Congratulations
              </div>

         <div className="font-normal pb-10 mt-7 text-2xl">
           Your request has been successfully submitted to us. We will validate your information and reach out to you shortly with updates
          </div>

          <div className='font-normal pt-10 mt-7 text-1xl'> Redirecting you to Homepage after {seconds} seconds</div>

         
    </div>

 </div>
</div>
    
)}    