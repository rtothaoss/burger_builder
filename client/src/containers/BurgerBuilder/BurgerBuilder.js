import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios_orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandling from '../../containers/withErrorHandling/withErrorHandling'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-593d4.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
       
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />

        if(this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            )
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price} />
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }



        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios))