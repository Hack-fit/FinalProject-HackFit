import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert, TextInput } from "react-native";
import api from "../helper/axios";
import * as SecureStore from 'expo-secure-store'
import { showMessage } from "react-native-flash-message";


export default function FitAi() {
    const [level, setLevel] = useState(null);
    const [workoutFrequency, setWorkoutFrequency] = useState(null);
    const [goal, setGoal] = useState(null);
    const [name, setName] = useState(null);
    const [equipment, setEquipment] = useState([]);
    const [loading, setloading] = useState(false);

    const optionsLevel = ["Pemula", "Profesional"];
    const optionsFrequency = ["1 kali", "2 kali", "3 kali", "4 kali", "5 kali", "6 kali", "7 kali", "> 7 kali"];
    const optionsGoal = ["mengecilkan badan", "membentuk massa otot"];
    const optionsEquipment = ["Treadmill", "Bicycle", "Bench-press", "Pull-up Bar", "Dumbel", "Cable Machine", "Lat Pulldown Machine", "Pec Deck Machine", "Smith Machine", "Rowing Machine"];

    const renderSingleOption = (options, selectedOption, setSelectedOption) => {
        return options.map((option) => (
            <TouchableOpacity
                key={option}
                onPress={() => setSelectedOption(option)}
                style={[
                    styles.optionButton,
                    { backgroundColor: selectedOption === option ? "blue" : "lightgray" }
                ]}
            >
                <Text style={{ color: selectedOption === option ? "white" : "black" }}>{option}</Text>
            </TouchableOpacity>
        ));
    };

    const toggleEquipmentSelection = (option) => {
        setEquipment((prev) => {
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const renderMultipleOptions = (options, selectedOptions, toggleSelection) => {
        return options.map((option) => (
            <TouchableOpacity
                key={option}
                onPress={() => toggleSelection(option)}
                style={[
                    styles.optionButton,
                    { backgroundColor: selectedOptions.includes(option) ? "blue" : "lightgray" }
                ]}
            >
                <Text style={{ color: selectedOptions.includes(option) ? "white" : "black" }}>{option}</Text>
            </TouchableOpacity>
        ));
    };

    const handleCreatePlan = async () => {

        setloading(true)
        // console.log("Level:", level);
        // console.log("Workout Frequency:", workoutFrequency);
        // console.log("Goal:", goal);
        // console.log("Equipment:", equipment);
        // console.log("Name:", name);
        try {
        const data = await api({

            url:'/openai',
            method:'post',
            data:{
                level,
                workoutFrequency,
                goal,
                equipment,
                name
            },
            headers:{
                'Authorization':`Bearer ${await SecureStore.getItemAsync('access-token')}`
            }

        })  
            showMessage({
                message: "Plan Created!",
                description: "Your plan has been created successfully.",
                type: "success",
            })
            setloading(false)
            
        } catch (error) {
            // console.log(error)
            console.log(typeof(error.response.data.message))
            showMessage({
                message: "Failed",
                description: typeof(error.response.data.message) === typeof("String") ? error.response.data.message : "Error",
                type: "danger",
            })
            setloading(false)
        }


    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formContainer}>
                <Text style={styles.questionText}>Nama To-Do:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Masukkan nama To-Do"
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />

                <Text style={styles.questionText}>Apakah Anda seorang:</Text>
                {renderSingleOption(optionsLevel, level, setLevel)}

                <Text style={styles.questionText}>Berapa kali Anda ingin berolahraga dalam 1 minggu?</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderSingleOption(optionsFrequency, workoutFrequency, setWorkoutFrequency)}
                </ScrollView>

                <Text style={styles.questionText}>Apa tujuan Anda:</Text>
                {renderSingleOption(optionsGoal, goal, setGoal)}

                <Text style={styles.questionText}>Alat yang ingin digunakan (dapat memilih lebih dari satu):</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderMultipleOptions(optionsEquipment, equipment, toggleEquipmentSelection)}
                </ScrollView>
            </View>
            </ScrollView>

            {loading ? <TouchableOpacity style={styles.createPlanButton} onPress={handleCreatePlan}>
                <Text style={styles.buttonText}>Loading...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.createPlanButton} onPress={handleCreatePlan}>
                <Text style={styles.buttonText}>Create your Plan</Text>
            </TouchableOpacity>}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    formContainer: {
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        marginVertical: 5,
        marginRight: 10,
        borderRadius: 5,
    },
    textInput: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    createPlanButton: {
        backgroundColor: "#173B45",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },    
    input: {
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
