import Card from "./index";
import styles from "./card.module.css";
import { Fragment } from "react";
const CardList = ({ CardData }) => {
  return (
    <div className={styles.Big_Container}>
      {CardData.slice(0,4).map((item,i) => {
        return <Fragment key={i}><Card CardData={item} i={i}/></Fragment>;
      })}
    </div>
  );
};

export default CardList;
