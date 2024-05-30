import React from 'react';
import { Text, Box } from 'native-base';

const SearchResultsScreen = ({ route }) => {
  const { query } = route.params;

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Search Results for: {query}</Text>
      {/* Implement fetching and displaying search results */}
    </Box>
  );
};

export default SearchResultsScreen;