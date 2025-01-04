// src/components/StyledVideoDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const videoIds = ['byG2OK5FA2Y', '0HdrBQdV6Vo', 'ugvMssnfS6s']; // Replace with your actual video IDs

const App = () => {
   const [videos, setVideos] = useState([]);

   useEffect(() => {
      const fetchVideoDetails = async () => {
         const responses = await Promise.all(
            videoIds.map((videoId) =>
               axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyA3-RcT_ad3iVSWxJDZRP5OBMHQl36UOnA&part=snippet`)
            )
         );

         const videoData = responses.map((response) => response.data.items[0].snippet);
         setVideos(videoData);
      };

      fetchVideoDetails();
   }, []);

   const truncateDescription = (description, maxLength) => {
      if (description.length <= maxLength) return description;
      return description.substring(0, maxLength) + '...';
   };

   return (
      <div className="my-12">
         <div className="container">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
               {videos.map((video, index) => (
                  <div
                     data-aos="fade-up"
                     data-aos-delay={index * 200}
                     key={video.title}
                     className="bg-white dark:bg-gray-900"
                  >
                     <div className="overflow-hidden rounded-2xl mb-2">
                        <a href={`https://www.youtube.com/watch?v=${videoIds[index]}`}>
                           <img
                              src={video.thumbnails.high.url}
                              alt={video.title}
                              className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                           />
                        </a>
                     </div>
                     <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                           {new Date(video.publishedAt).toLocaleDateString()} by {video.channelTitle}
                        </p>
                        <p className="font-bold line-clamp-1">{video.title}</p>
                        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                           {truncateDescription(video.description, 100)}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default App;