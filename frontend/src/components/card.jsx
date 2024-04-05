import React from "react"

export default function(props){
    return(
        <div className="flex flex-col justify-center px-0 h-screen">
            <div className="grid grid-flow-col grid-cols-11">
                <div className="sm:border-solid sm:border-2 rounded-md py-20 px-0 drop-shadow-lg grid col-span-5 col-start-4">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

