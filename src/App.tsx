import React, { useRef, useState, useEffect } from "react";
import OpenAI from "openai";
import db from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

import UserMessage from "./components/userMessage";
import GeneratedMessage from "./components/generatedMessage";
import InputBar from "./components/inputBar";

interface Message {
  isUser: boolean;
  message: string;
  time: Date;
}

function App() {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomOfMessages = useRef<HTMLDivElement>(null);
  const messagesCollectionRef = collection(db, "messages");

  useEffect(() => {
    const getMessages = async () => {
      let data = await getDocs(messagesCollectionRef);
      const sortedDataDocs = data.docs.sort((a, b) => {
        return a.data().time.seconds > b.data().time.seconds ? 1 : -1;
      });
      setMessages(
        sortedDataDocs.map((doc) => {
          return {
            isUser: doc.data().isUser,
            message: doc.data().message,
            time: doc.data().time,
          };
        })
      );
    };

    getMessages();
  }, []);

  const sendMessageOnClick = async (message: string) => {
    // TODO: UPLOAD messages to firebase, instead of locally
    const copyOfMessages = [...messages];

    const userMessage = {
      isUser: true,
      message: message,
      time: new Date(),
    };
    copyOfMessages.push(userMessage);
    setMessages([...copyOfMessages]);
    await addDoc(messagesCollectionRef, userMessage);

    await new Promise((r) => setTimeout(r, 100));
    bottomOfMessages?.current?.scrollIntoView({ behavior: "smooth" });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    const generatedMessage = {
      isUser: false,
      message:
        completion.choices[0].message.content ?? "Error, please try again.",
      time: new Date(),
    };
    copyOfMessages.push(generatedMessage);
    setMessages([...copyOfMessages]);
    await addDoc(messagesCollectionRef, generatedMessage);

    await new Promise((r) => setTimeout(r, 100));
    bottomOfMessages?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-6">
      <div className="overflow-y-auto mb-[108px]">
        {messages.map((message) => {
          if (message.isUser) {
            return <UserMessage message={message.message} />;
          } else {
            return <GeneratedMessage message={message.message} />;
          }
        })}
        <div ref={bottomOfMessages} />
      </div>
      <InputBar onClickFunction={sendMessageOnClick} />
    </div>
  );
}

export default App;
