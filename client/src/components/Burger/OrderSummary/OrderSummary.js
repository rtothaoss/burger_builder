import React, { Fragment, Component } from 'react'
import Button from '../../UI/Button/Button'


class OrderSummary extends Component {
    //this could be a functional component instead of class

    render() {
        
    const ingredientSummary = Object.keys(this.props.ingredients)//transforms object into keys
        .map(igKey => {
            return (
            <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}:</span>{this.props.ingredients[igKey]}
            </li> )
        } )
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Fragment>
    )
}
}

export default OrderSummary