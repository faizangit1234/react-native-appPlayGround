// import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { icons } from '@/constants/icons'
// import { useRouter } from 'expo-router';


// interface Props{
//     placeholder:"string";
//     onPress?:()=>void
// }

// const SearchBar = ({placeholder, onPress}: Props) => {
//   const [query, setQuery] = useState('');
//   const router = useRouter();

//   const handleSearch = () => {
//     if (!query.trim()) return;
//     router.push(`/search?q=${encodeURIComponent(query.trim())}`);
//   };
//   return (
//     <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
//         <Image source={icons.search} className='size-5' resizeMode="contain" tintColor='#ab8bff'/>
      
//         <TextInput
//         placeholder={placeholder}
//         value={query}
//         onChangeText={setQuery}
//         onSubmitEditing={handleSearch}
//         className="flex-1 text-black"
//         returnKeyType="search"
//       />
//        <TouchableOpacity onPress={handleSearch}>
//          <Text className="text-blue-500 font-semibold ml-2">Go</Text>
//        </TouchableOpacity>
//     </View>
//   )
// }

// export default SearchBar

// components/SearchBar.tsx
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router';

interface Props {
  placeholder: string; 
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    // Navigate to the search results page
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode="contain" tintColor='#ab8bff'/>
      
      <TextInput
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        className="flex-1 text-black"
        returnKeyType="search"
      />
      
      <TouchableOpacity onPress={handleSearch}>
        <Text className="text-blue-500 font-semibold ml-2">Go</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;
