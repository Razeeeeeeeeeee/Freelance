import React, { useState } from "react";
import Card from '../components/card'
import { Link } from "react-router-dom";
import axios from 'axios';

export default function(){

    const [file, setFile] = useState();
    const [name,setName] = useState("");

    function handleFileChange(event){
        setFile(event.target.files[0])
        setName(event.target.files[0].name)
        console.log(name)
        console.log(file)
    }

    const handlesubmit = async (event) =>{
        event.preventDefault();
        let formdata = new FormData();

        formdata.append("file",file)
        formdata.append("name",name)

        try{
            const response = await axios.post("http://localhost:8000/api/candidate_upload/",formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            
            console.log(response);
            alert("File upload successful");}
            
            catch(error) {
                if (error.response) { // get response with a status code not in range 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) { // no response
                    console.log(error.request);
                  } else { // Something wrong in setting up the request
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            };

    }


    return(
        <>
        <Card>

<div className="font-bold text-3xl">
        Job Description
    </div>
    <div className="flex justify-center items-baseline pt-16 pr-10 pl-10 align-baseline px-20">
        <div className="p-0 m-0 pr-10 "> Upload an excel file containing the job details</div>
        <button className="btn btn-ghost m-5 px-3 py-2 rounded-lg" form="file_upload" onClick={handlesubmit}>Submit</button> 
    </div>
    <form id="file_upload">
        <div className="flex justify-center mt-0 p-0"><input className="flex file-input w-full max-w-xs rounded-lg text-xs " id="f" type="file" onChange={ (evnt)=>{handleFileChange(evnt)} }></input></div>
    </form>
    <div className="pt-10 font-light text-gray-400 text-sm">If you want to enter the details manually, <Link className="underline text-zinc-900 " to="/employer_form">Click here!</Link> </div>


</Card>
        </>
    );
}