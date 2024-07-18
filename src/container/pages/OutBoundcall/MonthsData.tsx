/* eslint-disable linebreak-style */
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab } from "react-bootstrap";
import { axiosPost } from "../../../utils/ApiCall";
import { useForm } from "react-hook-form";

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
  };
  console.log(selectedImagem);

  //   api calling
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!selectedImagem) {
        console.error("Please select an image.");
        return;
      }

      //@ts-ignore
      data.type = "months";
      console.log("ABAHAYA", data);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("image", selectedImagem);

      // data.append();

      const response = await axiosPost(
        "callStatus/addOutBoundCallStatus",
        formData
      );

      console.log("Response:", response?.data);
      alert("Submit Data Success");
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
                            {cards.map((card) => (
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
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <div></div>
                                      <label htmlFor="upload-image-input-img-m">
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
                                        onChange={handleImageChangem}
                                        style={{ display: "none" }}
                                        id="upload-image-input-img-m"
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

export default MonthsData;
