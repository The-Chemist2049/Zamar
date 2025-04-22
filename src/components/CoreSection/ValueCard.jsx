import { useState } from "react";
import { Flex, Title } from "@mantine/core";
import { BiSolidBinoculars } from "react-icons/bi";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import DOMPurify from "dompurify";
import "./ValueCard.css";

export default function ValueCard({ value }) {
  const { title, description } = value;

  const Icon = title.toLowerCase().includes("vision")
    ? BiSolidBinoculars
    : title.toLowerCase().includes("mis")
    ? TbTargetArrow
    : FaHandHoldingHeart;

  const [hover, setHover] = useState(false);
  const display = DOMPurify.sanitize(description);

  return (
    <Flex
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="value-card"
    >
      <div className="icon-container">
        <div className={`icon-background ${hover ? "accent" : "primary"}`} />
        <Icon size={"4vmax"} className="icon-foreground" />
      </div>
      <div className="text-content">
        <Title order={4}>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: display }}></div>
      </div>
    </Flex>
  );
}
