import React, { useState } from "react";
import Card from '../components/card'
import { Link } from "react-router-dom";

export default function(){

    const [file, setFile] = useState();
    function handleFileChange(event){
        setFile(event.target.files[0]);
    }
    return(
        <>
        <Card>
            <div className="font-bold text-3xl">
                Candidate Description
            </div>
            <div className="flex justify-center items-baseline pt-16 pr-10 pl-10 align-baseline px-20">
                <div className="p-0 m-0 pr-10 "> Upload an excel file containing the job details</div>
                <button className="btn btn-ghost m-5 px-3 py-2 rounded-lg" form="file_upload">Submit</button> 
            </div>
            <form id="file_upload">
                <div className="flex justify-center mt-0 p-0"><input className="flex file-input w-full max-w-xs rounded-lg text-xs " id="f" type="file"></input></div>
            </form>
            <div className="pt-10 font-light text-gray-400 text-sm">If you want to enter the details manually, <Link className="underline text-zinc-900 " to="/candidate_manual">Click here!</Link> </div>
            
      </Card>
        </>
    )
}