import React, { useEffect, useState } from 'react';
import { Divider, List, Typography } from 'antd';
import { supabaseClient } from 'src/utility'; // Import the supabase client instance

// Define an interface for the data structure
interface ShowData {
  work_element: string;
  id: number;
  plan_no: string;
  element_time: string;
  mv: string;
  mod: string;
  model_type: string;
  st: string; 
  code: string;
  symbol: string;
  vp: string;
}

const PostShow: React.FC = () => {
  // State to hold the data fetched from the backend
  const [data, setData] = useState<ShowData[]>([]);
  // State to hold the selected item
  const [selectedItem, setSelectedItem] = useState<ShowData | null>(null);

  // useEffect hook to fetch data from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      // Fetch data from Supabase
      const { data: fetchedData, error } = await supabaseClient
        .from('Standard Method & Procedure (SMP)') // Specify the interface type for the data
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

  // Function to handle when a list item is clicked
  const handleItemClick = (item: ShowData) => {
    setSelectedItem(item); // Set the selected item
  };

  return (
    <>
      <Divider orientation="left">Standard Method & Procedure (SMP)</Divider>
      <List
        size="large"
       
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item onClick={() => handleItemClick(item)}>{item.work_element}</List.Item>
        )}
      />
      {/* Render selected item details */}
      {selectedItem && (
        <div>
          <Typography.Text>Work Element: {selectedItem.work_element}</Typography.Text>
          <Typography.Text>ID: {selectedItem.id}</Typography.Text>
          <Typography.Text>Plan Number: {selectedItem.plan_no}</Typography.Text>
          
        </div>
      )}
    </>
  );
};

export default PostShow;
