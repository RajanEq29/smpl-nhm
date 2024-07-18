/* eslint-disable linebreak-style */
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row, Tab } from "react-bootstrap";
import { axiosPost } from "../../../utils/ApiCall";
import { useForm } from "react-hook-form";

type FileData = {
  id: number;
  file: File | null;
  graphFile: File | null;
};

const DistMonths = () => {
  const [cards, setCards] = useState<FileData[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const graphFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    }
  };

  const handleGraphFileButtonClick = (index: number) => {
    if (graphFileInputRefs.current[index]) {
      //@ts-ignore
      graphFileInputRefs.current[index].click();
    }
  };

  // month data??

  const [selectedImage, setSelectedImage] = useState(null);
  // const [responseMessage, setResponseMessage] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const handleImageChange = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };
  console.log(selectedImage);

  const handleImageChange1 = (event: any) => {
    setSelectedImage1(event.target.files[0]);
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
      data.type = "months";
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
      alert("Submit Data Success");
      console.log("Response:", response?.data);
    } catch (error) {
      //@ts-ignore
      console.error("Error submitting form data:", error?.response?.data);
    }
  };
  return (
    <>
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
                                      type="month"
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
    </>
  );
};

export default DistMonths;
