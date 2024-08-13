import { Audio, Video } from "expo-av";
import react from "react";
import WebView from "react-native-webview";

export default VideoScreen = ({videoUrl}) => {
  const video = react.useRef(null);
  const [status, setStatus] = react.useState({});

  const pauseVideo = () => {
    if (video.current) {
      video.current.pauseAsync();
    }
  };
  const playVideo = () => {
    if (video.current) {
      video.current.playAsync();
    }
  };

  const handlePlaying  = () => {
    if(status){
        pauseVideo()
    }else{
        playVideo()
    }
    // setStatus(status);
    // console.log(status, `-----------------`);
  }

  if(!videoUrl){
    return null
  }

  return (
    <WebView 
    source={{ uri: videoUrl }}
    style={{ width: "100%", height: 200 }}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    />
     
    
    // <Video
    //   source={{
    //     uri: videoUrl,
    //   }}
    //   rate={1.0}
    //   volume={1.0}
    //   isMuted={false}
    //   resizeMode="cover"
    //   shouldPlay={status}
    //   isLooping
    //   useNativeControls={true}
    //   onPlaybackStatusUpdate={handlePlaying}
    //   ref={video.current}
    //   style={{ width: "100%", height: 200 }}
    // />
  );
};
