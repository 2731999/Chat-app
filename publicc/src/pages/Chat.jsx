import React from 'react';
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Contacts from "../components/Contacts";
import { Welcome } from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { allUsersRoute, host } from "../utils/APIroutes";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
        if (!localStorage.getItem('chat-app-user')){
          navigate('/login');
        }
      }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('chat-app-user'));
        if (!userData) {
          navigate("/login");
          return;
        } else {
          setIsLoaded(true);
        }
        setCurrentUser(userData);
        if (userData.isAvatarImageSet) {
          const response = await axios.get(`${allUsersRoute}/${userData._id}`);
          setContacts(response.data);
        } else {
          navigate("/setAvatar");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [navigate]);

  const handelChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <>
      <Container>
        <div className='container'>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handelChatChange}/>
          { isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser}/>
          )}
        </div>
      </Container>
    </>
  )
};


const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height : 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat;
