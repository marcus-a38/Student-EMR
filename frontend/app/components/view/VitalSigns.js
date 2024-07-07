import React, {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';

export default function VitalSigns({ json }) {

  /* Instantiate the patient vital sign history table */
  const [tableData, setTableData] = useState([
    { label: 'Time', values: ['hi'] },
    { label: 'Temp', values: ['hi'] },
    { label: 'Temp Source', values: ['hi'] },
    { label: 'Heart Rate', values: ['hi'] },
    { label: 'HR Source', values: ['hi'] },
    { label: 'Respirations', values: ['hi'] },
    { label: 'Blood Pressure', values: ['hi'] },
    { label: 'BP Method', values: ['hi'] }
  ]);

  /* Keeps track of which columns are editable (inputs) */
  var editableMap = [];

  /* Fill table with initial data for patient */
  useEffect(() => {

    let initialData = tableData;

    if ('json' in window) {

      json.vital_signs_records.forEach(record => {
        initialData[0].values.push(record.time || '');
        editableMap.push(false);
      });
    }

    newColumn();
    setTableData(initialData);
  
  }, [json]);

  /* Creates a new column of data for a patient */
  const newColumn = () => {
    const updatedData = tableData.map(row => ({
      ...row,
      values: [...row.values, ''],
    }));
    setTableData(updatedData);
    editableMap.push(true);
  }

  /* Update table data state when value for input cell is updated */
  const handleTableInputChange = (rowIndex, colIndex, newVal) => {
    const updatedData = tableData.map( (row, _rowIndex) => {
      if (_rowIndex === rowIndex) {
        const newVals = row.values.map( (val, _colIndex) => (
          _colIndex === colIndex ? newVal : val
        ));
        return {...row, values: newVals};
      }
      return row;
    });
    setTableData(updatedData);
  }

  return (
    <div className='viewTab'>
    <form>
      <div className='vitalSignsUpper'>
        <table className='Table outl-all scroll-x'>
          <tbody>
            <tr>
              {tableData[0].values.map((_, colIndex) => (
                <td key={colIndex}>
                  {editableMap[colIndex] ? (
                    tableData[0].values[colIndex]
                  ) : (
                    <input
                      type='text'
                      value={tableData[0].values[colIndex]}
                      onChange={
                        e => handleTableInputChange(0, colIndex, e.target.value)
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{row.label}</th>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex}>
                    {editableMap[colIndex] ? (
                      value
                    ) : (
                      <input
                        type='text'
                        value={value}
                        onChange={
                          e => handleTableInputChange(
                            rowIndex + 1, colIndex, e.target.value
                          )
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='inlineButtonGroup'>
          <div>
            <p>Add Record</p>
            <button type='button' onClick={newColumn}>+</button>
          </div>
        </div>
      </div>
      
    </form>
    <Outlet />
    </div>
  );
}