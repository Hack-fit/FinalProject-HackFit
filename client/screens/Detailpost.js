import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import api from "../helper/axios";
import { showMessage } from "react-native-flash-message";

export default function DetailPost({ route }) {
    const { name, username, train, postid, likes, trainid } = route.params;

    const handleLike = async () => {
        try {
            await api({
                url: `/like-post/${postid}`,
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('access-token')}`
                }
            });
            showMessage({
                message: "Success",
                description: "Post has been liked successfully.",
                type: "success"
            });
        } catch (error) {
            console.log(error.response.data);
            showMessage({
                message: error.response.data,
                type: 'danger'
            });
        }
    };

    const handlegettraining = async () => {
        try {
            await api({
                url: `/get-shared-todo/${trainid}`,
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('access-token')}`
                }
            });
            showMessage({
                message: "Success",
                description: "Training added",
                type: 'success'
            });
        } catch (error) {
            console.log(error.response.data);
            showMessage({
                message: error.response.data,
                type: 'danger'
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.username}>@{username}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handlegettraining}>
                    <Entypo name="export" size={24} color={"black"} />
                    <Text style={styles.footerText}>Add to My Training</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.likeButton]} onPress={handleLike}>
                    <Entypo name="heart" size={24} color={"red"} />
                    <Text style={styles.footerText}>{likes.length}</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.scrollView}>
                {train.map((item, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <View style={styles.headerContainer}>
                            <MaterialIcons name="today" size={24} color="#4CAF50" />
                            <Text style={styles.dayText}>
                                {item.day}
                            </Text>
                        </View>
                        <Text style={styles.typeText}>
                            {item.Jenis_Latihan}
                        </Text>
                        {item.Rincian_Latihan.map((detail, idx) => (
                            <View key={idx} style={styles.detailContainer}>
                                <View style={styles.exerciseInfo}>
                                    <MaterialIcons name="fitness-center" size={20} color="#FF9800" />
                                    <Text style={styles.detailText}>
                                        {`${detail.Jenis_Latihan}: ${detail.rep} reps, ${detail.set} sets`} 
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    username: {
        fontSize: 14,
        color: "#777",
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f8f8f8",
    },
    likeButton: {
        backgroundColor: "#ffe0e0",
    },
    footerText: {
        marginLeft: 5,
    },
    scrollView: {
        margin: 6,
    },
    dayContainer: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: "#555",
        marginLeft: 10,
    },
    exerciseInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    detailContainer: {
        marginLeft: 10,
        marginTop: 5,
    },
    dayText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 10,
    },
    typeText: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 10,
        color: "#4CAF50",
    },
});
