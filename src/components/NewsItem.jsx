import React from "react";

export default function NewsItem(props) {
  let {
    title,
    description,
    imageUrl,
    source,
    newsUrl,
    newsTime,
    allternative,
  } = props;
  return (
    <div className="card hoverEffect cardSize" style={{ width: "18rem" }}>
      <span
        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
        style={{ zIndex: "1", right: "-5%" }}
      >
        {props.source}
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
          {props.newsTime > 1
            ? `${props.newsTime} hour${
                props.newsTime <= 1 ? "" : "s"
              } ago`
            : `Less than an hour`}
        </p>
        <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
          Read More
        </a>
      </div>
    </div>
  );
}
