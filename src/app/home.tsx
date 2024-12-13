import React, { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";

import { Categories, CategoriesProps } from "@/components/categories";
import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";

import { api } from "@/services/api";

import { colors, fontFamily } from "@/styles/theme";

interface MarketsProps extends PlaceProps {
  latitude: number;
  longitude: number;
}

interface LocationProps {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);
  const [location, setLocation] = useState<LocationProps | undefined>();

  const fetchCategory = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (err) {
      console.log(err);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  };

  const fetchMarkets = async () => {
    try {
      if (!category) {
        return;
      }

      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (err) {
      console.log(err);
      Alert.alert("Locais", "Não foi possível carregar os locais");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            identifier="current"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            image={require("@/assets/location.png")}
          />

          {markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.gray[600],
                      fontFamily: fontFamily.medium,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.gray[600],
                      fontFamily: fontFamily.regular,
                    }}
                  >
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <Places data={markets} />
    </View>
  );
}
