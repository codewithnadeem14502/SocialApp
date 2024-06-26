import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import AWS from "aws-sdk";
import { awsConfig } from "./awsConfig";
import { Stack, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const CameraScreen = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const navigation = useNavigation();
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const uploadImageToS3 = async (uri: string) => {
    const response = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = Buffer.from(response, "base64");

    const params = {
      Bucket: awsConfig.bucketName,
      Key: `images/${Date.now()}.jpg`,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    const s3 = new AWS.S3(); // Initialize the AWS S3 client

    s3.upload(
      params,
      (err: Error | null, data: AWS.S3.ManagedUpload.SendData | null) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Image successfully uploaded to S3", data);
      }
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      console.log("Picture taken, URI:", uri);
      // UPLOADING OF IMAGE TO S3 BUCKET IS DONE HERE ----
      // uploadImageToS3(uri);

      // Close the camera after taking the picture
      if (cameraRef.current) {
        cameraRef.current.pausePreview(); // Pause the camera preview
        // Optionally, you can also call cameraRef.current.unloadAsync() to completely stop and release the camera resources
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing as any}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        <TouchableOpacity style={styles.TakeButton} onPress={takePicture}>
          <Text style={styles.text2}>Take Picture </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.blue,
  },
  text2: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginVertical: 5,
  },
  TakeButton: {
    padding: 20,
    backgroundColor: Colors.blue,
  },
});

export default CameraScreen;
