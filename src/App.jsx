import { useState } from "react";
import Navbar from "./components/Navbar";
import React, { Component } from "react";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  // apiKey = process.env.REACT_APP_NEWS_API;
  apiKey = import.meta.env.VITE_NEWS_API

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={<News  setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" category={"general"} pageSize={6} />}
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News  setProgress = {this.setProgress} apiKey = {this.apiKey}
                  key="entertainment"
                  pageSize={6}
                  category={"entertainment"}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={<News  setProgress = {this.setProgress} apiKey = {this.apiKey} key="sports" pageSize={6} category={"sports"} />}
            />
            <Route
              exact
              path="/health"
              element={<News  setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" pageSize={6} category={"health"} />}
            />
            <Route
              exact
              path="/science"
              element={<News  setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" pageSize={6} category={"science"} />}
            />
            <Route
              exact
              path="/technology"
              element={
                <News  setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" pageSize={6} category={"technology"} />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News  setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" pageSize={6} category={"business"} />
              }
            />
          </Routes>
        </>
      </BrowserRouter>
    );
  }
}
