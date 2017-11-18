import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';
import flowerImage from  '../assets/flower.png';

export default class Hello extends Component {
    render() {
        return (
            <div>
                <p>I like flowers!</p>
                <img src={ flowerImage } alt='I like flowers' />
                <p>Do you like?</p>
            </div>
        );    
    }
}

render(<Hello />, document.getElementById('app'));