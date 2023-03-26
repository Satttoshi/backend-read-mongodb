import useSWR from "swr";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/products/${id}` : null);
  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
      {data.reviews.map((review) => (
        <section key={review._id}>
          <h3>{review.title}</h3>
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
        </section>
      ))}
    </ProductCard>
  );
}
