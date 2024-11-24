// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Constants from 'expo-constants'; // Import Constants

// const ChatbotScreen = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'bot', text: 'Hi! How can I assist you today with financial advice?' },
//   ]);
//   const [inputText, setInputText] = useState('');

//   // Hardcoded Hugging Face API key for testing
//   const huggingfaceApiKey = "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"; // Replace this with your actual Hugging Face API key

//   if (!huggingfaceApiKey) {
//     console.error('Hugging Face API key is missing or not configured properly.');
//     return (
//       <View style={styles.background}>
//         <Text style={styles.headerText}>API Key Missing</Text>
//       </View>
//     );
//   }

//   const sendMessage = async () => {
//     if (!inputText.trim()) return;
  
//     const newMessage = { id: Date.now(), sender: 'user', text: inputText };
//     setMessages([...messages, newMessage]);
  
//     try {
//       const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${huggingfaceApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           inputs: inputText,
//         }),
//       });
  
//       const data = await response.json();
  
//       console.log("Hugging Face Response:", data); // Log the whole response
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch from Hugging Face API');
//       }
  
//       // Access the generated_text correctly from the response
//       const botMessage = data?.[0]?.generated_text || "Sorry, I couldn't understand your request.";
  
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: Date.now() + 1, sender: 'bot', text: botMessage },
//       ]);
//     } catch (error) {
//       console.error('Error calling Hugging Face API:', error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: Date.now() + 1, sender: 'bot', text: 'Sorry, there was an error processing your request.' },
//       ]);
//     }
  
//     setInputText('');
//   };
  

//   const renderMessage = ({ item }) => (
//     <View
//       style={[styles.messageContainer, item.sender === 'bot' ? styles.botMessage : styles.userMessage]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.background}>
//       {/* Overlay to cover top icons */}
//       <View style={styles.headerOverlay}>
//         <Text style={styles.headerText}>AI Financial Chatbot</Text>
//       </View>

//       {/* Chatbot Messages */}
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.chatContainer}
//         inverted
//       />

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity>
//           <Icon name="mic-outline" size={28} color="#FFC107" />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Type your message..."
//           placeholderTextColor="#ccc"
//           value={inputText}
//           onChangeText={setInputText}
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Icon name="send-outline" size={28} color="#FFC107" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="attach-outline" size={28} color="#FFC107" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     backgroundColor: '#000', // Solid black background
//   },
//   headerOverlay: {
//     height: 130, // Adjust to fit your icons
//     backgroundColor: '#FFC107',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   headerText: {
//     color: '#000',
//     fontSize: 18,
//     paddingTop: 50,
//     fontWeight: 'bold',
//   },
//   chatContainer: {
//     padding: 10,
//     paddingTop: 20,
//   },
//   messageContainer: {
//     marginVertical: 5,
//     maxWidth: '75%',
//     padding: 10,
//     borderRadius: 15,
//   },
//   botMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#FFC107',
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#333',
//   },
//   messageText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#1a1a1a',
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   textInput: {
//     flex: 1,
//     height: 40,
//     backgroundColor: '#333',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     color: '#fff',
//     marginHorizontal: 10,
//   },
// });

// export default ChatbotScreen;
// real code above

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants'; 

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! How can I assist you today with financial advice?' },
  ]);
  const [inputText, setInputText] = useState('');

  const flatListRef = useRef(); 
  const huggingfaceApiKey = "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"; 

  if (!huggingfaceApiKey) {
    console.error('Hugging Face API key is missing or not configured properly.');
    return (
      <View style={styles.background}>
        <Text style={styles.headerText}>API Key Missing</Text>
      </View>
    );
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return;
  
    const newMessage = { id: Date.now(), sender: 'user', text: inputText };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${huggingfaceApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: inputText,
        }),
      });
  
      const data = await response.json();
  
      console.log("Hugging Face Response:", data); 
  
      if (!response.ok) {
        throw new Error('Failed to fetch from Hugging Face API');
      }
  
      const botMessage = data?.[0]?.generated_text || "Sorry, I couldn't understand your request.";
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, sender: 'bot', text: botMessage },
      ]);
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, sender: 'bot', text: 'Sorry, there was an error processing your request.' },
      ]);
    }
  
    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[styles.messageContainer, item.sender === 'bot' ? styles.botMessage : styles.userMessage]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.background}>
     
      <View style={styles.headerOverlay}>
        <Text style={styles.headerText}>AI Financial Chatbot</Text>
      </View>
      <FlatList
        ref={flatListRef} 
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon name="mic-outline" size={28} color="#FFC107" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#ccc"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send-outline" size={28} color="#FFC107" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="attach-outline" size={28} color="#FFC107" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000', 
  },
  headerOverlay: {
    height: 130, 
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    paddingTop: 50,
    fontWeight: 'bold',
  },
  chatContainer: {
    padding: 10,
    paddingTop: 20,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '75%',
    padding: 10,
    borderRadius: 15,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFC107',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#333',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    marginHorizontal: 10,
  },
});

export default ChatbotScreen;
