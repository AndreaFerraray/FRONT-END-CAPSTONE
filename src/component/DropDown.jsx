import React, { useState } from "react";
import { Button, Col, Dropdown } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";

const CaricatoreFileDropDown = ({ handleChange, fileTypes }) => {
  const [showUploader, setShowUploader] = useState(false);

  const handleToggleUploader = () => {
    setShowUploader(!showUploader);
  };

  const caricaFile = (file) => {
    handleChange(file);
    handleToggleUploader();
  };

  return (
    <Col>
      <Dropdown show={showUploader} onClose={() => setShowUploader(false)}>
        <Dropdown.Toggle as={Button} onClick={handleToggleUploader}>
          Seleziona file
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <FileUploader handleChange={caricaFile} name="file" types={fileTypes} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default CaricatoreFileDropDown;
