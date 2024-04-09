import React from "react";
import Card from '../components/card'
import { useNavigate } from "react-router-dom";

export default function(){

    const navigate = useNavigate();
    
return(

    <Card>
        <div className="">
            <div className="font-bold text-3xl pb-10">
            Choose one from below
            </div>
        <button className="btn btn-primary rounded-md mr-10" onClick={()=> navigate('/employer')}>Employer</button>
        <button className="btn btn-primary rounded-md ml-10" onClick={()=> navigate('/candidate')}>Candidate</button>
        </div>
        </Card>

)}    