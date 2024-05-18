import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";


const MenuItem = ({ item }) => {

    const [addItems, setAddItems] = useState(0);
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();

    return (
        <View>
            <Pressable style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", width: 220 }} >{item?.name}</Text>
                    <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }} >₹{item?.price}</Text>
                    <Text style={{ marginTop: 5, borderRadius: 4, }}>
                        {[0, 0, 0, 0, 0].map((en, i) => (
                            <FontAwesome
                                // key={`${food.id}-${i}`}
                                key={i}
                                style={{ paddingHorizontal: 3 }}
                                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                                size={15}
                                color="#FFD700"
                            />
                        ))}
                    </Text>

                    <Text style={{ width: 200, marginTop: 8, color: "gray", fontSize: 16 }} >{item?.description.length > 40 ? item?.description.substr(0, 30) + "..." : item?.description}</Text>
                </View>

                <Pressable style={{ marginRight: 10 }} >
                    <Image style={{ width: 120, height: 120, borderRadius: 8 }} source={{ uri: item?.image }} />
                    {selected ? (
                        <View style={{ position: "absolute", top: 95, left: 20, backgroundColor: "#fd5c63", flexDirection: "row", paddingHorizontal: 10, alignItems: "center", borderRadius: 5, }}>

                            {/* Decrement/Remove items from cart */}
                            <Pressable onPress={() => {
                                if (addItems == 1) {
                                    dispatch(removeFromCart(item));
                                    setAddItems(0);
                                    setSelected(false);
                                    return;
                                }
                                setAddItems((c) => c - 1);
                                dispatch(decrementQuantity(item));
                            }}>
                                <Text style={{ fontSize: 25, color: "white", paddingHorizontal: 6, }}>
                                    -
                                </Text>

                            </Pressable>

                            {/* Item's quantity in cart */}
                            <Pressable>
                                <Text style={{ color: "white", paddingHorizontal: 6, fontSize: 15, }}>
                                    {addItems}
                                </Text>
                            </Pressable>

                            {/* Increment/Add items in cart */}
                            <Pressable onPress={() => {
                                setAddItems((c) => c + 1);
                                dispatch(incrementQuantity(item));
                            }}>
                                <Text style={{ fontSize: 17, color: "white", paddingHorizontal: 6, }}>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                    ) : (
                        // If cart empty, 'ADD' option for new item addition 
                        <Pressable
                            onPress={() => {
                                setSelected(true);
                                if (addItems == 0) {
                                    setAddItems((c) => c + 1);
                                }
                                dispatch(addToCart(item));
                            }}
                            style={{ position: "absolute", top: 95, left: 20, borderColor: "#E32636", borderWidth: 1, flexDirection: "row", paddingHorizontal: 25, paddingVertical: 5, alignItems: "center", backgroundColor: "white", borderRadius: 5, }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "#fd5c63" }}>
                                ADD
                            </Text>
                        </Pressable>
                    )}
                </Pressable>
            </Pressable>
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({})