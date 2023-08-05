import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title,description, imageUrl, newsUrl ,author , date}=this.props;
    return (
      <div className="my-3">
                    <div className="card" style={{width:"18rem"}}>
            <img src={imageUrl?imageUrl:"https://static.toiimg.com/thumb/msid-102347332,width-1070,height-580,imgsize-60854,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {date}</small></p>
                <a rel="noreferrer" href={newsUrl}  target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
       
      </div>
    )
  }
}

export default NewsItem
