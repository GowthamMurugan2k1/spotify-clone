'use client'

import styles from "./sidebarComp.module.css";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { IoAddSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { usePathname,useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { BsSearchHeart } from "react-icons/bs";

function index() {
  const path = usePathname();
  const router = useRouter()
  const ChipsTag = [{ id: 0, item: 'playlists' }, { id: 1, item: 'artists' }, { id: 3, item: 'albums' }]

  const SidebarContent = [{
    id: 0,
    name: 'home',
    icon: <GoHome />,
    activeIcon:<GoHomeFill />,
    url:'/'
  },
  {
    id: 1,
    name: 'search',
    icon: <FiSearch />,
    activeIcon:<BsSearchHeart />,
    url:'/search'
  },
  ]

  // This function route the user respected URL
  const handleClick = (url)=>{
    router.push(url)
  }
  
  return (
    <div className={styles.Container}>
      <div className={styles.QuickAccess}>
        {SidebarContent.map((value) => {
          return (<ul  key={value.id}>
            <li className={value.url !== path ? styles.li : `${styles.li} ${styles.active}`} onClick={()=>handleClick(value.url)}>
              {value.url === path ? value.activeIcon :value.icon} <span>{ value.name}</span>
            </li>
          </ul>)
        })}
      </div>
      <div className={styles.SubContainer}>
        <div className={styles.topContainer}>
          <div className={styles.layer1}>
            <div className={styles.content}>
              <span>
                <VscLibrary />
              </span>
              your library
            </div>
            <div className={styles.content1}>
              <span className={styles.AddIcon}>
                <IoAddSharp />
              </span>
              <FaArrowRight id={styles.arrowBtn} />
            </div>
          </div>
          <div className={styles.layer2}>
            {ChipsTag.map((value) => {
              return <button key={value.id} className={styles.ChipsBTN}>{value.item}</button>
            })}
          </div>
          <div className={styles.layer3}>
            <span> <FiSearch /></span>
            <button className={styles.RecentBtn}> Recents <TfiMenuAlt /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
