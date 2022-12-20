import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl,source, newsUrl, newsTime, allternative } =
      this.props;
    return (
      <div className="card hoverEffect cardSize" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex : "1", right:"-5%"}}>
          {this.props.source}
        </span>
        <img
          src={imageUrl}
          className="card-img-top imageSize"
          alt={allternative ? allternative : "this is a news image"}
        />
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">{description}. . .</p>
          <p style={{ color: "grey" }}>
            {this.props.newsTime} hour{this.props.newsTime <= 1 ? "" : "s"} ago
          </p>
          <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
