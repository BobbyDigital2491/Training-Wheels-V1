import React, { useEffect, useState } from 'react';
import { Avatar, Card, Descriptions, List, Space, Typography } from 'antd';
import { supabaseClient } from 'src/utility'; // Import the Supabase client
import { TextField } from '@refinedev/antd';

const { Text } = Typography;

interface Comment {
  type: string;
  projects: string;
  id: number;
  title: string;
  comment: string;
  tasks: string;
  posts: string;
  status: string;
  avatar_url: string; 
  description: string;
  items: string;
  details: string;
  created_by: string;
  website: string;
  email: string;
  address: string;
  phone_number: string;
}

const Comments: React.FC = () => {
  const [commentData, setCommentData] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('comments')
          .select('*');

        if (error) {
          throw new Error('Failed to fetch comments');
        }

        setCommentData(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <Typography>
      {commentData.map((comment, index) => (
        <div key={index}>
          <TextField value={comment.comment} />
          <br/><br/>
          <Avatar src={comment.avatar_url} />&nbsp;
          <TextField value={comment.created_by} />
        </div>
      ))}
    </Typography>
  );
};

export default Comments;
