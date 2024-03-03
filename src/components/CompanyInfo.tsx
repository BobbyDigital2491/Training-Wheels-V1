import React, { useEffect, useState } from 'react';
import { Avatar, Card, Descriptions, List, Space, Typography } from 'antd';
import { supabaseClient } from 'src/utility'; // Import the Supabase client


const { Text } = Typography;

interface CompanyInfo {
  type: string;
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
  company_name: string;
  website: string;
  email: string;
  address: string;
  phone_number: string;
}

const CompanyInfo: React.FC = () => {
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('company')
          .select('*');

        if (error) {
          throw new Error('Failed to fetch company data');
        }

        setCompanyData(data || []);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <Card>
      
        {companyData.map((item) => (
          
           
            <div>
              
                {/* Assuming label is a property in your company_info table */}
                <List key={item.id}
                      itemLayout="horizontal"
                      dataSource={companyData}
                      renderItem={(item, index) => (
                      <>
      
                <List.Item>
                    <Avatar src={item.avatar_url}/>
                    <Descriptions title="Company Info">
                        <Descriptions.Item label="Company Name">{item.company_name}</Descriptions.Item>
                        <Descriptions.Item label="Field">{item.type}</Descriptions.Item>
                        <Descriptions.Item label="Telephone">{item.phone_number}</Descriptions.Item>
                        <Descriptions.Item label="Website">{item.website}</Descriptions.Item>
                        <Descriptions.Item label="Address">{item.address}</Descriptions.Item>
                    </Descriptions>
                </List.Item>
                    </>
                )}
            />
            </div>

        ))}
     
      
    </Card>
  );
};

export default CompanyInfo;
