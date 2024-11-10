import React, { useState, ChangeEvent } from "react";

interface DynamicTableProps {
  data: Array<{ [key: string]: any }>;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  const headers = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnKey: string
  ) => {
    const newData = [...tableData];
    newData[rowIndex][columnKey] = e.target.value;
    setTableData(newData);
  };

  const handleSave = () => {
    console.log("Datos modificados:", tableData);
  };

  return (
    <div className="p-4">
      <table className="table-auto border-collapse w-full shadow-md">
        <thead>
          <tr className="bg-gray-300">
            {headers.map((header) => (
              <th key={header} className="border px-4 py-2 capitalize text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, rowIndex) => (
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
              {headers.map((header) => (
                <td key={header} className="border px-4 py-2">
                  <input
                    type="text"
                    value={item[header] ?? ""}
                    onChange={(e) => handleInputChange(e, rowIndex, header)}
                    className="border w-full px-2 py-1"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSave}
        style={{ backgroundColor: "#c7000b" }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Send Data
      </button>
    </div>
  );
};

export default DynamicTable;
