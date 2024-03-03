import React, { useState } from 'react';
import { Avatar, Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer} >
          Open
        </Button>
      </Space>
      <Drawer
        title="Job Steps"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Avatar 
              size={300} // Set the size of the avatar
              shape='square' 
              alt="avatar" 
              src="https://di-uploads-pod3.dealerinspire.com/fletcherjonesmercedesbenzchicago/uploads/2020/10/MB-Fall-Car-Care-Featured-Image-1.jpg" 
              style={{ 
                display: 'block', // Ensure the avatar is a square by removing any inherited styles
                margin: '0 auto', // Center the avatar horizontally
                marginBottom: 16 // Add margin to the bottom of the avatar
              }} 
            />
        <Paragraph>
        <li>Program must allow individual planners to input their own information (JES / special work steps) that will show in both picture and word text</li>
        </Paragraph>
        
      </Drawer>
    </>
  );
};

export default App;