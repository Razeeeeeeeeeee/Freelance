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
          <tr key={index}>
            <th> {index + 1} </th>
            <td className="text-center">{item[0]}</td>
            <td className="text-center">{item[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
