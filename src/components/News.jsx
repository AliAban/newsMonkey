import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types'
import Spinner from "./Spinner";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  // static propTypes
  constructor() {
    super();
    console.log("Im the constructor for news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  getTimeDiff = (timeOfNews)=>{
    const  timeOfPublishingNews = new Date(timeOfNews);
    const timeNow = new Date();
    let differenceInTime = Math.abs(timeNow.getHours() - timeOfPublishingNews.getHours());
    return differenceInTime;
  }

  updateNews=  async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }  
  async componentDidMount() {
    console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  handlePreviousClick = async () => {
    // console.log("prev");
    window.scroll(0, 0);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async (event) => {
    // console.log("next");
    window.scroll(0, 0);

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    console.log("render")

    return (
      <div className="my-4 container d-flex flex-column likeACard py-2">
        <h2 className="text-center">NewsMonkey - {this.props.category == "general"? "Top" : this.props.category[0].toUpperCase() + this.props.category.slice(1)} Headlines </h2>

        {this.state.loading && <Spinner />}

        <div className="row my-3 d-flex justify-content-center">
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
                    newsUrl={element.url} newsTime={this.getTimeDiff(element.publishedAt)}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between ">
          <button
            type="button"
            disabled={this.state.page <= 1 ? true : false}
            onClick={this.handlePreviousClick}
            className="btn btn-warning"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            id="nextBtn"
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-warning "
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
