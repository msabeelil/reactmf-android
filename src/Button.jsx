// import React from 'react';
// import { useState } from 'react';

// import PropTypes from 'prop-types';

// const Button = ({onCounterChange}) => {
//   const [count, setCount] = useState(0);

//     const handleClick = () => {
//         const newCount = count + 1;
//         setCount(newCount);
//         if(onCounterChange)
//         {
//           onCounterChange(newCount); // Emit event to parent component
//         }
//         console.log('clicked');
//         if (window.Android) {
//           window.Android.postMessage('Hello from React');
//           } else {
//             console.log('Android interface is not available');
//           }

//     };

//     return (
//         <div>
//             <p id="increased_num">Clicked: {count} times</p>
//             <button onClick={handleClick}>+</button>
//         </div>
//     );
// };

// Button.propTypes = {
//   onCounterChange: PropTypes.func.isRequired,
// };

// var count=document.getElementById("increased_num");

// export default Button;

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import ImageSlider from '../ImageSlider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Carousel } from 'nuka-carousel';
import handleClick from "./eventemitter";

const Button = () => {
  const [videos, setVideos] = useState([]);
  const [backColor, setBackColor] = useState("yellow");
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const apiUrl =
        "https://communityapi.infinitylearn.com/video_playlist/get/videos/1/1/6";
      const authToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjIzMTcwNjYsImlhdCI6MTcyMjIzMDY2NiwiREJJZCI6IjIzMDM2NzEiLCJGaXJzdE5hbWUiOiJNYWxsaWsiLCJMYXN0TmFtZSI6IlRvbmRlcHUiLCJ1aWQiOiIiLCJUZW5hbnRJZCI6MSwiVGVuYW50Q29kZSI6ImluZmluaXR5bGVhcm4iLCJSb2xlTmFtZSI6IlN0dWRlbnQsU3VwZXIgQWRtaW4iLCJSb2xlSWQiOiIxLDUiLCJ1YW1faWQiOjIzMDM2NzEsImNybl9pZCI6IkNSTlAzMDBUMDAwMDFKRkpVWlpQIn0.fIQaGZONgQ6p6QedxtL9swQ2pMQc8DuNXug0ig1L9jw";
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            Userid: "2303671",
            "X-Platform": "web",
            "X-Tenant": "infinitylearn",
            "Ot-Tenant": "infinitylearn",
            "X-DeviceId": "127.0.0.1",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        console.log("API Called");
        setVideos(res.data[0].videos); // Assuming the API response has a 'videos' field
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (window.Android) {
      const dataFromAndroid = window.Android.getData();
      console.log(dataFromAndroid);

      setBackColor(dataFromAndroid);
    }

    window.bgcolorChange = (color) => {
      setBackColor(color);
    };

    fetchTrendingVideos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // rows:1,
    // lazyload:true
  };

  // const { data, isLoading, isError } = useQuery({ queryKey: ['videos'], queryFn: fetchTrendingVideos ,refetchInterval: 120000,})

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching data</div>;

  // const handleClick = () => {
  //   console.log('Button clicked, emitting event to Android');
  //   if (window.Android) {
  //     window.Android.postMessage('Hello from React');
  //   } else {
  //     console.log('Android interface is not available');
  //   }
  // };

  return (
    <div style={{ backgroundColor: backColor }}>
      {videos.length > 0 ? (
        <Slider {...settings}>
          {videos.map((video) => (
            <div key={video.id}>
              {/* <p><img src={video.thumbnailURL}>image</img></p> */}
              {/* <h3>{video.title}</h3> */}
              {/* <p>{video.description}</p> */}
              <video width="320" height="240" controls>
                <source src={video.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <button onClick={handleClick}>watch</button>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Button;
