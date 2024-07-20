/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Tab,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { axiosGet, axiosPost } from "../../../utils/ApiCall";
import { useForm, Controller } from "react-hook-form";
import { AxiosError } from "axios";
import { formatDate } from "@fullcalendar/core/index.js";
import DatePicker from "react-datepicker";

type FileData = {
  id: number;
  file: File | null;
  graphFile: File | null;
  date?: string;
  imageName?: string;
};

type FormData = {
  date: string;
  type: string;
};

const DailyData = () => {
  const [showS, setShowS] = useState(false);
  const [err, setError] = useState("");
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState<FileData[]>([]);
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [showData, setShowData] = useState<string | null>(null);

  const AddNewCard = () => {
    const newCard: FileData = {
      id: cards.length + 1,
      file: null,
      graphFile: null,
      imageName: "",
      date: "",
    };
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    AddNewCard(); // Add a new card when the component mounts
  }, []);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const newCards = [...cards];
      newCards[index].file = event.target.files[0];
      newCards[index].imageName = event.target.files[0].name;
      setCards(newCards);
      setShowData("Add Data Success.");
      setShow(true);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const selectedImage = cards.find((card) => card.file)?.file;
      if (!selectedImage) {
        console.error("Please select an image.");
        return;
      }

      data.type = "daily";

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("image", selectedImage);

      const response = await axiosPost(
        "callStatus/addOutBoundCallStatus",
        formData
      );
      //@ts-ignore
      console.log("Response:", response.data);
      setShowS(true);
      reset();
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

  const [dailyData, setDailyData] = useState<any>(null);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      fetchDailyData(date);
    }
  };
  useEffect(() => {
    fetchDailyData(startDate);
  }, []);
  const fetchDailyData = async (date: Date) => {
    const formattedDate = formatDate(date);
    try {
      const response = await axiosGet(
        `/callStatus/getDistrictReportByDate?date=${formattedDate}&type=daily`
      );
      console.log("dailly", response.data);
      setDailyData(response.data);
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };
  console.log("dailyData", dailyData?.data);

  return (
    <>
      <Row className="justify-content-center">
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
        <Col>
          <div className="container-lg">
            <Tab.Container defaultActiveKey="one">
              <Card>
                <Card.Body className="p-0">
                  <Tab.Content id="myTabContent">
                    <Tab.Pane eventKey="one" className="p-0 border-bottom-0">
                      <div className="mx-2">
                        <div className="d-flex justify-content-between px-4 py-2">
                          <div className="d-flex gap-4"></div>
                          <div>
                            <h4>Call Status OutBound</h4>
                          </div>
                          <div>
                            <Button onClick={AddNewCard}>+Add</Button>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            {cards.map((card, index) => (
                              <Card key={card.id} className="my-2 mx-4">
                                <div className="my-2 mx-4">
                                  <div className="my-2">
                                    <Controller
                                      control={control}
                                      name={`date`}
                                      render={({ field }) => (
                                        <input
                                          type="date"
                                          value={card.date || ""}
                                          onChange={(e) => {
                                            const newCards = [...cards];
                                            newCards[index].date =
                                              e.target.value;
                                            setCards(newCards);
                                            field.onChange(e);
                                          }}
                                        />
                                      )}
                                    />
                                    <div className="d-flex justify-content-between">
                                      <div className="pt-3">{showData}</div>

                                      <label
                                        htmlFor={`upload-image-input-img-${index}`}
                                      >
                                        <Button
                                          className="px-5-excel"
                                          as="span"
                                        >
                                          Image
                                        </Button>
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                          handleImageChange(e, index)
                                        }
                                        style={{ display: "none" }}
                                        id={`upload-image-input-img-${index}`}
                                      />
                                    </div>
                                  </div>
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
      </Row>
      <Card className="mx-2">
        <Row className="mx-5 my-4">
          <div className="d-flex justify-content-between ">
            <div></div>
            <div className="form-group mb-3">
              <InputGroup className="">
                <InputGroup.Text className="input-group-text text-muted">
                  <i className="ri-calendar-line"></i>
                </InputGroup.Text>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                />
              </InputGroup>
            </div>
          </div>
        </Row>
        <Row>
          <div>
            {dailyData?.data &&
              dailyData?.data?.data?.map((card: any) => (
                <Card key={index} className="my-2 mx-4">
                  <div className="my-2 mx-4">
                    {card?.excel}
                    {/* <div className="my-2">
                      <div className="d-flex justify-content-between">
                        <div className="pt-3">{card._id}</div>
                        <label>
                          <Button className="px-5-excel" as="span">
                            Image
                          </Button>
                        </label>
                      </div>
                    </div> */}
                  </div>
                  <Button type="submit">Save</Button>
                </Card>
              ))}
          </div>
        </Row>
      </Card>
    </>
  );
};

export default DailyData;
