import { FC, Fragment,} from "react";
import { Card, Col, Row } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";
import "swiper/css/effect-flip";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import group from "../../../../assets/images/ecommerce/png/Group.png";
import { Link } from "react-router-dom";

interface ProductdetailsProps {}

const Productdetails: FC<ProductdetailsProps> = () => {
  return (
    <Fragment>
      <Col>
        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3  p-3"></Card.Header>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body className="">
            
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex flex-wrap gap-1">
                <h1 className="fs-6 fw-bold">Product Catalog</h1>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex flex-sm-row">
                  <button
                    className="btn btn-primary btn-sm text-nowrap mt-2"
                    type="submit"
                  >
                    Product Added
                  </button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Body>
              <Row className="row gx-5">
                <Col xl={12} className="mt-xxl-0 mt-3">
                  <div className="row justify-content-center">
                    <Col xxl={12} xl={12} lg={12} sm={12} className="col-12">
                      <Link to={"/upload-pdf"}>
                        <div className="ecommerce-assurance">
                          <p className="mb-3">
                            <img src={group} className="" alt="..." />
                          </p>
                          <p className="fs-6 fw-semibold text-primary  ">
                            PRODUCT CATALOG
                          </p>
                        </div>
                      </Link>
                    </Col>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Productdetails;
