import { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { StripeCardElement } from "@stripe/stripe-js";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null; 

const PaymentForm = () => {
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessingPayment(true);

		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ amount: amount * 100 })
		}).then(res => res.json());

		const clientSecret = response.paymentIntent.client_secret;

		const cardDetails = elements.getElement(CardElement);

		if (!ifValidCardElement(cardDetails)) return;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardDetails,
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				}
			}
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('Payment Successful');
			}
		}
	}

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>Pay now</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	)
}

export default PaymentForm;