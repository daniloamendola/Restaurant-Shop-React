import React, { Component } from 'react'
import {Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Button, Col, Row, 
    Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Form} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(val);


function RenderComments({comments, postComment, dishId}) {
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
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
            </div>
        )
    else return(<div></div>)
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
        <Card >
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    )
}



class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSubmitCommentOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        console.log("SUBMIT " + JSON.stringify(values))
        this.props.postComment( this.props.dishId, values.rating===null || "1", values.author, values.message );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Button outline color="secondary" onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={ (values)=>this.handleSubmit(values) }>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" 
                                    className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                            <Col>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name" className="form-control" 
                                validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}
                                />
                                <Errors className="text-danger" 
                                model=".author" show="touched"
                                messages={{required: 'Required',
                                minLength: 'Must be greater then 2 characters',
                                maxLength: 'Must be 15 characters or less'}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="message">Comment</Label>
                                <Control.textarea model=".message" id="message" 
                                    name="message"  rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
        )
    }
}


const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null){
        return (
            <React.Fragment>
        <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                </div>

            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} 
                    postComment={props.postComment}
                    dishId={props.dish.id}
                     />
            </div>
            
        </div>
        </React.Fragment>
        );
    }else
    return(
        <div></div>
    );
        
}

export default DishDetail