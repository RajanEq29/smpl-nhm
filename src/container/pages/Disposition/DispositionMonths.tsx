/* eslint-disable linebreak-style */
import { useEffect, useState } from "react";
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
  id: number;
  file: File | null;
  graphFile: File | null;
  date?: string;
};

type FormData = {
  date: string;
  type: string;
};
const MonthsData = () => {
  const [cards, setCards] = useState<FileData[]>([]);
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

  // month data??

  const [selectedImagem, setSelectedImagem] = useState(null);
  // const [responseMessage, setResponseMessage] = useState("");

  const handleImageChangem = (event: any) => {
    setSelectedImagem(event.target.files[0]);
    //@ts-ignore
    setShowData("Add Data Success.");
    setShow(true);
  };
  console.log(selectedImagem);
  const [selectedImagemg, setSelectedImagemg] = useState(null);
  // const [responseMessage, setResponseMessage] = useState("");

  const handleImageChangemg = (event: any) => {
    setSelectedImagemg(event.target.files[0]);
    //@ts-ignore
    setShowData1("Add Data Success.");
    setShow(true);
  };
  console.log(selectedImagemg);
  const [imageVocm, setImageVocm] = useState(null);
  const handleImageChangeVocm = (event: any) => {
    setImageVocm(event.target.files[0]);
    //@ts-ignore
    setShowData2("Add Data Success.");

    setShow(true);
  };
  console.log(imageVocm);

  //   api calling
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!selectedImagem) {
        console.error("Please select an image.");
        return;
      }
      if (!selectedImagemg) {
        console.error("Please select an image.");
        return;
      }
      if (!imageVocm) {
        console.error("Please select an image.");
        return;
      }

      //@ts-ignore
      data.type = "months";
      console.log("ABAHAYA", data);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("table1", selectedImagem);

      formData.append("graph", selectedImagemg);
      formData.append("table2", imageVocm);

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
                            {cards.map((card) => (
                              <Card key={card.id} className="my-2 mx-4">
                                <div className="  my-2 mx-4">
                                  <div className=" my-2 ">
                                    <input
                                      //@ts-ignore
                                      name="date"
                                      type="month"
                                      //@ts-ignore
                                      {...register("date")}
                                      //@ts-ignore
                                      value={card.date}
                                    ></input>
                                    <div className="d-flex justify-content-between">
                                      <div>{showData}</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <div></div>
                                      <label htmlFor="upload-image-input-img-m">
                                        <Button
                                          className="px-5-excel"
                                          as="span"
                                        >
                                          Excel
                                        </Button>
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChangem}
                                        style={{ display: "none" }}
                                        id="upload-image-input-img-m"
                                      />
                                    </div>
                                    <div className="d-flex justify-content-between my-2">
                                      <div className="d-flex justify-content-between">
                                        <div>{showData1}</div>
                                      </div>
                                      <label htmlFor="upload-image-input-img-m-g">
                                        <Button
                                          className="px-5-excel"
                                          as="span"
                                        >
                                          Graph
                                        </Button>
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChangemg}
                                        style={{ display: "none" }}
                                        id="upload-image-input-img-m-g"
                                      />
                                    </div>
                                  </div>
                                  <Card>
                                    <Row className="d-flex justify-content-center text-bold p-2 font-bold">
                                      VOC
                                    </Row>
                                    <div className="d-flex justify-content-between m-2">
                                      <div>{showData2}</div>
                                      <div>
                                        <label htmlFor="upload-image-input-img-voc-m">
                                          <Button
                                            className="px-5-excel"
                                            as="span"
                                          >
                                            image
                                          </Button>
                                        </label>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageChangeVocm}
                                          style={{ display: "none" }}
                                          id="upload-image-input-img-voc-m"
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
    </>
  );
};

export default MonthsData;
