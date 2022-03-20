import React, { useRef, useEffect } from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
  console.log('tr render');

  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowData === ref.current[0],
      rowIndex === ref.current[1],
      dispatch === ref.current[2],
    );
    ref.current = [rowData, rowIndex, dispatch];
  }, [rowData, rowIndex, dispatch]);

  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>
            {''}
          </Td>
        ))}
    </tr>
  );
};

export default Tr;
