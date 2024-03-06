import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from "expo-location";
import * as LocationGeocoding from 'expo-location';

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
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}
export default index

const styles = StyleSheet.create