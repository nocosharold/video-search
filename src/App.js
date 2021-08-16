import React from 'react';

import { Grid, Container } from '@material-ui/core';

import { SearchBar, VideoDetail, VideoList } from './components';

/* 
long method
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
 */

import youtube from './api/youtube';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('trending');
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }

    handleSubmit = async (searchTerm) => {
        
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 3,
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
                q: searchTerm,
            }
    });
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    render () {
        const { selectedVideo, videos } = this.state;
        return(
            <Container>
                <Grid justifyContent="center" container spacing={10}>
                    <Grid item xs={12}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                {/* SEARCH BAR */}
                                <SearchBar onFormSubmit={ this.handleSubmit } />
                            </Grid>
                            <Grid item xs={7}>
                                {/* VIDEO DETAIL */}
                                <VideoDetail video={ selectedVideo }/>
                            </Grid>
                            <Grid item xs={5}>
                                {/* VIDEO LIST */}
                                <VideoList videos={videos} onVideoSelect={ this.onVideoSelect }/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

// const App = () => {
//     return(<h1>Video Search</h1>);
// }

export default App;