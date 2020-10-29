// import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../theme";
import "./checkoutstyle.css";

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

// const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

const mapStateToProps = (state) => ({
  shoppingCart: state.getIn(["app", "shoppingCart"]),
  profile: state.getIn(["app", "profile"]),
});

export default connect(
  mapStateToProps,
  null
)(function Checkout(props) {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.profile.toJS().username,
          items: props.shoppingCart.toJS().map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {},
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const shoppingCart = props.shoppingCart.toJS();
      if (shoppingCart.length > 0 && shoppingCart[0].desc == "SSA Event") {
        payload.paymentIntent.shoppingCart = shoppingCart;
        axios.put("./api/event/event_signup", payload.paymentIntent);
      } else {
        axios.put("./api/user/membership_update", payload.paymentIntent);
      }
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Review />
        </Paper>
      </main>

      <body class="stripe-form">
        <form id="payment-form" onSubmit={handleSubmit} class="stripe-form">
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
            className="stripe-form"
          />
          <button
            class="stripe-form"
            disabled={processing || disabled || succeeded}
            id="submit"
          >
            <span id="button-text" class="stripe-form">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        </form>
      </body>
    </React.Fragment>
  );

  // return (
  //   <React.Fragment>
  //     <main className={classes.layout}>
  //       <Paper className={classes.paper}>
  //         <Typography component="h1" variant="h4" align="center">
  //           Checkout
  //         </Typography>
  //         <ThemeProvider theme={theme}>
  //         <Stepper activeStep={activeStep} className={classes.stepper}>
  //           {steps.map((label) => (
  //             <Step key={label}>
  //               <StepLabel>{label}</StepLabel>
  //             </Step>
  //           ))}
  //         </Stepper>
  //         </ThemeProvider>
  //         <React.Fragment>
  //           {activeStep === steps.length ? (
  //             <React.Fragment>
  //               <Typography variant="h5" gutterBottom>
  //                 Thank you for your order.
  //               </Typography>
  //               <Typography variant="subtitle1">
  //                 Your order number is #2001539. We have emailed your order confirmation, and will
  //                 send you an update when your order has shipped.
  //               </Typography>
  //             </React.Fragment>
  //           ) : (
  //             <React.Fragment>
  //               {getStepContent(activeStep)}
  //               <div className={classes.buttons}>
  //                 {activeStep !== 0 && (
  //                   <Button onClick={handleBack} className={classes.button}>
  //                     Back
  //                   </Button>
  //                 )}
  //                 <Button
  //                   variant="outlined"
  //                   onClick={handleNext}
  //                   className={classes.button}
  //                 >
  //                   {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
  //                 </Button>
  //               </div>
  //             </React.Fragment>
  //           )}
  //         </React.Fragment>
  //       </Paper>
  //     </main>
  //   </React.Fragment>
  // );
});
