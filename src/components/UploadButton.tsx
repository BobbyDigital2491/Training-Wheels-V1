import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const MAX_FILE_SIZE_MB = 10; // Maximum file size in megabytes
const PERMITTED_FILE_TYPES = ['image/jpeg', 'image/png', 'video/mp4']; // Permitted file types

const UploadButton: React.FC = () => {
  const handleUpload = async (file: File) => {
    // Simulate uploading the file
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        message.success(`${file.name} file uploaded successfully.`);
      } else {
        throw new Error('Upload failed.');
      }
    } catch (error: any) { // Change type annotation to 'any'
      message.error(`${file.name} file upload failed: ${error.message}`);
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    beforeUpload(file: File) {
      // Check if the file size exceeds the maximum allowed size
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        message.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
        return false; // Prevent file from being uploaded
      }

      // Check if the file type is one of the permitted types
      if (!PERMITTED_FILE_TYPES.includes(file.type)) {
        message.error('Unsupported file type.');
        return false; // Prevent file from being uploaded
      }

      return true; // Allow the file to be uploaded if it passes both checks
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        handleUpload(info.file.originFileObj as File);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Max file size: {MAX_FILE_SIZE_MB}MB. Accepted file types: JPG, PNG, MP4.
      </p>
    </Dragger>
  );
};

export default UploadButton;
