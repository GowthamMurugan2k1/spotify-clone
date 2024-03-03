import Image from "next/image";
import styles from "./card.module.css";
import { Fragment, useState } from "react";
import CustomeIcon from '../CustomeIcons'
import { useRouter } from "next/navigation";

const index = ({ CardData, i }) => {
  const router = useRouter()
  const [isMouseHover, setisMousehover] = useState(null)
  // Destructure the Card Data
  const { images, name, description, href, id ,type} = CardData;


  const handleClick = (data) => {
    const {type,id} = data;
    router.push(`/${type}/${id}`)
  }
  return (
    <Fragment key={id || i}>
      <div className={styles.Card_container} onMouseEnter={() => setisMousehover(id)} onMouseLeave={() => setisMousehover(null)} onClick={ ()=>handleClick(CardData)}>
        <div className={styles.ImageConatiner}>
          {images[0]["url"] && <Image
            src={images[0]["url"]}
            width={1000}
            height={100}
            alt="image"
            layout="responsive"
            style={{ borderRadius: '8px' }}
          />}
         <CustomeIcon isMouseHover={isMouseHover} id={id}/>
        </div>
        <div className={styles.InfoContent}>
          <h3 id={styles.card_Title}>{name}</h3>
          {description && <p id={styles.Description}> {description.slice(0, 34) + "..."}</p>}
        </div>
      </div>
    </Fragment>
  );
};
export default index;
