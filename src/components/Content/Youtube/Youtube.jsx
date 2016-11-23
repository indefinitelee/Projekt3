import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Youtube extends Component {

showvideo(props) {
  let videoSrc = `http://www.youtube.com/embed/${this.props.videoID}?autoplay=0&rel=&modestbranding=1`
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
    <div id="video-container" height="500px">
    {this.showvideo()}
  </div>
    )
  }
}

export default Youtube;
