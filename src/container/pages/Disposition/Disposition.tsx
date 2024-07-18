/* eslint-disable linebreak-style */

import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import DispositionDaily from "./DisposionDaily";
import DispositionMonths from "./DispositionMonths";

interface Row {
  id: number;
  timeInterval: string;
  totalCalls: string;
  overallAnswered: string;
  overallAbandoned: string;
  answeredPercent: string;
  acht: string;
  graphFile?: File;
  imageFile?: File;
}

export const Disposition: React.FC = () => {
  return (
    <>
      <Row className="justify-content-center ">
        <Col>
          <div className="container-lg">
            <Tab.Container defaultActiveKey="one">
              <div className="d-flex justify-content-center mb-4">
                <Nav
                  className="nav-tabs b-3 tab-style-6 bg-primary-transparent mt-4 "
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
                      <div className="mx-2 my-2">
                        <DispositionDaily />
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
                      <div className="mx-2 my-2">
                        <DispositionMonths />
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
