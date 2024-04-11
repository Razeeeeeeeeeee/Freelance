import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';




export default function(){

    const simulate = (event)=>{
        event.preventDefault();

        try{
            axios.get("http://localhost:8000/api/run_simulation/",{responseType: 'blob'})
                .then((response)=>{
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Generated_file.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                })
        }
        catch(error){
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
         <div className="flex flex-col pt-32 justify-center px-0 pb-20">
            <div className="grid grid-flow-col grid-cols-12">
                <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-6 col-start-4">
                    <div className="font-bold pb-10 text-3xl">
                        Admin Panel
                    </div>

                    <div className="font-bold pb-5 text-1xl underline">
                        Matching Recommendation
                    </div>
                    
                    <div className="pb-2 flex justify-center align-baseline">
                        <input type="radio" name = "algo_type" id="skill"  className="radio" defaultChecked/>
                        <label htmlFor="skill" className="pl-10">Skill Based</label>
                     </div>
                     <div className="pb-5 flex justify-center align-baseline">   
                        <input type="radio" name = "algo_type" id="skill" className="radio ml-24" />
                        <label htmlFor="skill" className="pl-10">Skill and Location Based</label>
                    </div>
                    <div className="pt-8 pb-10">
                        <button className="btn btn-primary px-10 rounded-lg" onClick={simulate}>Generate</button>
                    </div>

                    <div className="font-bold pb-5 text-1xl underline">
                        Matching Automation
                    </div>
                    <div className="grid grid-cols-6">
                        <div className="col-span-3 col-start-1">
                           <div className="pb-3">
                                Skill Based
                           </div>
                           <select className="select select-ghost rounded-md" defaultValue={"Skill Based Algorithms"}>
                                <option disabled >Skill Based Algorithms</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>

                        <div className="col-span-3 col-start-4">
                           <div className="pb-3"> Skill Based</div>
                        
                        <select className="select select-ghost rounded-md"  defaultValue={"Skill and Location Based Algorithms"}>
                                <option disabled >Skill and Location Based Algorithms</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                        </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        </>
        

    )
}