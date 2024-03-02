import Card from "./index";
import styles from "./card.module.css";
const CardList = ({ CardData }) => {
  return (
    <div className={styles.Big_Container}>
      {CardData.slice(0,4).map((item,i) => {
        return <Card CardData={item} i={i}/>;
      })}
    </div>
  );
};

export default CardList;
