import Container from "react-bootstrap/Container";
import Event from "./Event";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEvents } from "../redux/slices/eventsSlice";
function Events() {
  const [eventsData] = useSelector(selectEvents);

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isWelcome, setIsWelcome] = useState(true);

  useEffect(() => {
    const isWelcomeTimeout = setTimeout(() => {
      setIsWelcome(false);
    }, 3000);

    return () => {
      clearTimeout(isWelcomeTimeout);
    };
  }, []);
  const showAlert = () => {
    setIsShowAlert(true);

    setTimeout(() => setIsShowAlert(false), 2000);
  };

  return (
    <>
      {isWelcome && (
        <Alert style={{ marginBottom: 40 }} variant="success">
          Hey welcome to Esprit Events
        </Alert>
      )}
      <Container>
        <Row>
          {eventsData.map((event, index) => (
            <Event key={index} event={event} showAlert={showAlert} />
          ))}
        </Row>

        {isShowAlert && (
          <Alert variant="success">
            <Alert.Heading>You are booked an event</Alert.Heading>
          </Alert>
        )}
      </Container>
    </>
  );
}

export default Events;
