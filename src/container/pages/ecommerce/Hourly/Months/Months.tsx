import { useState } from "react";
import { Button, Card, Table, Toast, ToastContainer } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { axiosPost } from "../../../../../utils/ApiCall";
import { AxiosError } from "axios";

const Months = () => {
  const [show, setShow] = useState(false);
  const [showS, setShowS] = useState(false);
  const [err, setError] = useState("");
  //@ts-ignore
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
  //@ts-ignore
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
  const [image, setImage] = useState(null);

  const [graphImg, setGraphImg] = useState(null);
  const handleImage = (event: any) => {
    setImage(event.target.files[0]);
    setShow(true);
  };
  console.log("hihisfd jksdf ", image);

  const handleImage1 = (event: any) => {
    setGraphImg(event.target.files[0]);
    setShow(true);
  };
  console.log(graphImg);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!image) {
        console.error("Please select an image.");
        return;
      }
      if (!graphImg) {
        console.error("Please select an image.");
        return;
      }
      //@ts-ignore
      data.type = "monthly";
      console.log("ABAHAYA", data);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("graph", image);
      formData.append("image", graphImg);
      // data.append();

      const response = await axiosPost("callStatus/addCallStatus", formData);

      console.log("Response:", response.data);
      setShowS(true);
      alert("Submit Data Success");
    } catch (error) {
      //@ts-ignore
      if (error instanceof AxiosError && error.response) {
        console.error(
          "Error submitting form data:",
          error.response.data.message
        );
        setError("Same Data already exists!!");
        setShow(true);
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred. Please try again later.");
        setShow(true);
      }
    }
  };

  return (
    <>
      <div>
        {show && (
          <ToastContainer className="toast-container position-fixed top-0 end-0 me-4 mt-4">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={5000}
              autohide
              bg="primary-transparent"
              className="toast colored-toast"
            >
              <Toast.Header className="toast-header bg-primary text-fixed-white mb-0">
                {/* <img
                  className="bd-placeholder-img rounded me-2"
                  src={favicon}
                  alt="..."
                /> */}
                <strong className="me-auto">Successfully Add </strong>
              </Toast.Header>
              <Toast.Body>{err ? err : "Successfully Add In!!"}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </div>
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
                      //@ts-ignore
                      name=" date"
                      type="month"
                      required
                      //@ts-ignore
                      {...register("date")}
                      value={row.date}
                      // onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      //@ts-ignore
                      name="totalCalls"
                      type="text"
                      required
                      //@ts-ignore
                      {...register("totalCalls")}
                      value={row.totalCalls}
                      // onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      //@ts-ignore
                      name="overAllAnswered"
                      type="text"
                      required
                      //@ts-ignore
                      {...register("overAllAnswered")}
                      value={row.overAllAnswered}
                      // onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      //@ts-ignore
                      name="overAllAbandoned"
                      type="text"
                      required
                      //@ts-ignore
                      {...register("overAllAbandoned")}
                      value={row.overAllAbandoned}
                      // onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      //@ts-ignore
                      name="answeredPercentage"
                      type="text"
                      required
                      //@ts-ignore
                      {...register("answeredPercentage")}
                      value={row.answeredPercentage}
                      // onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      className="input-table-container"
                      //@ts-ignore
                      name="ACHT"
                      type="text"
                      required
                      //@ts-ignore
                      {...register("ACHT")}
                      value={row.ACHT}
                    />
                  </td>
                  <td className="d-flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      style={{ display: "none" }}
                      id="upload-image-input-month"
                    />
                    <label htmlFor="upload-image-input-month">
                      <Button as="span">Graph</Button>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage1}
                      style={{ display: "none" }}
                      id="upload-image-input-img-month"
                    />
                    <label htmlFor="upload-image-input-img-month">
                      <Button as="span">Image</Button>
                    </label>
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
      <div>
        {showS && (
          <ToastContainer className="toast-container position-fixed top-0 end-0 me-4 mt-4">
            <Toast
              onClose={() => setShowS(false)}
              show={showS}
              delay={5000}
              autohide
              bg="primary-transparent"
              className="toast colored-toast"
            >
              <Toast.Header className="toast-header bg-primary text-fixed-white mb-0">
                {/* <img
                  className="bd-placeholder-img rounded me-2"
                  src={favicon}
                  alt="..."
                /> */}
                <strong className="me-auto"></strong>
              </Toast.Header>
              <Toast.Body>
                {err ? err : "Successfully Save Data In!!"}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </div>
    </>
  );
};

export default Months;
