import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function(){




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
                        <input type="radio" name = "algo_type" id="skill"  className="radio" checked/>
                        <label htmlFor="skill" className="pl-10">Skill Based</label>
                     </div>
                     <div className="pb-5 flex justify-center align-baseline">   
                        <input type="radio" name = "algo_type" id="skill" className="radio ml-24" />
                        <label htmlFor="skill" className="pl-10">Skill and Location Based</label>
                    </div>
                    <div className="pt-8 pb-10">
                        <button className="btn btn-primary px-10 rounded-lg">Generate</button>
                    </div>

                    <div className="font-bold pb-5 text-1xl underline">
                        Matching Automation
                    </div>
                    <div className="grid grid-cols-6">
                        <div className="col-span-3 col-start-1">
                           <div className="pb-3">
                                Skill Based
                           </div>
                           <select class="select select-ghost rounded-md">
                                <option disabled selected>Skill Based Algorithms</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>

                        <div className="col-span-3 col-start-4">
                           <div className="pb-3"> Skill Based</div>
                        
                        <select class="select select-ghost rounded-md">
                                <option disabled selected>Skill and Location Based Algorithms</option>
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