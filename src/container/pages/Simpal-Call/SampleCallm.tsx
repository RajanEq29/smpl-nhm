/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";
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
  imageName?: string; // Add imageName property to FileData type
};

type FormData = {
  date: string;
  type: string;
};

const SampleCallm = () => {
  const [cards, setCards] = useState<FileData[]>([]);
  const { register, handleSubmit } = useForm<FormData>();
  const [showS, setShowS] = useState(false);
  const [err, setError] = useState("");
  const [show, setShow] = useState(false);

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
      setShow(true);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const selectedImagem = cards.find((card) => card.file)?.file;
      if (!selectedImagem) {
        console.error("Please select an image.");
        return;
      }

      data.type = "months";

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("voiceCall", selectedImagem);

      const response = await axiosPost("callStatus/addSampleCall", formData);

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

  return (
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
                          <h4>Call Status Sample</h4>
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
                                  <input
                                    //@ts-ignore
                                    name={`date-${card.id}`}
                                    type="month"
                                    {...register("date")}
                                    value={card.date || ""}
                                    onChange={(e) => {
                                      const newCards = [...cards];
                                      newCards[index].date = e.target.value;
                                      setCards(newCards);
                                    }}
                                  />
                                  <div className="d-flex justify-content-between">
                                    <div className="pt-3">
                                      {card.file && <p>Add on Audio </p>}
                                    </div>

                                    <label
                                      htmlFor={`upload-image-input-img-m-${index}`}
                                    >
                                      <Button className="px-5-excel" as="span">
                                        Audio
                                      </Button>
                                    </label>
                                    <input
                                      type="file"
                                      accept="audio/*"
                                      onChange={(e) =>
                                        handleImageChange(e, index)
                                      }
                                      style={{ display: "none" }}
                                      id={`upload-image-input-img-m-${index}`}
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
  );
};

export default SampleCallm;
