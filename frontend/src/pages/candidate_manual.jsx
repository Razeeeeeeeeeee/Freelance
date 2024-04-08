import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function(){
    


    return(
      <div className="flex flex-col pt-32 justify-center px-0 pb-20">
        <div className="grid grid-flow-col grid-cols-11">
          <div className="sm:border-solid sm:border-2 rounded-md py-10 px-0 drop-shadow-lg grid col-span-5 col-start-4">
            <div className="font-bold pb-10 text-3xl">
              Candidate Form
              </div>
          <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] mx-20" >Job Name</label>
           <input
           type="text"
             id="specificNumber"
             name="specificNumber"
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-14 mr-12" >Skill Requirement</label>
           <input
           type="text"
             id="specificNumber"
             name="specificNumber"
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-14 mr-10 pl-2" >Budget allotted</label>
           <input
           type="text"
             id="specificNumber"
             name="specificNumber"
             className="border rounded w-17 px-2 py-1 ml-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" >Max Workers Required</label>
           <input
           type="text"
             id="specificNumber"
             name="specificNumber"
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="flex justify-center mx-20 mb-5">
           <label  className="align-baseline font-medium text-[#07074D] ml-9 mr-0 pr-10" >Min Workers Required</label>
           <input
           type="text"
             id="specificNumber"
             name="specificNumber"
             className="border rounded w-17 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline align-baseline"
           />
           </div>
           <div className="mb-4">
                 <label className="mt-3 ml-10 mr-8 block text-base font-medium text-[#07074D]">Mode</label>
           <select
             id="mode"
             name="mode"
             className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
          <div className="mt-4"></div>
             <option value="online" className="text-green-500">Online</option>
             <option value="offline" className="text-red-500">Offline</option>
           </select>
           </div>

           <div class="flex-wrap pt-8">
                     <div class="mb-4">
                       <label
                         for="date"
                         class="mb-3 block text-base font-medium text-[#07074D]"
                       >
                       Advertisement Date
                       </label>
                       <input
                         type="date"
                         name="date"
                         id="date"
                         class=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                       />
                     </div>
                 </div>
                 <div class="flex-wrap pt-4">
                     <div class="mb-5">
                       <label
                         for="date"
                         class="mb-3 block text-base font-medium text-[#07074D]"
                       >
                       Deadline Date
                       </label>
                       <input
                         type="date"
                         name="date"
                         id="date"
                         class=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                       />
                     </div>
                 </div>
                 
                 <div className="">
                <button className="btn btn-primary rounded-md mr-10 mt-10">Save</button>
                <button className="btn btn-primary rounded-md ml-10 mt-10">Clear Description</button>
                </div>
          

        </div>
      </div>
    </div>
    
    )
}
