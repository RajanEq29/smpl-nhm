import React, { useState, ChangeEvent, useRef } from "react";
import { Button, Card, Table } from "react-bootstrap";

interface Row {
  id: number;
  timeInterval: string;
  totalCalls: string;
  overallAnswered: string;
  overallAbandoned: string;
  answeredPercent: string;
  acht: string;
  graphFile?: File;
  imageFile?: File;
}

export const HourlyCall: React.FC = () => {
  const [activeButton, setActiveButton] = useState("daily");
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      timeInterval: "",
      totalCalls: "",
      overallAnswered: "",
      overallAbandoned: "",
      answeredPercent: "",
      acht: "",
    },
  ]);

  const graphFileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [isGraphFile, setIsGraphFile] = useState<boolean>(true);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        timeInterval: "",
        totalCalls: "",
        overallAnswered: "",
        overallAbandoned: "",
        answeredPercent: "",
        acht: "",
      },
    ]);
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [name]: value };
    setRows(newRows);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedRowId !== null) {
      const newRows = rows.map((row) => {
        if (row.id === selectedRowId) {
          return isGraphFile
            ? { ...row, graphFile: file }
            : { ...row, imageFile: file };
        }
        return row;
      });
      setRows(newRows);
      console.log("Selected file:", file);
    }
  };

  const handleFileButtonClick = (rowId: number, isGraph: boolean) => {
    setSelectedRowId(rowId);
    setIsGraphFile(isGraph);
    if (isGraph && graphFileInputRef.current) {
      graphFileInputRef.current.click();
    } else if (!isGraph && imageFileInputRef.current) {
      imageFileInputRef.current.click();
    }
  };

  console.log(rows);

  return (
    <>
      <Card className="mt-4">
        <p className="text-center pt-2">NHM 104 HELPLINE HARYANA DASHBOARD</p>
        <div className="d-flex justify-content-center gap-4">
          <Button
            className={`px-5-date ${activeButton === "daily" ? "active" : ""}`}
            onClick={() => setActiveButton("daily")}
            style={{
              backgroundColor: activeButton === "daily" ? "#007bff" : "#f8f9fa",
              color: activeButton === "daily" ? "white" : "black",
            }}
          >
            Daily
          </Button>
          <Button
            className={`px-5-date ${activeButton === "month" ? "active" : ""}`}
            onClick={() => setActiveButton("month")}
            style={{
              backgroundColor: activeButton === "month" ? "#007bff" : "#f8f9fa",
              color: activeButton === "month" ? "white" : "black",
            }}
          >
            Month
          </Button>
        </div>
        <div className="d-flex justify-content-between px-4 py-2">
          <div className="d-flex gap-4"></div>
          <div>
            <Button onClick={addRow}>+Add</Button>
          </div>
        </div>

        <Table
          bordered
          className="table text-nowrap border-success border-round"
        >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Time Interval</th>
              <th>TOTAL CALLS</th>
              <th>Overall Answered</th>
              <th>Overall Abandoned</th>
              <th>Answered %</th>
              <th>ACHT</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    className="input-table-container"
                    name="timeInterval"
                    type="date"
                    value={row.timeInterval}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className="input-table-container"
                    name="totalCalls"
                    type="text"
                    value={row.totalCalls}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className="input-table-container"
                    name="overallAnswered"
                    type="text"
                    value={row.overallAnswered}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className="input-table-container"
                    name="overallAbandoned"
                    type="text"
                    value={row.overallAbandoned}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className="input-table-container"
                    name="answeredPercent"
                    type="text"
                    value={row.answeredPercent}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td className="d-flex gap-2">
                  <Button onClick={() => handleFileButtonClick(row.id, true)}>
                    Graph
                  </Button>
                  <Button onClick={() => handleFileButtonClick(row.id, false)}>
                    Image
                  </Button>
                </td>
                <td>
                  <Button>Save</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <input
        type="file"
        ref={graphFileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={imageFileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};
