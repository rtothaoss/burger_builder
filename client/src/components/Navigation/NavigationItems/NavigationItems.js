import React from 'react'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
)

export default NavigationItems