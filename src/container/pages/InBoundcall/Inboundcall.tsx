import React, { useRef, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";

type Props = {};

const Inboundcall = (props: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      // Handle the file upload or further processing here
      console.log(selectedFile);
    }
  };
  return (
    <div>
      <Card className="d-flex justify-content-center align-items-center mt-4 py-3">
        <Row>CallStatus-OutBound</Row>
      </Card>
      <div>
        <Button onClick={handleFileButtonClick}>Image</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {file && <p>Selected file: {file.name}</p>}
      </div>
    </div>
  );
};
export default Inboundcall;
