import { Button, Image, Text, Title } from "@mantine/core";
import "./ErrorScreen.css";

export default function ErrorScreen({ error, reset }) {
  return (
    <div className="error-screen-container">
      <div className="error-screen-content">
        <Image
          src="/logo.svg"
          className="error-logo"
          alt="Zamar company logo"
        />
        <Title>Oops something broke</Title>
        <Text>Sorry something went wrong!</Text>
        <Button onClick={reset} variant="light">
          Retry
        </Button>
      </div>
    </div>
  );
}
