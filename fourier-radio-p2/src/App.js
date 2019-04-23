import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import YTSearch from 'youtube-api-search';
import AudioAnalyzer from './components/AudioAnalyzer'

import {Icon} from 'antd';

const key = process.env.REACT_APP_YOUTUBE_API_KEY

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        videos: [],
        search: true,
        selectedVideo: {},
        audio: null
      };
      this.toggleMicrophone = this.toggleMicrophone.bind(this);
}

async getMicrophone() {
  const audio = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
  this.setState({ audio });
}

stopMicrophone() {
  this.state.audio.getTracks().forEach(track => track.stop());
  this.setState({audio: null});
}

toggleMicrophone() {
  if (this.state.audio) {
    this.stopMicrophone();
  } else {
    this.getMicrophone();
  }
}


  videoSearch(term) {
      if( this.state.search ) {
           YTSearch({ key: key, term }, (data) => {
               try {
                   console.log(data);
                   this.setState({ videos: data, selectedVideo: data[0] });
                   console.log( this.state.videos );
               } catch( err ){
                   alert('error')({
                       message: "Daily Limit Exceeded",
                       description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
                   })
               }
           });
       }
}

handleChange = (value) => {
  setTimeout( () => {
    if( value === ''){
      this.setState({ videos: [], selectedVideo: {} });
      return;
    }
    if( this.state.search && value.length > 5) {
      this.videoSearch( value );
    }
    setTimeout( () => {
      this.setState({ search: true });
    }, 3000);
  }, 1500);
};

render() {
  return (
    <div>
      <div>
        <h1>Fourier Radio <Icon type={"youtube"}/></h1>
          <SearchBar
               videos={ this.state.videos }
               video={ this.state.selectedVideo }
               onChange={ this.handleChange }
               handleSearch={ (video) => { this.setState({
                 selectedVideo: this.state.videos[video], search: false
                 })}
               }
          />
      </div>
      <div className="VideoDetail">
        <VideoDetail video={ this.state.selectedVideo }/>
      </div>
      <div className="App">
          <div className="controls">
            <button onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </button>
          </div>
          {this.state.audio ? <AudioAnalyzer audio={this.state.audio} /> : ''}
      </div>
    </div>
  )
}
}

export default App
