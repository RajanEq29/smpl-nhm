/* eslint-disable linebreak-style */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  InputGroup,
  Row,
  Tab,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { axiosDelete, axiosGet, axiosPost } from "../../../utils/ApiCall";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import DatePicker from "react-datepicker";
import { formatDate } from "@fullcalendar/core/index.js";

type FileData = {
  //@ts-ignore
  id: number;
  file: File | null;
  graphFile: File | null;
};

const DispositionDaily = () => {
  const [cards, setCards] = useState<FileData[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const graphFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showData, setShowData] = useState();
  const [showData1, setShowData1] = useState();
  const [showData2, setShowData2] = useState();
  const [showS, setShowS] = useState(false);
  const [err, setError] = useState("");
  const [show, setShow] = useState(false);

  const AddNewCard = () => {
    const newCard: FileData = {
      id: cards.length + 1,
      file: null,
      graphFile: null,
    };
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    AddNewCard(); // Add a new card when the component mounts
  }, []);

  const handleFileButtonClick = (index: number) => {
    if (fileInputRefs.current[index]) {
      //@ts-ignore
      fileInputRefs.current[index].click();
      //@ts-ignore
      setShowData("Addd Data Success");
      setShow(true);
    }
  };

  const handleGraphFileButtonClick = (index: number) => {
    if (graphFileInputRefs.current[index]) {
      //@ts-ignore
      graphFileInputRefs.current[index].click();
      setShow(true);
    }
  };

  // month data??

  const [selectedImage, setSelectedImage] = useState(null);
  // const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const handleImageChange = (event: any) => {
    setSelectedImage(event.target.files[0]);
    //@ts-ignore
    setShowData1("Addd Data Success Graph");
    setShow(true);
  };
  console.log(selectedImage);

  const handleImageChange1 = (event: any) => {
    setSelectedImage1(event.target.files[0]);
    //@ts-ignore
    setShowData("Addd Data Success");
    setShow(true);
  };
  console.log(selectedImage1);
  const [imageVoc, setImageVoc] = useState(null);
  const handleImageChangeVoc = (event: any) => {
    setImageVoc(event.target.files[0]);
    //@ts-ignore
    setShowData2("Addd Data Success VOc");
    setShow(true);
  };
  console.log(imageVoc);
  // handleImageChangeVoc;
  //   api calling
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!selectedImage) {
        console.error("Please select an image.");
        return;
      }
      if (!selectedImage1) {
        console.error("Please select an image.");
        return;
      }
      if (!imageVoc) {
        console.error("Please select an image.");
        return;
      }
      //@ts-ignore
      data.type = "daily";
      console.log("ABAHAYA", data);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("table1", selectedImage);
      formData.append("graph", selectedImage1);
      formData.append("table2", imageVoc);
      // data.append();

      const response = await axiosPost(
        "callStatus/addDispositionReport",
        formData
      );

      console.log("Response:", response?.data);
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
        `/callStatus/getDispositionReportDailySelected?date=${formattedDate}`
      );
      console.log("dailly", response.data);
      setDailyData(response.data);
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };
  // delete api integration ??
  const [deleteId, setDeleteId] = useState();
  console.log("deleteId", deleteId);
  const deleteDailyData = async (deleteId: any) => {
    // console.log("deleteId", deleteId);
    try {
      const response = await axiosDelete(
        `callStatus/deleteDispositionById/${deleteId}`
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
      <Row className="justify-content-center ">
        <Col>
          <div className="container-lg">
            <Tab.Container defaultActiveKey="one">
              <Card className="xxl">
                <Card.Body className="p-0">
                  <Tab.Content id="myTabContent">
                    <Tab.Pane
                      eventKey="one"
                      className="p-0 border-bottom-0"
                      id="pricing-monthly-pane"
                      role="tabpanel"
                      aria-labelledby="pricing-monthly"
                      tabIndex={0}
                    >
                      <div className="mx-2">
                        <div className="d-flex justify-content-between px-4 py-2">
                          <div className="d-flex gap-4"></div>
                          <div>
                            <h4>Disposition Report</h4>
                          </div>
                          <div>
                            <Button onClick={AddNewCard}>+Add</Button>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            {cards.map((card, index) => (
                              <Card key={card.id} className="my-2 mx-4">
                                <div className="  my-2 mx-4">
                                  <div className=" my-2 ">
                                    <input
                                      //@ts-ignore
                                      name=" date"
                                      type="date"
                                      //@ts-ignore
                                      {...register("date")}
                                      //@ts-ignore
                                      value={card.date}
                                    ></input>
                                    <div className="d-flex justify-content-between">
                                      <div>{showData}</div>
                                      <label htmlFor="upload-image-input">
                                        <Button
                                          as="span"
                                          className="px-5-excel my-2"
                                          onClick={() =>
                                            handleFileButtonClick(index)
                                          }
                                        >
                                          Excel
                                        </Button>
                                      </label>
                                    </div>
                                    <div>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange1}
                                        style={{ display: "none" }}
                                        id="upload-image-input"
                                      />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <div>{showData1}</div>
                                      <label htmlFor="upload-image-input-img">
                                        <Button
                                          className="px-5-excel"
                                          as="span"
                                          onClick={() =>
                                            handleGraphFileButtonClick(index)
                                          }
                                        >
                                          Graph
                                        </Button>
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                        id="upload-image-input-img"
                                      />
                                    </div>
                                  </div>
                                  <Card>
                                    <Row className="d-flex justify-content-center text-bold p-2 font-bold">
                                      VOC
                                    </Row>
                                    <div className="d-flex justify-content-between m-2">
                                      <p>{showData2}</p>
                                      <div>
                                        <label htmlFor="upload-image-input-img-voc">
                                          <Button
                                            className="px-5-excel"
                                            as="span"
                                            onClick={() =>
                                              handleGraphFileButtonClick(index)
                                            }
                                          >
                                            image
                                          </Button>
                                        </label>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageChangeVoc}
                                          style={{ display: "none" }}
                                          id="upload-image-input-img-voc"
                                        />
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                                <Button type="submit">Save</Button>
                              </Card>
                            ))}
                          </div>
                        </form>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </div>
        </Col>
      </Row>
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
                className="table text-nowrap border-success border-round"
              >
                <thead>
                  <tr>
                    <th>S On</th>
                    <th>S date</th>
                    <th>S graph</th>
                    <th>S table1</th>
                    <th>S table2</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.data.map((card: any, index: any) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{card.date}</td>
                      <td>
                        <a
                          href={card.graph}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Graph
                          {/* <img
                            src={card.graph}
                            alt="Graph"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          /> */}
                        </a>
                      </td>
                      <td>
                        <a href={card.table1}>Excel</a>
                      </td>
                      <td>
                        <a href={card.table2}>Image</a>
                      </td>
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

export default DispositionDaily;
