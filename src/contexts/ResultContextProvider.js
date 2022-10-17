import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

// GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures

// cURL "https://api.serpdog.io/images?api_key=APIKEY&q=football&gl=us"
const baseUrl = "https://api.serpdog.io/";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Apple");

  const getResults = async (url) => {
    setIsLoading(true);

    // const res = await fetch(`${baseUrl}${url}`, {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "b040bf28a1msh547a2b3067bbfeap1d130cjsn71f6cdb19e16",
    //     "X-RapidAPI-Host": "google-search64.p.rapidapi.com",
    //   },
    // });

    const res = await fetch(`${baseUrl}${url}`);
    const data = await res.json();
    console.log(data, "resultsContextProvider");

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
