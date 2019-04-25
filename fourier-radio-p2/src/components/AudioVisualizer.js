import React, {Component} from 'react';

class AudioVisualizer extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  draw() {
  const {audioData} = this.props;
  const canvas = this.canvas.current;
  const w = canvas.width;
  const h = canvas.height;
  const context = canvas.getContext('2d');
  let x = 0;
  const sliceWidth = (w * 1) /audioData.length;

  context.lineWidth = 3;
  context.strokeStyle = '#000563';
  context.clearRect(0,0,w, h);
  context.arc(100, 75, 50, 0, 2 * Math.PI);

  context.beginPath();
  context.moveTo(0, h / 2);

  for (const item of audioData) {
    const y = (item / 255.0) * h;
    context.lineTo(x,y);
    x += sliceWidth;
    context.lineTo(x, h / 2);
    context.stroke();
  }

  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <canvas width="500" height="500" ref={this.canvas} />
    )
  }
}

export default AudioVisualizer
