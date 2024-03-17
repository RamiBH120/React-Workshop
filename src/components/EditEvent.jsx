import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { editEvent, getallEvents } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEvent,
  selectSelectedEvent,
  updateEventReducer,
} from "../redux/slices/eventsSlice";

function EditEvent() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedEvent } = useSelector(selectSelectedEvent);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async (eventId) => {
      const eventResult = await getallEvents(eventId);
      console.log(eventResult.data);
      //setEventItem(eventResult.data);
      dispatch(selectEvent(eventResult.data));
    };

    fetchEvent(id);
  }, [id]);

  const onValueChange = (e) => {
    dispatch(
      selectEvent({ ...selectedEvent, [e.target.name]: e.target.value })
    );
  };

  const onFile = (e) => {
    dispatch(
      selectEvent({ ...selectedEvent, [e.target.name]: e.target.files[0].name })
    );
  };

  const EditEvent = async (id) => {
    const eventResult = await editEvent(id, selectedEvent);
    dispatch(updateEventReducer(eventResult.data));
    if (eventResult.status == 200) {
      navigate("/events");
    }
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <h2>Edit Event </h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            name="name"
            value={selectedEvent.name}
            type="text"
            placeholder="Enter a Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            value={selectedEvent.description}
            as="textarea"
            rows={3}
            placeholder="Enter description "
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            value={selectedEvent.price}
            type="number"
            name="price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            value={selectedEvent.nbTickets}
            type="number"
            name="nbTickets"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="img" onChange={(e) => onFile(e)} />
        </Form.Group>
        <Button
          variant="success"
          onClick={() => {
            EditEvent(id);
          }}
        >
          Update Event
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            navigate("/events");
          }}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default EditEvent;
