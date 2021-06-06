import React from 'react';

import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price})  =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IyZFdSJ1OG8qUnzGMN0BVHWYyWwza03A97V2n5Cmdit5VJb94QocOy5pL96R0zPDix86bWRDmGUUrb8AOqEFr4I00PJFTixG1';


    const onToken = token => {
        console.log(token);
        alert("Your Payment is Successfull")
    }
    return(
        <StripeCheckout 
            label = 'Pay Now'
            name = 'CRWN Clothing Ltd'
            billingAddressshippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token={onToken}
            stripeKey = {publishableKey}

        />
    )

}

export default StripeCheckoutButton;