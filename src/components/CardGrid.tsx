import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Descriptions, Modal, Row, Button, Space } from 'antd';
import { supabaseClient } from 'src/utility'; // Import the supabase client instance
import Meta from 'antd/lib/card/Meta';
import QR from './QR';

// Define an interface for the data structure
interface CardData {
  projects: string;
  id: number;
  title: string;
  cardContent: string;
  tasks: string;
  posts: string;
  status: string;
  avatar_url: string; 
  description: string;
  items: string;
  details: string;
}

const CardGrid: React.FC = () => {
  // State to hold the data fetched from the backend
  const [data, setData] = useState<CardData[]>([]);
  // State to hold the selected card data for the modal
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect hook to fetch data from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      // Fetch data from Supabase
      const { data: fetchedData, error } = await supabaseClient
        .from('categories') // Specify the interface type for the data
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

  // Function to handle when a card is clicked
  const handleCardClick = (card: CardData) => {
    setSelectedCard(card); // Set the selected card data
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle when the modal is closed
  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Row gutter={[16, 16]}> {/* Add gutter with a vertical spacing of 16 units */}
      {data.map((item) => (
        <Col span={8} key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}> {/* Specify the desired column size for each card */}
          <Card
            title={item.projects}
            cover={
              <Avatar 
                size={150} // Set the size of the avatar
                shape='square' 
                alt="avatar" 
                src={item.avatar_url} 
                style={{ 
                  display: 'block', // Ensure the avatar is a square by removing any inherited styles
                  margin: '0 auto', // Center the avatar horizontally
                  marginBottom: 16 // Add margin to the bottom of the avatar
                }} 
              />
            }
            onClick={() => handleCardClick(item)} // Handle the card click event
          >
            <Meta title={item.description} description={item.status} />
          </Card>
        </Col>
      ))}
      {/* Render the modal outside of the data.map loop */}
      <Modal title={selectedCard?.projects} visible={isModalOpen} onCancel={handleModalClose} footer={null}>
        {selectedCard && (
          <>
            <Avatar 
              size={150} // Set the size of the avatar
              shape='square' 
              alt="avatar" 
              src={selectedCard.avatar_url} 
              style={{ 
                display: 'block', // Ensure the avatar is a square by removing any inherited styles
                margin: '0 auto', // Center the avatar horizontally
                marginBottom: 16 // Add margin to the bottom of the avatar
              }} 
            />
            <Descriptions>
              <Descriptions.Item label="Project">{selectedCard.projects}</Descriptions.Item>
              
            </Descriptions>
            <Descriptions.Item label="Details">{selectedCard.details}</Descriptions.Item>
          </>
        )}
      </Modal>
    </Row>
  );
};

export default CardGrid;
