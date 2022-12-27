import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    // Stripe wants the price value in cent.
    const priceForPrice = price * 100;
    const publishableKey = 'pk_test_51KT1r6CPBcp6HGsQK8UdfpCgMeQlWkQBVGW5SulHylNwzG8FCadkaIoFkvl7QkpZ0XUKB0mBWWN7Im7PnSTzWhrg00BzGjugkl';

    const onToken = (token) => {
        console.log(token)
        alert('Payment Successful')
    }
    
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForPrice}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;