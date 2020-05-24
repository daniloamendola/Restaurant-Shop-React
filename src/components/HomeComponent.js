import React, { Component } from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform } from 'react-animation-components'

function RenderCard({item, isLoading, errMess}){
    if(isLoading){
        return(
        <Loading />
        )
    }
    else if(errMess){
        return(
        <h4>{errMess}</h4>
        )
    }else {
        if(item!=null)
        return(
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
        else return(<div></div>)
    }
}

class Home extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="container">
                <div className="row align-item-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={this.props.dish} 
                            isLoading={this.props.dishLoading} 
                            errMess={this.props.dishErrMess}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={this.props.promotion} 
                            isLoading={this.props.promoLoading} 
                            errMess={this.props.promoErrMess}
                            />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={this.props.leader}
                            isLoading={this.props.leaderLoading} 
                            errMess={this.props.leaderErrMess} 
                            />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;