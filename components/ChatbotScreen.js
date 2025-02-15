import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import axios from 'axios';
import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';

const OPENAI_API_KEY = Constants.expoConfig.extra?.OPENAI_API_KEY || '';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! How can I assist you today with financial advice?' },
  ]);
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessageToOpenAI = async (message) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
      }, {
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching response:', error);
      return 'Sorry, I encountered an error processing your request.';
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = { id: Date.now(), sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    
    const botResponse = await sendMessageToOpenAI(inputText);
    const botMessage = { id: Date.now() + 1, sender: 'bot', text: botResponse };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSpeak = (messageId, text) => {
    if (speakingMessageId === messageId) {
      Speech.stop();
      setSpeakingMessageId(null);
    } else {
      setSpeakingMessageId(messageId);
      Speech.speak(text, {
        onDone: () => setSpeakingMessageId(null),
        onStopped: () => setSpeakingMessageId(null),
      });
    }
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access microphone denied');
        return;
      }
      
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      });
      formData.append('model', 'whisper-1');

      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setInputText(response.data.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View style={{ height: 60 }} />} // Adds spacing above the first message
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'bot' ? styles.botMessage : styles.userMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.sender === 'bot' && (
              <TouchableOpacity onPress={() => handleSpeak(item.id, item.text)}>
                <Icon name={speakingMessageId === item.id ? 'stop-circle' : 'volume-high'} size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        )}
        keyboardShouldPersistTaps="handled"
      />

        {recording && (
         <LottieView source={require('../assets/mic_recording.json')} autoPlay loop style={styles.recordingAnimation} />
        )}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
            <Icon name={recording ? 'mic-off' : 'mic'} size={24} color="white" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity onPress={handleSend}>
            <Icon name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: 'black' },
  container: { flex: 1, padding: 10 },
  message: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '80%' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#333' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#1e90ff' },
  messageText: { fontSize: 16, color: 'white' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#222', borderTopWidth: 1, borderColor: '#444' },
  input: { flex: 1, marginHorizontal: 10, padding: 10, borderWidth: 1, borderRadius: 20, borderColor: '#444', color: 'white' },
  recordingAnimation: { width: 100, height: 100, alignSelf: 'center' }
});

export default ChatbotScreen;
