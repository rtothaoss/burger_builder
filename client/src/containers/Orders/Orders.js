import React, { Component } from 'react'
import axios from '../../axios_orders'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import withErrorHandling from '../../containers/withErrorHandling/withErrorHandling'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {


    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        )


    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios))