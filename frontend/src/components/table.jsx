
import React from "react";

export default function ({ data }) {
  return (
    <table className="table table-pin-rows">
      <thead>
        <tr className="bg-zinc-950 text-white">
          <td></td>
          <td className="text-center">Employer</td>
          <td className="text-center">Employee</td>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {item[1].map((employee, empIndex) => (
              <tr key={`${index}-${empIndex}`}>
                {empIndex === 0 && (
                  <th rowSpan={item[1].length}>{index + 1}</th>
                )}
                {empIndex === 0 && (
                  <td
                    className="text-center"
                    rowSpan={item[1].length}
                  >
                    {item[0]}
                  </td>
                )}
                <td className="text-center">{employee}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

