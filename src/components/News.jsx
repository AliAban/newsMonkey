import React, {useEffect, useLayoutEffect, useState} from "react";
import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types'
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props){

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )}-NewsMonkey`;
  

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTimeDiff = (timeOfNews) => {
    const timeOfPublishingNews = new Date(timeOfNews);
    const timeNow = new Date();
    let differenceInTime = Math.abs(
      timeNow.getHours() - timeOfPublishingNews.getHours()
    );
    return differenceInTime;
  };

const fetchMoreData = async () => {
  
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${page+1}&pageSize=${props.pageSize}`;
  
  setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalArticles(parsedData.totalArticles);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(25);
    let parsedData = await data.json();
    props.setProgress(30);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalArticles);
    setLoading(false);
    props.setProgress(100);
  };

  // changed componentdidMount to useEffect
  useEffect(() => {
    updateNews();
  }, [])
  

  

    return (
      <div className="my-4 container d-flex flex-column likeACard py-2">
        <a
          href="#"
          style={{
            position: "fixed",
            top: "70%",
            right: "5rem",
            color: "white",
            borderRadius: "50%",
            padding: "5px",
          }}
          className="border border-warning  bg-dark "
        >
          &#8593;
        </a>
        <h2 className="text-center">
          NewsMonkey -{" "}
          {props.category == "general"
            ? "Top"
            : props.category[0].toUpperCase() +
              props.category.slice(1)}{" "}
          Headlines{" "}
        </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          // loader={<Spinner/>}
        >
          <div className="container">
          <div className="row my-3 d-flex justify-content-center">
            {articles.map((element) => {
              return (
                <div
                  className="col-md-4 my-2 d-flex justify-content-center"
                  key={element.url}
                >
                  <NewsItem
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://media.istockphoto.com/id/1181778359/vector/breaking-news-vector-background.jpg?s=612x612&w=0&k=20&c=jPg0fAK-Itq51pmv_sRp7UspRhQNY-H_3h8OSB85KgE="
                    }
                    source={element.source.name}
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 50)
                        : ""
                    }
                    newsUrl={element.url}
                    newsTime={getTimeDiff(element.publishedAt)}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
