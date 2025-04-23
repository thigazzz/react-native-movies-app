import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Movies = () => {
    const {id} = useLocalSearchParams()
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

export default Movies