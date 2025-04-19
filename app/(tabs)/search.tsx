// // app/search/index.tsx
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
// import { fetchMovies } from "@/services/api";
// import { useRouter } from "expo-router";

// export default function SearchResults() {
//   const { q } = useLocalSearchParams(); // gets query param from URL
//   const [movies, setMovies] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const getSearchResults = async () => {
//       try {
//         const results = await fetchMovies({ query: q as string });
//         setMovies(results.flat()); // flatten array of arrays (optional)
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (q) getSearchResults();
//   }, [q]);

//   if (loading) return <ActivityIndicator size="large" className="mt-10" />;
//   if (movies.length === 0) return <Text className="text-white p-5">No results found.</Text>;

//   return (
//     <View className="bg-primary flex-1 p-5">
//       <Text className="text-white text-xl font-bold mb-3">Search Results</Text>
//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.imdbID}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => router.push(`/movies/${item.imdbID}/details`)}
//             className="mb-3"
//           >
//             <Text className="text-white text-base">{item.Title}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }


// app/search/index.tsx
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";

export default function SearchResults() {
  const { q } = useLocalSearchParams(); // gets query param from URL
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const results = await fetchMovies({ query: q as string });
        setMovies(results.flat()); // flatten array of arrays (optional)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (q) getSearchResults();
  }, [q]);

  if (loading) return <ActivityIndicator size="large" className="mt-10" />;
  if (movies.length === 0) return <Text className="text-white p-5">No results found.</Text>;

  return (
    <View className="bg-primary flex-1 p-5">
      <Text className="text-white text-xl font-bold mb-3">Search Results</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/movies/${item.imdbID}/details`)}
            className="mb-5 flex-row space-x-4"
          >
            <View className="w-24 h-36 bg-gray-800 rounded-md overflow-hidden">
              {item.Poster !== "N/A" ? (
                <Image
                source={{ uri: item.Poster }}
                style={{ width: 96, height: 144, borderRadius: 8 }}
                resizeMode="cover"
              />
              ) : (
                <View className="w-full h-full items-center justify-center">
                  <Text className="text-white text-xs text-center px-1">No Image</Text>
                </View>
              )}
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-white text-lg font-bold">{item.Title}</Text>
              <Text className="text-gray-300 text-sm mt-1">Year: {item.Year}</Text>
              <Text className="text-gray-400 text-sm mt-1 capitalize">Type: {item.Type}</Text>
            </View>
          </TouchableOpacity>
        )}
        
      />
    </View>
  );
}
