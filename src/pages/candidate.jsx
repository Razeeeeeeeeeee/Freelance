import React from "react";
import Card from '../components/card'

export default function(){

    return(
        <>
        <Card>
            <div className="font-bold text-3xl">
                Candidate Description
            </div>
            <div className="flex justify-center items-baseline pt-20 pr-10 m-0">
                <div className="p-0 m-0 pr-10"> Upload an excel file containing the job details</div>
                <button className="btn btn-primary rounded-md">Browse</button>
            </div>
            <div className="pt-10 font-light text-gray-400 text-sm">If you want to enter the details manually, Click here! </div>
      </Card>
        </>
    )
}