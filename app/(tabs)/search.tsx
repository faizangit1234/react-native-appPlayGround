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
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
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
            className="mb-3"
          >
            <Text className="text-white text-base">{item.Title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
