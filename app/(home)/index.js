import { Alert, StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from "expo-location";
import * as LocationGeocoding from 'expo-location';
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import Carousel from '../../components/Carousel';
import Categories from '../../components/Categories';

const index = () => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Fetching your location ...");

    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }, []);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location Services not enabled", "Please Enable",
                [{ text: "OK" }],
                { cancelable: false }
            );
        }
        else {
            setLocationServicesEnabled(true);
        }
    }

    const GetCurrentLocation = async () => {
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        console.log('Foreground status:', foregroundStatus);

        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission not Granted", "Allow the app to use the location Service",
                [{ text: "OK" }],
                { cancelable: false }
            )
        }
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        })
        console.log("Current location: ", location);

        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            const response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            const address = await LocationGeocoding.reverseGeocodeAsync({
                latitude,
                longitude
            })

            const streetAddress = address[0].name;
            for (let item of response) {
                let address = `${item.name}, ${item?.postalCode},${item?.city} `;
                setDisplayCurrentAddress(address);
            }
        }
    }

    console.log("my address", displayCurrentAddress);

    const recommended = [
        {
            id: 0,
            name: "Nandhana Palace",
            image:
                "https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            time: "35 - 45",
            type: "Andhra",
        },
        {
            id: 0,
            name: "GFC Biriyani",
            image:
                "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
            time: "10 - 35",
            type: "North Indian",
        },
        {
            id: 0,
            name: "Happiness Dhaba",
            image:
                "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            time: "20 - 25",
            type: "North Indian",
        },

        {
            id: 0,
            name: "Happiness Dhaba",
            image:
                "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            time: "20 - 25",
            type: "North Indian",
        },
        {
            id: 0,
            name: "Happiness Dhaba",
            image:
                "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            time: "20 - 25",
            type: "North Indian",
        },
    ];

    const items = [
        {
            id: "0",
            name: "Offers",
            description: "Upto 50% off",
            image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
        },
        {
            id: "1",
            name: "Legends",
            description: "Across India",
            image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
        },
        {
            id: "2",
            name: "Gourmet",
            description: "Selections",
            image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
        },
        {
            id: "3",
            name: "Healthy",
            description: "Curated dishes",
            image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
        },
    ];

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 10 }}>
                <Octicons name="location" size={24} color="#E52850" />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Deliver to</Text>
                    <Text style={{ color: "gray", fontSize: 16, margin: 3 }}>{displayCurrentAddress}</Text>
                </View>
                <Pressable style={{ backgroundColor: "#6cB4EE", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                    <Text>S</Text>
                </Pressable>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "#C0C0C0",
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 11,
                    marginTop: 10,
                    marginHorizontal: 10,
                }}>
                <TextInput placeholder="Search for food, hotels" />
                <AntDesign name="search1" size={24} color="#E52B50" />
            </View>
            <Carousel />
            <Categories />

            <Text style={{ textAlign: "center", marginTop: 6, letterSpacing: 4, marginBottom: 5, marginTop: 3, color: "grey" }}>Recommended</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommended?.map((item, index) => (
                    <View style={{ backgroundColor: "white", flexDirection: "row", margin: 10, borderRadius: 8 }} >
                        <View>
                            <Image style={{ width: 100, height: 100, resizeMode: "cover", borderTopLeftRadius: 8, borderBottomLeftRadius: 7 }} source={{ uri: item?.image }} />
                        </View>
                        <View style={{ padding: 10, flexDirection: "column" }} >
                            <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name} </Text>
                            <Text style={{ flex: 1, marginTop: 3, color: "grey", fontWeight: "500" }}> {item?.type} </Text>
                            <View style={{ flexDirection: "row", alignContent: "center", gap: 3 }}>
                                <Ionicons name="time" size={24} color="green" />
                                <Text>{item?.time} mins</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Text style={{ textAlign: "center", marginTop: 6, letterSpacing: 4, marginBottom: 5, color: "grey" }}> Explore</Text>
        </ScrollView>
    )
}
export default index

const styles = StyleSheet.create