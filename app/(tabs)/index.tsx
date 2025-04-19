import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const router = useRouter()

  const { data: movies,
    loading: moviesLoading,
    error: moviesError } = useFetch(() => fetchMovies({
      query: ''
    }))
  console.log(movies)
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5 " showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto " />


        {moviesLoading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className="mt-10 self-center" />
        )
          :
          moviesError ? (
            <Text>Error:{moviesError?.message}</Text>
          )
            :
            <View className="flex-1 mt-5">
              <SearchBar onPress={() => router.push('/search')}
                placeholder='search for the movies' />

              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies: </Text>
                

                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.imdbID }
                  renderItem={({ item }) => (
                    <View className="mb-4">
                      <Text className="text-white font-semibold">{item.Title}</Text>
                      <Text className="text-gray-400">{item.Year}</Text>
                      <TouchableOpacity onPress={() => router.push(`/movies/${item.imdbID}/details`)}>
                      <Image
                        source={{ uri: item.Poster }}
                        className="w-full h-60 rounded-lg mt-2"
                        resizeMode="cover"
                        />
                        </TouchableOpacity>
                    </View>
                  )}
                  scrollEnabled={false}
                />

              </>
            </View>
        }


      </ScrollView>
    </View>

  );
}
