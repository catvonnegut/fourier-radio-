import React, { Component } from 'react';
import { Icon } from "antd";

//update and render informed by Devyendu Shekhar at https://hackernoon.com/make-your-own-youtube-player-in-react-using-youtube-data-api-v3-4b9bb5403a87

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        video: null,
    };
  }

    componentDidUpdate(prevProps) {
        if( this.props.video && ( prevProps.video !== this.props.video)  ) {
            this.setState({ video: this.props.video })
        }
    }

    render() {
        const video = this.state.video;
        if( !video ) {
            return (
                <div className="VideoFrame">
                    <h1><Icon type={"youtube"}/></h1>
                </div>
            )
        }
        const videoId = video.id.videoId;
        const url = `https://www.youtube.com/embed/${ videoId }`;

        return (
            <div>
                <div className={"embed-responsive embed-responsive-1by1"}>
                    <iframe title={ video.snippet.title } className={"embed-responsive-item"} src={url} allowFullScreen />
                </div>
                <div>
                    <h2>
                        { video.snippet.title }
                    </h2>
                </div>
            </div>
        )
    }
}

export default VideoDetail
