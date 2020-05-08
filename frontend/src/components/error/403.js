import React ,{Component} from 'react'
import WarningIcon from '@material-ui/icons/Warning';
import BlockIcon from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';
import './error.css'

export default class Forbidden extends Component{

    render(){

        return(
            <div className="errors">
            <div id="error-icon">
                    <BlockIcon fontSize="inherit" />      
            </div>
            <div className="error-text">
                    Error 403 : Access Forbidden
            </div>
                <Button variant="contained" color="primary" href="/"> Return Home </Button>
            </div>

        )
    }
}