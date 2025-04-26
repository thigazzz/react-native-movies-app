import {
    Text,
    View,
    Image,
    ActivityIndicator,
    FlatList,
    ScrollView,
  } from "react-native";
  
  import { icons } from "@/constants/icons";
  import { images } from "@/constants/images";
  import SearchBar from "@/components/SearchBar";
  import { useRouter } from "expo-router";
  import useFetch from "@/services/useFetch";
  import fetchMovies from "@/services/api";
  import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    refetch: loadMovies,
    reset,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
        if (searchQuery.trim()) {
            await loadMovies()
        } else {
            reset()
        }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex-1 mt-5">

        <SearchBar
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                placeholder="Search for a movie"
              />
              <View className="w-full flex flex-col items-start">
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Filmes com o Termo<Text className="text-lg text-accent font-bold mt-5 mb-3"> {searchQuery}</Text>
              </Text>
              </View>
          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text className="text-white">Error: {moviesError?.message}</Text>
          ) : (
            <>
              

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                ListEmptyComponent={() => (
                    <Text className="text-white">
                        Filme não encontrado.
                    </Text>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>

    )
}

export default Search