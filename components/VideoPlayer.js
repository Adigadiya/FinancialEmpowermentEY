import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayer = ({ videoId }) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={videoId} 
        onChangeState={onStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default VideoPlayer;
