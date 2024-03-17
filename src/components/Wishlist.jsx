import { useSelector } from "react-redux";
import { selectTotal, selectWishlist } from "../redux/slices/wishlistSlice";
import { Alert, Container, Row } from "react-bootstrap";
import SavedEvent from "./SavedEvent";

const Wishlist = () => {
  const [wishlist] = useSelector(selectWishlist);

  const tot = useSelector(selectTotal);

  return (
    <Container>
      <h1 className=" text-center " style={{ marginBottom: 50 }}>
        Wishlist
      </h1>
      <Row>
        {wishlist.map((event, index) => (
          <SavedEvent key={index} event={event} />
        ))}
      </Row>
      <hr />
      <Alert style={{ marginBottom: 40 }} variant="primary">
        Total : {tot} DT
      </Alert>
    </Container>
  );
};
export default Wishlist;
