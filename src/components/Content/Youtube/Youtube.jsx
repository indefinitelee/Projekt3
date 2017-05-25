import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from '../../App.css';


class Youtube extends Component {

showvideo(props) {
  let videoSrc = `https://www.youtube.com/embed/${this.props.videoID}?autoplay=0&rel=&modestbranding=1`
  return(
    <iframe
    className="player"
    allowFullScreen="allowfullscreen"
    type="text/html"
    width="50%"
    height="500px"
    src={videoSrc}
    frameBorder="0"
    />
  )
}

render() {
  return(
  <div id="video-container">
    {this.showvideo()}
  </div>
    )
  }
}

export default Youtube;
