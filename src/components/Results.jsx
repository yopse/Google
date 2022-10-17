import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";
export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    // getResults("/?query=YouTube&max=20");

    // /search?api_key=634bc8ded81249a450ead3eb

    //cURL "https://api.serpdog.io/search?api_key=APIKEY&q=coffee&gl=us"

    if (searchTerm) {
      if (location.pathname === "/images") {
        getResults(
          `images?api_key=634a70afc4ca516f3928fb25&q=${searchTerm}&gl=us&num=26`
        );
      } else if (location.pathname === "/videos") {
        getResults(
          `videos?api_key=634a70afc4ca516f3928fb25&q=${searchTerm}&gl=us&num=26`
        );
      } else if (location.pathname === "/news") {
        getResults(
          `news?api_key=634a70afc4ca516f3928fb25&q=${searchTerm}&gl=us&num=26`
        );
      } else {
        //    "https://api.serpdog.io/search?api_key=APIKEY&q=coffee&gl=us"
        getResults(
          `search?api_key=634a70afc4ca516f3928fb25&q=${searchTerm}&gl=us&num=26`
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }
  // videos // search // images

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.organic_results?.map(({ link, title, snippet }, index) => (
            <div key={index} className="md:w-2/5 w-full ">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {title.length > 30 ? title.substring(0, 30) : title}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p className="text-sm mt-1">{snippet}</p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center ">
          {results?.image_results?.map(({ image, link, title, index }) => (
            <a
              className="sm:p-3 p-5"
              href={link}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return "SEARCH";

    case "/videos":
      return "SEARCH";

    default:
      return "ERROR";
  }
};
