/* eslint-disable linebreak-style */
import React, { useRef, useState } from "react";
import { Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { useInboundcallApiMutation } from "../../../redux/Admin";

type CardData = {
  id: number;
  file: File | null;
  Date: String | null;
};

const Inboundcall = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);
  const { data } = useInboundcallApiMutation();
  console.log("Inboundcall called with   ", data);

  const AddNewCard = () => {
    const newCard: CardData = {
      id: cards.length + 1,
      file: null,
      Date: null,
    };
    setCards([...cards, newCard]);
  };

  const handleFileButtonClick = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const updatedCards = [...cards];
      updatedCards[index].file = selectedFile;
      setCards(updatedCards);
    }
  };

  const saveData = (index: number) => {
    const card = cards[index];
    console.log(`Saving data for card ${card.id}:`, card.file);
    // Add further save logic here
  };
  // months data ?
  const [cardsM, setCardsM] = useState<CardData[]>([]);
  const fileInputRefsM = useRef<HTMLInputElement[]>([]);

  const AddNewCardM = () => {
    const newCard: CardData = {
      id: cardsM.length + 1,
      file: null,
      date: null,
    };
    setCardsM([...cardsM, newCard]);
  };

  const handleFileButtonClickM = (index: number) => {
    if (fileInputRefsM.current[index]) {
      fileInputRefsM.current[index].click();
    }
  };

  const handleFileChangeM = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const updatedCards = [...cards];
      updatedCards[index].file = selectedFile;
      setCardsM(updatedCards);
    }
  };

  const saveDataM = (index: number) => {
    const card = cards[index];
    console.log(`Saving data for card ${card.id}:`, card.file);
    // Add further save logic here
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col>
          <div className="container-lg">
            <Tab.Container defaultActiveKey="one">
              <div className="d-flex justify-content-center mb-4">
                <Nav
                  className="nav-tabs b-3 tab-style-6 bg-primary-transparent mt-4"
                  id="myTab"
                  role="tablist"
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="one"
                      id="pricing-monthly"
                      className="px-5"
                    >
                      Daily
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="two"
                      id="pricing-yearly"
                      className="px-5"
                    >
                      Month
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
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
                        <Card className="d-flex justify-content-center align-items-center mt-4 py-3">
                          <h6>CallStatus-OutBound</h6>
                        </Card>
                        <div className="d-flex justify-content-between">
                          <p></p>
                          <Button onClick={AddNewCard}>+Add</Button>
                        </div>
                        {cards.map((card, index) => (
                          <Card key={card.id} className=" mt-4 py-3">
                            <div className="d-flex justify-content-between text-center my-2 mx-4">
                              <div>
                                {card.file && (
                                  <p>Selected file: {card.file.name}</p>
                                )}
                              </div>
                              <Button
                                onClick={() => handleFileButtonClick(index)}
                              >
                                Image
                              </Button>
                              <input
                                type="file"
                                ref={(el) =>
                                  (fileInputRefs.current[index] = el!)
                                }
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, index)}
                              />
                            </div>
                            <Button onClick={() => saveData(index)}>
                              Save
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane
                      eventKey="two"
                      className="p-0 border-bottom-0"
                      id="pricing-yearly-pane"
                      role="tabpanel"
                      aria-labelledby="pricing-yearly"
                      tabIndex={0}
                    >
                      <div className="mx-2">
                        <Card className="d-flex justify-content-center align-items-center mt-4 py-3">
                          <h6>CallStatus-OutBound</h6>
                        </Card>
                        <div className="d-flex justify-content-between">
                          <p></p>
                          <Button onClick={AddNewCardM}>+Add</Button>
                        </div>
                        {cardsM.map((card, index) => (
                          <Card key={card.id} className=" mt-4 py-3">
                            <div className="d-flex justify-content-between text-center my-2 mx-4">
                              <div>
                                <input type="date"></input>
                                {card.file && (
                                  <p>Selected file: {card.file.name}</p>
                                )}
                              </div>
                              <Button
                                onClick={() => handleFileButtonClickM(index)}
                              >
                                Image
                              </Button>
                              <input
                                type="file"
                                ref={(el) =>
                                  (fileInputRefsM.current[index] = el!)
                                }
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChangeM(e, index)}
                              />
                            </div>
                            <Button onClick={() => saveDataM(index)}>
                              Save
                            </Button>
                          </Card>
                        ))}
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

export default Inboundcall;
