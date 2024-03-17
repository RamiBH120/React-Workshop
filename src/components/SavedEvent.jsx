import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { deleteEventFromWishlist } from "../service/api";
import {
  deleteWishlistReducer,
  increment,
  decrement,
} from "../redux/slices/wishlistSlice";

const SavedEvent = ({ event }) => {
  const dispatch = useDispatch();

  const deleteEvent = async () => {
    const resp = await deleteEventFromWishlist(event.id);
    dispatch(deleteWishlistReducer(event.id));

    if (resp.status === 200) alert("event deleted successfully");
  };

  const [numberOfWishes, setNumberOfWishes] = useState(event.nbParticipants);

  const setNbTickets = (e) => {
    //setNumberOfWishes(numberOfWishes + 1);
    console.log(e.target.name + "" + e.target.value);
  };

  const decrementVal = () => {
    setNumberOfWishes(numberOfWishes - 1);
    dispatch(decrement(event));
  };

  const incrementVal = () => {
    dispatch(increment(event));
    setNumberOfWishes(numberOfWishes + 1);
  };
  return (
    <Card className="text-center">
      <Card.Body>
        <Row>
          <Col md="3">
            <Card.Img
              src={`images/${event.nbTickets ? event.img : "sold_out.png"}`}
              style={{ width: "50%" }}
            />
          </Col>
          <Col md="3">
            <Card.Title>Event name: {event.name}</Card.Title>
            <Card.Text>Event price: {event.price} DT</Card.Text>
          </Col>

          <Col md="3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>number of Participants</Form.Label>
                <InputGroup className="mb-2">
                  <Button
                    className={numberOfWishes < 2 ? "disabled" : ""}
                    onClick={decrementVal}
                  >
                    -
                  </Button>
                  <Form.Control
                    name="nbParticipants"
                    value={numberOfWishes}
                    type="number"
                    onChange={(e) => setNbTickets(e)}
                  />

                  <Button onClick={incrementVal}>+</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Card.Text>
              Total price: {event.price * numberOfWishes} DT
            </Card.Text>
          </Col>
          <Col md="1">
            <Button variant="danger" onClick={deleteEvent}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SavedEvent;
