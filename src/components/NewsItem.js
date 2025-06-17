import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date} = this.props
    return (
        <div>
            <div className="card">
                <img src= {imageUrl} className="card-img-top" style={{height: "200px"}} alt="..." />
                <div className="card-body" >
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">Author: {author?author:"Unknown"}</small></p>
                    <p className="card-text"><small className="text-muted">Published on: {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More {">>"}</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem