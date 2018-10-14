// create a new 

import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDx27k_FEvi6jBunAZycInz_XNs7TPJONY';

class App extends Component {
    constructor(props) {

        super(props);
        this.state = { videos: [], selectedVideo: null };
        this.videoSearch('React JS ASp.net');



    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        })
    }
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 400);

        return (
            <div>
                <SearchBar onSearchChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList videos={this.state.videos} onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));