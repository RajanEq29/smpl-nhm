/* eslint-disable linebreak-style */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Tab,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { axiosPost } from "../../../utils/ApiCall";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

type FileData = {
  //@ts-ignore
  id: number;
  file: File | null;
  graphFile: File | null;
};
type FormData = {
  date: string;
  type?: string;
};

const DistDAily = () => {
  const [cards, setCards] = useState<FileData[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const graphFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showS, setShowS] = useState(false);
  const [err, setError] = useState("");
  const [show, setShow] = useState(false);

  const AddNewCard = () => {
    const newCard: FileData = {
      id: cards.length + 1,
      file: null,
      graphFile: null,
      //@ts-ignore
      data: "",
    };
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    AddNewCard(); // Add a new card when the component mounts
  }, []);

  const handleFileButtonClick = (index: number) => {
    if (fileInputRefs.current[index]) {
      //@ts-ignore
      fileInputRefs.current[index]?.click();
      setShow(true);
    }
  };

  const handleGraphFileButtonClick = (index: number) => {
    if (graphFileInputRefs.current[index]) {
      //@ts-ignore
      graphFileInputRefs.current[index]?.click();
      setShow(true);
    }
  };

  // month data??

  const [selectedImage, setSelectedImage] = useState(null);
  // const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const handleImageChange = (event: any) => {
    setSelectedImage(event.target.files[0]);
    setShow(true);
  };
  console.log(selectedImage);

  const handleImageChange1 = (event: any) => {
    setSelectedImage1(event.target.files[0]);
    setShow(true);
  };
  console.log(selectedImage1);

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
      //@ts-ignore
      data.type = "daily";
      console.log("ABAHAYA", data);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("excel", selectedImage);
      formData.append("graph", selectedImage1);
      // data.append();

      const response = await axiosPost(
        "callStatus/addDistrictReport",
        formData
      );
      setShowS(true);
      console.log("Response:", response?.data);
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
                                      <div>
                                        {card.file && (
                                          <p>Selected file: {card.file.name}</p>
                                        )}
                                      </div>
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

                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange1}
                                        style={{ display: "none" }}
                                        id="upload-image-input"
                                      />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <div></div>
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
    </>
  );
};

export default DistDAily;
