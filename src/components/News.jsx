import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types'

export default class News extends Component {
  constructor() {
    super();
    console.log("Im the constructor for news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=3d7b2826da4e4d148d1539a55c49cd7f";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    let nextBtn = document.getElementById("nextBtn");
    if (nextBtn.hasAttribute("disabled")) {
      console.log("found");
      nextBtn.removeAttribute("disabled");
    }
    console.log("prev");
    window.scroll(0, 0);
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async (event) => {
    console.log("next");
    window.scroll(0, 0);

    if (this.state.page + 2 > Math.ceil(this.state.totalArticles / 20)) {
      event.target.setAttribute("disabled", "disabled");
    }
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3d7b2826da4e4d148d1539a55c49cd7f&page=${
      this.state.page + 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };

  render() {
    return (
      <div className="my-4 container d-flex align-items-center flex-column likeACard py-2">
        <h2>NewsMonkey - Top Headlines </h2>

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
                  title={element.title ? element.title : ""}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  newsUrl={element.url}
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
