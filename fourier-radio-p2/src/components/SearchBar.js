import React, { Component } from 'react';
import  { AutoComplete, Button, Icon } from 'antd';
const Option = AutoComplete.Option;


//lookup react forms
class SearchBar extends Component {

      state = {
        videos: []
      }

  componentDidUpdate( prevProps ) {
    if( this.props.video && prevProps.video !== this.props.video ) {
        this.setState({ videos: this.props.videos })
    }
  }

  onSelect = (value, index ) => {
      let val = parseInt(index.key, 10);
      this.props.handleSearch( val );
  };

render() {
    return (
      <div className="Header" onSubmit={this.handleSubmit}>
        <AutoComplete
            onSelect={ this.onSelect }
            onChange={ this.props.onChange }
            placeholder="Search Video"
            >
            { this.state.videos.map((video, index)  => <Option key={ index } >{ video.snippet.title }</Option> ) }
        </AutoComplete>
          <Button><Icon type={"search"}/></Button>
      </div>
    );
  }
}


export default SearchBar
