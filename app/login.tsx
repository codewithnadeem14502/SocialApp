import Colors from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.replace("(tabs)/mainscreen");
    setEmail("");
    setOtp("");
    console.log("Logging in with:", email, otp);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text.trim() !== "" && !isEmailValid(text)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const handleOtpChange = (text: string) => {
    setOtp(text);
    if (text.trim() !== "" && text.trim()?.length !== 6) {
      setOtpError("OTP must be 6 characters");
    } else {
      setOtpError("");
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    otp.trim() !== "" &&
    isEmailValid(email) &&
    otp.trim()?.length === 6;

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fHw%3D",
            }}
            style={styles.image}
          />

          <TextInput
            style={[styles.input, { borderColor: emailError ? "red" : "gray" }]}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <TextInput
            style={[styles.input, { borderColor: otpError ? "red" : "gray" }]}
            placeholder="OTP"
            value={otp}
            onChangeText={handleOtpChange}
            keyboardType="numeric"
          />
          {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              { backgroundColor: isFormValid ? Colors.blue : "grey" },
            ]}
            onPress={handleLogin}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F9",
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFF",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 70,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default Login;
