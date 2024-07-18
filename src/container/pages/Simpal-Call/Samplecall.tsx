/* eslint-disable linebreak-style */
import { useState, useEffect } from "react";
import { Button, Card, Col, Row, Tab } from "react-bootstrap";
import { axiosPost } from "../../../utils/ApiCall";
import { useForm } from "react-hook-form";

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

const Samplecall = () => {
  const [cards, setCards] = useState<FileData[]>([]);
  const { register, handleSubmit } = useForm<FormData>();

  const AddNewCard = () => {
    const newCard: FileData = {
      id: cards.length + 1,
      file: null,
      graphFile: null,
      imageName: "",
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
      formData.append("voiceCall", selectedImage);

      const response = await axiosPost("callStatus/addSampleCall", formData);

      console.log("Response:", response.data);
      alert("Submit Data Success");
    } catch (error) {
      //@ts-ignore
      console.error("Error submitting form data:", error?.response?.data);
    }
  };

  return (
    <Row className="justify-content-center">
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
                                    type="date"
                                    {...register("date")}
                                    value={card.date}
                                    onChange={(e) => {
                                      const newCards = [...cards];
                                      newCards[index].date = e.target.value;
                                      setCards(newCards);
                                    }}
                                  />
                                  <div className="d-flex justify-content-between">
                                    <div className="pt-3">
                                      {card.file && <p>Add Image </p>}
                                    </div>

                                    <label
                                      htmlFor={`upload-image-input-img-${index}`}
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
    </Row>
  );
};

export default Samplecall;
