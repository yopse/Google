import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(
    () => {
      // getResults("/?query=YouTube&max=20");

      // /search?api_key=634bc8ded81249a450ead3eb

      //cURL "https://api.serpdog.io/search?api_key=APIKEY&q=coffee&gl=us"

      if (searchTerm !== "") {
        if (location.pathname === "/search") {
          getResults(
            `${location.pathname}?api_key=FB737E93E3A849DF8A233833C44C46B2&q=${searchTerm}&num=18&lr=lang_en&hl=en`
          );
        } else {
          let s = location.pathname.slice(1);
          getResults(
            `/search?api_key=FB737E93E3A849DF8A233833C44C46B2&search_type=${s}&q=${searchTerm}&num=18&lr=lang_en&location=United+States`
          );
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, location.pathname]
  );

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
          {results?.image_results?.map(({ image, title, position, link }) => (
            <a
              className="sm:p-3 p-5"
              href={link}
              key={position}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                style={{ width: "200px", height: "200px" }}
              />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.news_results?.map(
            ({ link, title, snippet, source }, index) => (
              <div key={index} className="md:w-2/5 w-full ">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {title}
                  </p>

                  <div className="flex gap-4">
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-blue-300"
                    >
                      {link.substring(0, 20)}
                    </a>
                  </div>
                </a>
              </div>
            )
          )}
        </div>
      );

    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.video_results?.map(({ link }, index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={link} controls width="355px" height="200px" />
            </div>
          ))}
        </div>
      );

    default:
      return "Error...";
  }
};
