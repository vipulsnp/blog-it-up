import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import './error.css'
import brokenPage from './broken-page.png'
export default class NotFound extends Component {

    render() {

        return (
            <div className="errors">
                <div id="error-icon">
                    <img src={brokenPage} width="288px" height="288px" />
                </div>
                <div className="error-text">
                    Error 404 : Page Not Found            
                </div>
                <Button variant="contained" color="primary" href="/"> Return Home </Button>
            </div>

        )
    }
}