import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';
import Spinner2 from '../../../components/Spinner/Spinner2';

class FullPost extends Component {
    state = {
        loadedPost: null,
        mounted: false
    }

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        console.log(this.props);
        this.mounted = true;
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                axios.get('https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts/'
                    + this.props.match.params.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data, isLoading: false });
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id && !this.mounted) {
            post = <Spinner2 style={{ textAlign: 'center' }}>Loading... </Spinner2>;
        }


        if (this.state.loadedPost)
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button
                            onClick={this.deletePostHandler}
                            className="Delete">Delete</button>
                    </div>
                </div>

            );

        return post;
    }
}

export default FullPost;
