import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function BannerSubs() {
    return (
        <TouchableOpacity style={styles.banner}>
            <Image
                source={require('../assets/BannerSubs.png')} // Path ke gambar lokal
                style={styles.image}
                resizeMode="contain" // Menjaga rasio aspek gambar
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    banner: {
        alignItems: 'center',
        // padding: 10,
        // backgroundColor: '#f0f0f0', // Anda bisa menyesuaikan warna latar belakang
    },
    image: {
        width: '100%', // Menggunakan lebar 100% dari parent container
        // height: undefined, // Otomatis menyesuaikan tinggi untuk menjaga rasio aspek
        // aspectRatio: 1, // Gunakan aspectRatio untuk menjaga proporsi gambar
    },
    text: {
        fontSize: 16, // Sesuaikan ukuran teks
        color: '#333', // Sesuaikan warna teks
    },
});
