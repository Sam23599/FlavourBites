import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const restaurant = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Ionicons onPress={() => router.back()} style={{ padding: 5 }} name="arrow-back" size={24} color="black" />
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24, gap: 10 }}>
          <SimpleLineIcons name='camera' size={24} color="black" />
          <Ionicons name='bookmark-outline' size={24} color="black" />
          <MaterialCommunityIcons name='share-outline' size={24} color="black" />
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{params?.name}</Text>
        <Text style={{ marginTop: 5, color: "gray", fontWeight: "500", fontSize: 15 }}>North Indian - Fast Food - 160 for one</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#006A4E", borderRadius: 4, paddingHorizontal: 4, paddingVertical: 5, gap: 4 }}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>{params?.aggregate_rating}</Text>
            <Ionicons name='star' size={15} color="white" />
          </View>
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 5 }}>3.2K Rating</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#D0F0C0", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginTop: 12 }}>
          <Text>30-40 mins | 6km | Hyd</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default restaurant

const styles = StyleSheet.create({})