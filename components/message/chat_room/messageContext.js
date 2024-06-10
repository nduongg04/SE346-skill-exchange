import React, { createContext, useState } from 'react';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [sound, setSound] = useState(null);

  return (
    <MessageContext.Provider value={{ sound, setSound }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
