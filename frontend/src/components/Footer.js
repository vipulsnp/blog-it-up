import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class Footer extends Component {

  render(){
  return(
    <AppBar
      style={{
        position: "sticky",
        top: "auto",
        bottom: "0",
        background: "linear-gradient(100deg,rgb(108, 53, 84) 40%, rgb(225, 179, 119) 96%)",
        alignItems:'center'
      }}
    >
      <Toolbar>
        <Typography className="title" variant="h6" noWrap align='center'>
          Developed By
          <a href='https://portfolio-vipul.herokuapp.com' target='_blank' rel="noreferrer noopener"
            style={{ textDecoration:"none"}}>
            <strong> Vipul Sharma </strong>
          </a>
        </Typography>
        </Toolbar>
      </AppBar>
  )
  }
}