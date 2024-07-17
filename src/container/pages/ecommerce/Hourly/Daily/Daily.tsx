import React, { useState, ChangeEvent, useRef } from "react";
import { Button, Card, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import { useInboundcallApiMutation } from "../../../../../redux/Admin";
import { useForm } from "react-hook-form";
import { axiosPost } from "../../../../../utils/ApiCall";
import axios from "axios";

type Props = {};

const Daily = (props: Props) => {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
    },
  ]);

  // console.log("Inboundcall called with   ", data);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
      },
    ]);
  };

  // const savePDF = async (row: Row) => {
  //   console.log("Saving row:", row);
  //   try {
  //     const response = await AddDayData(row).unwrap();
  //     console.log("User created:", response);
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //   }
  // };

  const deleteLastRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, rows.length - 1));
    }
  };
  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const editRow = (id: number) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const updateTable = (index: number) => {
    const newRows = [...rows];
    newRows[index].isEditing = false;
    setRows(newRows);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  // const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const handleImageChange1 = (event) => {
    setSelectedImage1(event.target.files[0]);
  };
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!selectedImage) {
        console.error("Please select an image.");
        return;
      }
      if (!selectedImage) {
        console.error("Please select an image.");
        return;
      }
      data.type = "monthly";
      console.log("ABAHAYA", data);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("image", selectedImage);
      // data.append();

      const response = await axiosPost(
        "callStatus/addCallStatus",
        formData,
        {}
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error?.response?.data);
    }
  };

  return (
    <>
      <Card className="">
        <div className="d-flex justify-content-between px-4 py-2">
          <div className="d-flex gap-4"></div>
          <div>
            <Button onClick={addRow}>+Add</Button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      name=" date"
                      type="date"
                      {...register("date")}
                      value={row.date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      name="totalCalls"
                      type="text"
                      {...register("totalCalls")}
                      value={row.totalCalls}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      name="overAllAnswered"
                      type="text"
                      {...register("overAllAnswered")}
                      value={row.overAllAnswered}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      name="overAllAbandoned"
                      type="text"
                      {...register("overAllAbandoned")}
                      value={row.overAllAbandoned}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      name="answeredPercentage"
                      type="text"
                      {...register("answeredPercentage")}
                      value={row.answeredPercentage}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td className="d-flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      id="upload-image-input"
                    />
                    <label htmlFor="upload-image-input">
                      <Button as="span">Graph</Button>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange1}
                      style={{ display: "none" }}
                      id="upload-image-input"
                    />
                    <Button>Image</Button>
                  </td>
                  <td className="">
                    <Button type="submit" className="mx-1">
                      Submit
                    </Button>
                    <Button onClick={() => deleteRow(row.id)}>Delete</Button>
                    <Button onClick={() => editRow(row.id)} className="mx-1">
                      {row?.isEditing ? "Cancel" : "Edit"}
                    </Button>
                    {row?.isEditing && (
                      <Button onClick={() => updateTable(index)}>Update</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </form>
      </Card>
    </>
  );
};

export default Daily;
