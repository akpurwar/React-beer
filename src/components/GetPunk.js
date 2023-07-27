import React, { useEffect, useState } from "react";

import axios from "axios";

import "../App.css";

import SearchBar from "./SearchBar";

import Pagination from "./Pagination";
import Header  from "./Header";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constant";


function GetPunk() {
   const [punkData, setPunkData] = useState([]);

   const [favorite ,setFavorite] = useState([])

   const [action , setaction] = useState(false)

  const [curr_page, setCurr] = useState(1);

  const [prev_page, setPrev] = useState(0);

  const [next_page, setNext] = useState(0);

  const navigate = useNavigate()

  const updateBeer = async () => {
    const page_step = 10;

    await axios
      .get(
        `${baseUrl}page=${curr_page}&per_page=${page_step}`
      )

      .then((res) => {
        setPunkData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    navigate("/home");
    updateBeer()

  }, []);

  const nextPage = async () => {
    await updateBeer();

    setCurr(curr_page + 1);

    setPrev(curr_page);
  };

  const prevPage = () => {
    if (curr_page > 1) {
      updateBeer();

      setCurr(curr_page - 1);

      setPrev(curr_page);
    }
  };

  const handleFavourite = (item) => {
      if (!favorite.includes(item)) setFavorite(favorite.concat(item));
    };
  
    const RemoveFavourite = (id) => {
      const updatedElements = favorite.filter((element) => element.id !== id);
      setFavorite(updatedElements)
    };

  return (
    <div className="container">
     <Header setaction={setaction}/>
      <div className="search" style={{visibility :action ?  "hidden" : ""}}>
       <SearchBar setPunkData={setPunkData} />
      </div>

      
      <div className="card-container">
      {punkData && (
        <div className=  "card-grid" >
          {(action ? favorite : punkData).map((item) => (
            <div key={item.id} className="card">
              <div className="left">
                <img
                  src={item.image_url}
                  style={{ width: "50px", height: "100px" }}
                  alt="Not found"
                  key={item.id}
                />
              </div>

              <div className="right">
                <i
                  class="fa fa-star-o"
                  style={{ float: "right" }}
                  onClick={() => { !action ? handleFavourite(item): RemoveFavourite(item.id)
                  }}
                ></i>

                <b>{item.name}</b>

                <span>
                  <br />{" "}
                  {item.description.length > 30
                    ? `${item.description.substring(0, 30)}...`
                    : item.description}
                </span>
              </div>
            </div>
          ))}
       
        </div>
          
      )}
   </div>
      {<div className="pagination" style={{visibility :action ?  "hidden" : ""}}>
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          curr_page={curr_page}
        />
      </div>}
    </div>
  );
}

export default GetPunk;
