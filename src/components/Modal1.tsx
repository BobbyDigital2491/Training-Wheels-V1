import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal } from 'antd';
import { supabaseClient } from 'src/utility';

const Modal1: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null); // State to store the data for the modal
  const [data, setData] = useState<ModalData[]>([]);

  const showModal = (item: ModalData) => {
    setModalData(item); // Set the data for the modal
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  interface ModalData {
    projects: string;
    id: number;
    title: string;
    details: string;
    tasks: string;
    posts: string;
    status: string;
    avatar_url: string; 
    description: string;
    items: string;
  }

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      // Fetch data from Supabase
      const { data: fetchedData, error } = await supabaseClient
        .from('categories') // Specify the table name
        .select('*');
      
      if (error) {
        throw new Error('Failed to fetch data');
      }
      
      // Update the state with the fetched data
      setData(fetchedData || []); // Handle the case where fetchedData is null
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect hook to fetch data from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button type="primary" onClick={() => showModal(data[0])}>
        Details
      </Button>
      {/* Render the modal outside of the data.map loop */}
      <Modal title={modalData?.projects} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {modalData && (
          <div>
            <p>{modalData.title}</p>
            <Avatar 
                size={150} // Set the size of the avatar
                shape='square' 
                alt="avatar" 
                src={modalData.avatar_url} 
                style={{ 
                  display: 'block', // Ensure the avatar is a square by removing any inherited styles
                  margin: '0 auto', // Center the avatar horizontally
                  marginBottom: 16 // Add margin to the bottom of the avatar
                }} 
              />
           
            <p>{modalData.details}</p>
            <p>{modalData.status}</p>
            {/* Add other fields as needed */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Modal1;
