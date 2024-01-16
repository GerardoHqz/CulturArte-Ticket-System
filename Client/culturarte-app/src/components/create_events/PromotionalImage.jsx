import React from "react";
import { FileImageFilled } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { addImage } from "../../services/Image";

const { Dragger } = Upload;
const token = localStorage.getItem("token");

function PromotionalImage() {
  const handleUpload = (file) => {
    addImage(file, token)
      .then((response) => {
        message.success(`${file.name} file uploaded successfully.`);
        localStorage.setItem("Image", response)
      })
      .catch((error) => {
        message.error(`${file.name} file upload failed. Error: ${error.message}`);
      });
      
  };

  const beforeUpload = (file) => {
    handleUpload(file);
    return false; // Evita la subida automática del archivo
  };

  return (
    <div className="bg-gray-200 p-6 rounded" style={{ background: '#d9d9d9', height: '100%' }}>
      <Dragger
        name="file"
        multiple={false}
        headers={{
          authorization: 'authorization-text',
        }}
        listType="picture"
        accept=".png,.jpeg,.gif,.jpg"
        beforeUpload={beforeUpload}
        onDrop={(e) => console.log('Dropped files', e.dataTransfer.files)}
        style={{ borderColor: '#707070', padding: '1rem', height: '100%', width: '100%' }}
      >
        <p className="ant-upload-drag-icon font-montserrat">
          <FileImageFilled style={{ color: '#707070' }} />
        </p>
        <p className="ant-upload-text font-montserrat font-medium font-montserrat">Subir imagen</p>
        <p className="ant-upload-hint font-montserrat text-grayborder font-montserrat">
          Arrastra y suelta la imagen aquí, o da click para seleccionar la imagen a subir
        </p>
      </Dragger>
    </div>
  );
}

export default PromotionalImage;


