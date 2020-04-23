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

       const Comments=this.state.comments.flat().map(comment=>{
        return(
            <div>
                <h3>{comment.author} - {comment.description}</h3>
            </div>
        )
       });

        return(
            <div>

                <h3> Comments here :</h3>
                {Comments}
            </div>
        );

    }
}
