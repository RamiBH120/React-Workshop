import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { editEvent, getallEvents } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";

function EditEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [eventItem, setEventItem] = useState({
    name: "",
    description: "",
    img: "",
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false,
  });

  useEffect(() => {
    const fetchEvent = async (eventId) => {
      const eventResult = await getallEvents(eventId);
      console.log(eventResult.data);
      setEventItem(eventResult.data);
    };

    fetchEvent(id);
  }, [id]);

  const onValueChange = (e) => {
    setEventItem({ ...eventItem, [e.target.name]: e.target.value });
  };

  const onFile = (e) => {
    setEventItem({ ...eventItem, [e.target.name]: e.target.files[0].name });
  };

  const EditEvent = async (id) => {
    const eventResult = await editEvent(id, eventItem);
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
            value={eventItem.name}
            type="text"
            placeholder="Enter a Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            value={eventItem.description}
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
            value={eventItem.price}
            type="number"
            name="price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            onChange={(e) => onValueChange(e)}
            value={eventItem.nbTickets}
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
