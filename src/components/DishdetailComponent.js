import React from 'react'
import {Card, CardImg, CardBody, CardText, CardTitle} from 'reactstrap'
    
function RenderComments({comments}) {
    if(comments!=null)
        return(
            <div className="col-12 col-md-5 m-1">
            <div>
            <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments.map((c)=>{
                    return(<div key={c.id}>
                    <li>
                    <p>{c.comment}</p>
                    <p>--{c.author}, {new Intl.DateTimeFormat(
                                        'it-IT', {year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(c.date)))}</p>
                    </li>
                    </div>)
                    })}
                </ul>
            </div>
            </div>
        )
    else return(<div></div>)
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
        <Card >
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    )
}

const DishDetail = (props) => {
    if (props.dish != null){
        return (
        <div className="container">
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.dish.comments}/>
            </div>
        </div>
        );
    }else
    return(
        <div></div>
    );
        
}

export default DishDetail