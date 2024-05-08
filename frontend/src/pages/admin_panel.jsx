import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import imgSrc from '../assets/web.jpeg';
import { useNavigate } from "react-router-dom";

export default function(){

    const navigate = useNavigate();

      

        const [label,setlabel] = useState([]);
        const [data,setdata] = useState([]);
        const [datafetch, setdatafetch] = useState(false);
        const [graph,setgraph] = useState([['A','B','C','D'],[10,23,20,34]]);
        

            

    return(
        <>
        <div className="absolute  pt-1 px-1">
                    <div className="rectangular-box">
                        <h1>Brunel</h1>
                        </div> 
                        
        <div>
                <button className="btn btn-primary rounded-md mr-10 mt-10" onClick= {() => navigate('/employer_form')}>Get Projects</button> 
        </div>

        </div>
                    <div className="absolute pt-40 pb-5">
                        <img src = {imgSrc} alt = "Photo" className="rounded-image" />
                    </div>


            
                
            
        

        </>
        

    )
}