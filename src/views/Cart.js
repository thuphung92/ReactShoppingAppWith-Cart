import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
const styles={
  wrapper:{
      backgroundColor:'#e9ecef',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
};

export default function Cart(props) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <Container style={{paddingTop:'50px'}}>
      {Object.keys(props.cart).length? (
        <div>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove One</th>
                <th>Remove All</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.cart).map((key) => (
                <tr key={props.cart[key].id}>
                  <td>{props.cart[key].id}</td>
                  <td>
                    <img className='text-center' alt="The Product" style={{ height: "100px", objectFit: "contain" }} src={props.cart[key].image}
                    />
                  </td>
                  <td>{props.cart[key].title}</td>
                  <td>{props.cart[key].description}</td>
                  <td>{props.cart[key].price.toFixed(2)}</td>
                  <td>{props.cart[key].quantity ?? "0"}</td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() => props.removeFromCart(props.cart[key])}
                    >
                      Remove One
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() => props.removeAllFromCart(props.cart[key])}
                    >
                      Remove All
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{props.getCartTotalPrice().toFixed(2)}</td>
                <td>{props.getCartProductTotal()} </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <Button className="float-end">
            Check Out
          </Button>
        </div>
      ) : (
        <div className="wrapper" style={styles.wrapper}>
        <h2>There is nothing in your cart. Let's go back and start shopping!</h2>
        </div>
      )}
    </Container>
  );
}