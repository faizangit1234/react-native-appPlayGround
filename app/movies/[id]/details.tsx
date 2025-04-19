import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { OMDB_CONFIG } from "@/services/api";
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&i=${id}&plot=full`);
        const data = await res.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          console.log("Error:", data.Error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" className="mt-10" color="#EAB308" />;
  if (!movie) return <Text className="text-white p-5">Movie not found.</Text>;

  return (
    <ScrollView className="bg-black flex-1 px-4 pt-10">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="mb-5 flex-row items-center">
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text className="text-white text-base ml-2">Back</Text>
      </TouchableOpacity>

      {/* Poster & Title */}
      <Image
        source={{ uri: movie.Poster }}
        className="w-full h-96 mb-6 rounded-3xl"
        resizeMode="cover"
      />
      <Text className="text-white text-3xl font-extrabold tracking-tight mb-1">{movie.Title}</Text>
      <Text className="text-zinc-400 text-base italic mb-4">{movie.Released} | {movie.Runtime}</Text>

      {/* Badges */}
      <View className="flex-row flex-wrap gap-2 mb-5">
        {movie.Genre.split(', ').map((g: string, i: number) => (
          <Text key={i} className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded-full">
            {g}
          </Text>
        ))}
      </View>

      {/* Info */}
      <View className="gap-y-2 mb-6">
        <View className="flex-row items-center gap-x-2">
          <AntDesign name="star" size={18} color="#FFD700" />
          <Text className="text-white text-base">IMDb {movie.imdbRating} / 10</Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <MaterialCommunityIcons name="movie-open-outline" size={18} color="#ccc" />
          <Text className="text-white text-base">{movie.Director}</Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <Ionicons name="people-outline" size={18} color="#ccc" />
          <Text className="text-white text-base">{movie.Actors}</Text>
        </View>
      </View>

      {/* Plot */}
      <View className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 mb-10">
        <Text className="text-white font-bold text-lg mb-2">Plot</Text>
        <Text className="text-zinc-300 leading-relaxed">{movie.Plot}</Text>
      </View>
    </ScrollView>
  );
}
