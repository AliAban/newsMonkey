import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, allternative} = this.props;
    return (
        <div className="card hoverEffect cardSize" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top imageSize" alt={allternative? allternative : "this is a news image"}/>
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p className="card-text">{description}. . .</p>
                 <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">Read More</a>
            </div>
        </div>
      
      
    )
  }
}
