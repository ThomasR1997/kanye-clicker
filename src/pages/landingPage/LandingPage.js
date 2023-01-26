import { useEffect, useState } from "react";
import {
  BackgroundDiv,
  BuyButton,
  ContainerDiv,
  FlexDiv,
  ImageDiv,
  ProductDiv,
  QuoteDiv,
  ShopDiv,
  StyledQuote,
} from "../../components/StyledComponents";

// Images
import kanye1 from "./landingPageImages/kanye1.jpg";
import kanye2 from "./landingPageImages/kanye2.jpg";
import kanye3 from "./landingPageImages/kanye3.jpg";
import kanye4 from "./landingPageImages/kanye4.jpg";
import kanye5 from "./landingPageImages/kanye5.jpg";
import kanye6 from "./landingPageImages/kanye6.jpg";
import kanye7 from "./landingPageImages/kanye7.jpg";
import kanye8 from "./landingPageImages/kanye8.jpg";
import kanye9 from "./landingPageImages/kanye9.jpg";
import kanye10 from "./landingPageImages/kanye10.jpg";
import kanye11 from "./landingPageImages/kanye11.jpg";
import kanye12 from "./landingPageImages/kanye12.jpg";
import kanye13 from "./landingPageImages/kanye13.jpg";
import kanye14 from "./landingPageImages/kanye14.jpg";
import kanye15 from "./landingPageImages/kanye15.jpg";
import kanye16 from "./landingPageImages/kanye16.jpg";
import kanye17 from "./landingPageImages/kanye17.jpg";

export const LandingPage = () => {
  // State for health
  const [health, setHealth] = useState(10);

  // State used to track how many Kanye's defeated
  const [kanyesDefeated, setKanyesDefeated] = useState(0);

  // State for Image
  const [randomKanye, setRandomKanye] = useState();

  // State for api quotes
  const [quote, setQuote] = useState([]);

  const [coins, setCoins] = useState(0);
  const [clickDamage, setClickDamage] = useState(1);

  // fetch api data
  const fetchData = async () => {
    const response = await fetch("https://api.kanye.rest");

    const data = await response.json();

    setQuote(data);
  };

  useEffect(() => {
    fetchData(setQuote);
  }, []);

  // Array with image paths
  const kanyes = [
    kanye1,
    kanye2,
    kanye3,
    kanye4,
    kanye5,
    kanye6,
    kanye7,
    kanye8,
    kanye9,
    kanye10,
    kanye11,
    kanye12,
    kanye13,
    kanye14,
    kanye15,
    kanye16,
    kanye17,
  ];

  // Get random image from image array
  const getRandomKanye = () => {
    const randomNumber = Math.floor(Math.random() * kanyes.length);

    const selectedKanye = kanyes[randomNumber];

    setRandomKanye(selectedKanye);
  };

  // Get random image on page load
  if (!randomKanye) {
    getRandomKanye();
  }

  const clickHandler = () => {
    if (health > 0) {
      setHealth((prev) => prev - clickDamage);
    } else if (health <= 0) {
      setKanyesDefeated((prev) => prev + 1);
      setCoins((prev) => prev + 1);
      fetchData();
      getRandomKanye();
      setHealth(10);
    }
  };

  const damage1 = () => {
    if (coins >= 10) {
      setClickDamage((prev) => prev + 1);
      setCoins((prev) => prev - 10);
      window.alert("Upgrade bought");
    } else {
      window.alert("Not enough KanyeBucks");
    }
  };

  return (
    <BackgroundDiv>
      <p>Kanye Clicker</p>
      <p>Kanye's defeated {kanyesDefeated}</p>

      <FlexDiv>
        <ContainerDiv>
          <p>Shop</p>
          <p>KanyeBucks: {coins}</p>
          <ProductDiv>
            <p>+1 Click damage</p>
            <BuyButton onClick={() => damage1()}>10 KanyeBucks</BuyButton>
          </ProductDiv>
        </ContainerDiv>

        <div>
          <p>Health {health}/10</p>
          <ImageDiv>
            <img src={randomKanye} alt="Ye" onClick={() => clickHandler()} />
          </ImageDiv>

          <QuoteDiv>
            <StyledQuote>"{quote.quote}"</StyledQuote>
          </QuoteDiv>
        </div>

        <ContainerDiv>
          <p>Stats</p>
          <p>Click damage: {clickDamage}</p>
        </ContainerDiv>
      </FlexDiv>
    </BackgroundDiv>
  );
};
