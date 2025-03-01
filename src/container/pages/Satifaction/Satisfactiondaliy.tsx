/* eslint-disable linebreak-style */
import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    InputGroup,
    Row,
    Table,
    Toast,
    ToastContainer,
} from "react-bootstrap";

import { useForm } from "react-hook-form";
// import { axiosDelete, axiosGet, axiosPost } from "../../../../../utils/ApiCall";
import { AxiosError } from "axios";
import { formatDate } from "@fullcalendar/core/index.js";
import DatePicker from "react-datepicker";
import { axiosDelete, axiosGet, axiosPost } from "../../../utils/ApiCall";

const Satisfactiondaily = () => {
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

    //@ts-ignore
    const deleteLastRow = () => {
        if (rows.length > 1) {
            setRows(rows.slice(0, rows.length - 1));
        }
    };

  
    const [selectedImage1, setSelectedImage1] = useState(null);
   
    // console.log(selectedImage);

    const handleImageChange1 = (event: any) => {
        setSelectedImage1(event.target.files[0]);
        setShow(true);
    };
    // console.log(selectedImage1);

    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            if (!selectedImage1) {
                console.error("Please select an image.");
                return;
            }
            //@ts-ignore
            data.type = "daily";
            console.log("ABAHAYA", data);

            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            formData.append("image", selectedImage1);
            // data.append();

            const response = await axiosPost("callStatus/satifaction", formData);

            console.log("Response:", response.data);
            setShowS(true);
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

    // get data ?
    const [startDate, setStartDate] = useState(new Date());
    const [dailyData, setDailyData] = useState<any>([]);
    console.log("Data:", dailyData);
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setStartDate(date);
            fetchDailyData(date);
        }
        console.log("Data-------------:", startDate);
    };
    useEffect(() => {
        fetchDailyData(startDate);
        deleteDailyData(deleteId);
    }, []);
    const fetchDailyData = async (date: Date) => {
        const formattedDate = formatDate(date);
        try {
            const response = await axiosGet(
                `callStatus/getAllsatifactionDailySelected?date=${formattedDate}`
            );
            // console.log("dailly", response.data);
            setDailyData(response.data);
        } catch (error) {
            console.error("Error fetching daily data:", error);
        }
    };
    // console.log("dailyData", dailyData.data);
    // delet data?
    const [deleteId, setDeleteId] = useState();
    console.log("Data-------------:", deleteId);

    const deleteDailyData = async (deleteId: any) => {
        try {
            const response = await axiosDelete(
                `callStatus/deletesatifactionById/${deleteId}`
            );
            console.log("delete Data", response);
        } catch (error) {
            console.error("Error fetching daily data:", error);
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
            <Card className="container">
                <div className="d-flex justify-content-between px-4 py-2">
                    <div className="d-flex gap-4"></div>
                    <div>
                        <Button onClick={addRow}>+Add</Button>
                    </div>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Table
                            bordered
                            className="table  border-success border-round "
                        >
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Time Interval</th>
                                    <th>Satisfied %</th>
                                    <th>Notsatisfied %</th>
                                    <th>Image
                                    </th>

                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>
                                            <input
                                                className="input-table-container"
                                                //@ts-ignore
                                                name=" date"
                                                type="date"
                                                //@ts-ignore
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
                                                name="satisfied"
                                                type="text"
                                                required
                                                //@ts-ignore
                                                {...register("satisfied")}
                                                value={row.satisfied}
                                            // onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="input-table-container"
                                                //@ts-ignore
                                                name="notsatisfied"
                                                type="text"
                                                required
                                                //@ts-ignore
                                                {...register("notsatisfied")}
                                                value={row.notsatisfied}
                                            // onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </td>




                                        <td className="d-flex gap-2">

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange1}
                                                style={{ display: "none" }}
                                                id="upload-image-input-img"
                                            />
                                            <label htmlFor="upload-image-input-img">
                                                <Button as="span">Image</Button>
                                            </label>
                                        </td>
                                        <td className="">
                                            <Button type="submit" className="mx-1">
                                                Submit
                                            </Button>
                                            {/* <Button onClick={() => deleteRow(row.id)}>Delete</Button>
                    <Button onClick={() => editRow(row.id)} className="mx-1">
                      {row?.isEditing ? "Cancel" : "Edit"}
                    </Button>
                    {row?.isEditing && (
                      <Button onClick={() => updateTable(index)}>Update</Button>
                    )} */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </form>
                </div>
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

            <Col>
                <Card>
                    <div className="d-flex justify-content-between m-2">
                        <div></div>
                        <div className="form-group mb-3">
                            <InputGroup className="">
                                <InputGroup.Text className="input-group-text text-muted">
                                    <i className="ri-calendar-line"></i>
                                </InputGroup.Text>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy/MM"
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <Row>
                        {dailyData?.data?.length > 0 ? (
                            <Table
                                bordered
                                className="table  border-success border-round"
                            >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Time Interval</th>
                                        <th>Satisfied %</th>
                                        <th>Notsatisfied %</th>

                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dailyData.data.map((card: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{card.date}</td>

                                            <td>{card?.notsatisfied}</td>
                                            <td>{card.satisfied}</td>
                                            <td>{card.image}</td>

                                            <td>
                                                <Button
                                                    onClick={() => {
                                                        setDeleteId(card._id);
                                                        deleteDailyData(card._id);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Table
                                bordered
                                className="table text-nowrap border-success border-round"
                            >
                                <tbody>
                                    <tr>
                                        <td className="text-center">No data available</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Row>
                </Card>
            </Col>
        </>
    );
};

export default Satisfactiondaily;
