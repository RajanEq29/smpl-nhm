/* eslint-disable react/jsx-key */
import { FC, Fragment, useEffect, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProductlistProps {
  id: string;
}

const schema = yup
  .object({
    moddleNo: yup.string().required(),
    name: yup.string().required(),
    heading: yup.string().required(),
    price: yup.string().required(),
    originalPrice: yup.string().required(),
    link: yup.string().required(),
  })
  .required();

const Productlist: FC<ProductlistProps> = () => {
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [xlShow, setXlShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const user = localStorage.getItem("user");
  const [loader, setLoader] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Redirect to homepage if user is not authenticated
    if (!token || !user) {
      navigate("/"); // Redirect to homepage
    } else {
    
      fetchProducts();
    }
  }, [navigate]); // Added navigate as a dependency
  useEffect(() => {
    fetchProducts();
  }, []);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const fetchProducts = async () => {
    try {
      setLoadingData(true);
      const res = await axios.get(
        "https://backend.nhmdashboard.in/api/urls",
        config
      );

      setProduct(res?.data);
      setLoadingData(false);
    } catch (error) {
      console.error("error fetching pdf:", error);
      setLoadingData(false);
    }
  };

  const {} = useForm({
    resolver: yupResolver(schema),
  });

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const formSubmit = async (e: any) => {
    setLoader(true);
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const currentDate = new Date();
    const isoDate = currentDate.toISOString(); // Convert to ISO string
    const formData = new FormData();
    formData.append("file", file);
    formData.append("date", isoDate);

    // { url, date }
    // Get the current date

    try {
      await axios.post(
        "https://backend.nhmdashboard.in/api/urls",
        formData,
        config
      );

      fetchProducts();
      setLoader(false);
      setXlShow(false);
      setShow(false);
    } catch (error) {
      console.log("error uploading pdf:", error);
    }
    setShow(false);
    setLoader(false);
  };

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(
        `https://backend.nhmdashboard.in/api/urls/${productId}`,
        config
      );
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // Filter products by selected date
  const filteredProducts = filterDate
    ? product.filter(
        (p: any) =>
          new Date(p.date).toLocaleDateString() ===
          new Date(filterDate).toLocaleDateString()
      )
    : product;
  return (
    <Fragment>
      <Col>
        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3"></Card.Header>
      </Col>

      <Col xl={12}>
        <Card className="custom-card">
          {user === "smplnhm@smplindia.com" && (
            <Card.Body className="">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex flex-wrap gap-1">
                  <h1 className="fs-6 fw-bold">Upload Pdf</h1>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex flex-sm-row">
                    <button
                      className="btn btn-primary btn-sm text-nowrap mt-2"
                      type="submit"
                      onClick={() => setXlShow(true)}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </Card.Body>
          )}
        </Card>
      </Col>
      <Col>
      <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3">
          <Card.Header className="flex-wrap gap-3 p-3 w-25">
            <h1 className="fs-6 fw-bold">Search</h1>
            <Form.Control 
              type="date"
              onChange={(e) => setFilterDate(e.target.value)}
              value={filterDate ?? ""}
              className="mb-3"
            />
        </Card.Header>
        </Card.Header>
      </Col>
      {loadingData ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" role="status" className="text-primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="product-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {provided.placeholder}
                <Row className="d-flex">
                  {filteredProducts?.map((product: any, index: number) => (
                    <Draggable
                      key={product._id}
                      draggableId={product._id}
                      index={index}
                    >
                      {(provided) => (
                        <Col
                          xl={3}
                          id="draggable-left"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="h-100">
                            <Card key={index} className="custom-card h-100">
                              <Card.Body className="rounded-3 mt-3">
                                {user === "smplnhm@smplindia.com" && (
                                  <Dropdown className="d-flex justify-content-end">
                                    <Dropdown.Toggle
                                      variant="light"
                                      className="btn btn-icon btn-wave waves-light no-caret"
                                      type="button"
                                    >
                                      <i className="bi bi-three-dots-vertical text-primary fs-14 "></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        href="#"
                                        onClick={() =>
                                          handleDelete(product._id)
                                        }
                                      >
                                        Delete
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                )}

                                <img
                                  src={
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
                                  }
                                  className="rounded mx-auto d-block"
                                  alt="..."
                                  style={{ maxWidth: "50%" }}
                                />
                              </Card.Body>

                              <Card.Footer>
                                <div className="d-flex justify-content-between">
                                  <span className="fs-14 fw-bold mt-2">
                                    {new Date(
                                      product.date
                                    ).toLocaleDateString()}
                                  </span>

                                  {product.url && (
                                    <div className="mt-2">
                                      <a
                                        href={product.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline-danger"
                                      >
                                        <i className="bi bi-file-earmark-pdf-fill me-1"></i>
                                        View PDF
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </Card.Footer>
                            </Card>
                          </div>
                        </Col>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Row>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <Modal
        size="xl"
        show={xlShow}
        onHide={() => setXlShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6" id="example-modal-sizes-title-sm">
            Upload Pdf
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formSubmit}>
          <Modal.Body>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Body>
                  <Form.Label htmlFor="input-file" className="fs-14">
                    Upload Pdf
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="input-file"
                    accept="application/pdf"
                    onChange={handleFile}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setXlShow(false)}
            >
              Close
            </button>
            <button
              className=" border-0 bg-primary rounded-2 py-2 fw-semibold fs-6 text-fixed-white button"
              disabled={loader}
            >
              {loader ? (
                <button
                  className=" bg-primary border-0 bg-bluee text-fixed-white rounded-1 ms-2 px-4 fw-semibold fs-14"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm mx-2 "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Uploading...
                </button>
              ) : (
                <span
                  className="ms-2 fs-15 fw-semibold"
                  onClick={() => setXlShow(true)}
                >
                  Upload
                </span>
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Pdf uploaded successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Fragment>
  );
};

export default Productlist;
