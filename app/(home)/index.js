import { Alert, StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from "expo-location";
import * as LocationGeocoding from 'expo-location';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Carousel from '../../components/Carousel';


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
            <Carousel/>
        </ScrollView>
    )
}
export default index

const styles = StyleSheet.create