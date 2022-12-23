import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types'
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  // static propTypes
  constructor(props) {
    super(props);
    console.log("Im the constructor for news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsMonkey`;
  }

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  getTimeDiff = (timeOfNews) => {
    const timeOfPublishingNews = new Date(timeOfNews);
    const timeNow = new Date();
    let differenceInTime = Math.abs(
      timeNow.getHours() - timeOfPublishingNews.getHours()
    );
    return differenceInTime;
  };

  fetchMoreData = async () => {
    this.setState({
      page:this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
    });
  };

  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(25);
    let parsedData = await data.json();
    this.props.setProgress(30);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    console.log("cdm");
    this.updateNews();
  }

  // handlePreviousClick = async () => {
  //   // console.log("prev");
  //   window.scroll(0, 0);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;

  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  // handleNextClick = async (event) => {
  //   // console.log("next");
  //   window.scroll(0, 0);

  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;

  //   this.setState({
  //     loading: true,
  //   });

  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  render() {
    console.log("render");

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
          {this.props.category == "general"
            ? "Top"
            : this.props.category[0].toUpperCase() +
              this.props.category.slice(1)}{" "}
          Headlines{" "}
        </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          // loader={<Spinner/>}
        >
          <div className="container">
          <div className="row my-3 d-flex justify-content-center">
            {this.state.articles.map((element) => {
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
                    newsTime={this.getTimeDiff(element.publishedAt)}
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
}
