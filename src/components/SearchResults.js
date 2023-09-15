import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function SearchResults() {
  const { q } = useParams(); // Get the search query from the URL parameter
  console.log('Search query:', q);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (q) {
          const storiesRef = collection(db, 'stories'); // Replace with your Firestore collection name

          // Create a query based on the search query
          const qRef = query(storiesRef, where('title', '>=', q));

          const querySnapshot = await getDocs(qRef);

          const results = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push(data);
          });

          setSearchResults(results);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <div>
      <h2>Search Results for "{q}"</h2>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <p>Title: {result.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
