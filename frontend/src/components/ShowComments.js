import React,{Component} from 'react'

export default class Comments extends Component{

    constructor(props){
        super(props);
        this.state={
            comments:[]
        }
    }

    async componentDidMount()
    {
        await this.props.comments.map(id=>{

            var reqBody={
                id:id
            }
             fetch('/api/get-comment',{

                method:"POST",
                body:JSON.stringify(reqBody),
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },

            }).then(res=>res.json().then(data=>{
                this.setState({
                    comments:[...this.state.comments,data]
                });
            }));
        });

    }

    render(){

       const Comments=this.state.comments.sort(function(a,b) {return a.date.slice(0,10) - b.date.slice(0,10); }).map(comment=>{
        return(
            <div key={comment._id} style={{textAlign:"left",margin:"0.1rem",padding:" 0 1rem",wordBreak:"break-all"}}>
                <p><em>{comment.author}</em> : {comment.description} </p>
                <hr />
            </div>
        )
       });

        return(
            <div style={{ 
                            borderStyle: "solid", 
                            borderWidth: "5px", 
                            borderImageSource:"linear-gradient(45deg, rgb(0,143,104), rgb(250,224,66))",
                            borderImageSlice:"1",
                            overflow:"scroll",
                            overflowX:"hidden",
                            maxHeight:"210px",
                        }}
            >
                {Comments}
            </div>
        );

    }
}
