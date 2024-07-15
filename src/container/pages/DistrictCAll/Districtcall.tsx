import React, { useRef, useState } from "react";
import { Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";

type FileData = {
  id: number;
  file: File | null;
  graphFile: File | null;
};

const Districtreport = () => {
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

  const handleFileButtonClick = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleGraphFileButtonClick = (index: number) => {
    if (graphFileInputRefs.current[index]) {
      graphFileInputRefs.current[index].click();
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

  const handleGraphFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const updatedCards = [...cards];
      updatedCards[index].graphFile = selectedFile;
      setCards(updatedCards);
    }
  };

  const saveData = (index: number) => {
    const card = cards[index];
    console.log(`Saving data for card ${card.id}:`, card.file, card.graphFile);
    // Add further save logic here
  };
  // month data??

  const [cardsM, setCardsM] = useState<FileData[]>([]);
  const fileInputRefsM = useRef<(HTMLInputElement | null)[]>([]);
  const graphFileInputRefsM = useRef<(HTMLInputElement | null)[]>([]);

  const AddNewCardM = () => {
    const newCard: FileData = {
      id: cardsM.length + 1,
      file: null,
      graphFile: null,
    };
    setCardsM([...cardsM, newCard]);
  };

  const handleFileButtonClickM = (index: number) => {
    if (fileInputRefsM.current[index]) {
      fileInputRefsM.current[index].click();
    }
  };

  const handleGraphFileButtonClickM = (index: number) => {
    if (graphFileInputRefsM.current[index]) {
      graphFileInputRefsM.current[index].click();
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

  const handleGraphFileChangeM = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const updatedCards = [...cards];
      updatedCards[index].graphFile = selectedFile;
      setCardsM(updatedCards);
    }
  };

  const saveDataM = (index: number) => {
    const card = cardsM[index];
    console.log(`Saving data for card ${card.id}:`, card.file, card.graphFile);
    // Add further save logic here
  };

  return (
    <>
      <Row className="justify-content-center ">
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
                          <Row>CallStatus-District-Call</Row>
                        </Card>
                        <div className="d-flex justify-content-between">
                          <Button onClick={AddNewCard}>+Add</Button>
                        </div>
                        {cards.map((card, index) => (
                          <Card key={card.id} className="my-2 mx-4">
                            <div className="  my-2 mx-4">
                              <div className=" my-2 ">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    {card.file && (
                                      <p>Selected file: {card.file.name}</p>
                                    )}
                                  </div>
                                  <Button
                                    className="px-5-excel my-2"
                                    onClick={() => handleFileButtonClick(index)}
                                  >
                                    Excel
                                  </Button>

                                  <input
                                    type="file"
                                    ref={(el) =>
                                      (fileInputRefs.current[index] = el)
                                    }
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileChange(e, index)}
                                  />
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    {card.graphFile && (
                                      <p>
                                        Selected file: {card.graphFile.name}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    className="px-5-excel"
                                    onClick={() =>
                                      handleGraphFileButtonClick(index)
                                    }
                                  >
                                    Graph
                                  </Button>
                                  <input
                                    type="file"
                                    ref={(el) =>
                                      (graphFileInputRefs.current[index] = el)
                                    }
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                      handleGraphFileChange(e, index)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <Button
                              className="mx-1 my-1"
                              onClick={() => saveData(index)}
                            >
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
                          <Row>CallStatus-District-Call</Row>
                        </Card>
                        <div className="d-flex justify-content-between">
                          <Button onClick={AddNewCardM}>+Add</Button>
                        </div>
                        {cardsM.map((card1, index) => (
                          <Card key={card1.id} className="my-2 mx-4">
                            <div className="  my-2 mx-4">
                              <div className=" my-2 ">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    {card1.file && (
                                      <p>Selected file: {card1.file.name}</p>
                                    )}
                                  </div>
                                  <Button
                                    className="px-5-excel my-2"
                                    onClick={() =>
                                      handleFileButtonClickM(index)
                                    }
                                  >
                                    Excel
                                  </Button>

                                  <input
                                    type="file"
                                    ref={(el) =>
                                      (fileInputRefsM.current[index] = el)
                                    }
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                      handleFileChangeM(e, index)
                                    }
                                  />
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    {card1.graphFile && (
                                      <p>
                                        Selected file: {card1.graphFile.name}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    className="px-5-excel"
                                    onClick={() =>
                                      handleGraphFileButtonClickM(index)
                                    }
                                  >
                                    Graph
                                  </Button>
                                  <input
                                    type="file"
                                    ref={(el) =>
                                      (graphFileInputRefsM.current[index] = el)
                                    }
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                      handleGraphFileChangeM(e, index)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <Button
                              className="mx-1 my-1"
                              onClick={() => saveDataM(index)}
                            >
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

export default Districtreport;
