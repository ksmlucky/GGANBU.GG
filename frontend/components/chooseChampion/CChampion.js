import styles from "./CChampion.module.css";
import championList from "../../utils/champion";
import CSInput from "../championSearchInput/CSInput";
import { useEffect, useRef, useState } from "react";
import LeftCham from "../leftSelect/LeftCham";
import RightCham from "../rightSelect/RightCham";

export default function Detail() {
  const clist = championList();
  let refer = useRef([]);
  const [picked, setPicked] = useState([]);
  let [csinput, setCsinput] = useState("");
  let [cham, Setcham] = useState("");
  let [idxs, SetIdxs] = useState("");


  useEffect(()=>{
    if (picked) {
      refer.current.map((el, idx) => {
        if ( el&&picked.indexOf(el.id)!==-1){
          nodrag(String(idx));
        }
      })
    }
  },[csinput] )

  function searching(text) {
    let name = csinput.toLowerCase();
    if (text.toLowerCase().includes(name.toLowerCase())) {
      return "display:none";
    } else {
      return "display:''";
    }
  }

  function clicked(name) {
    Setcham(name);
  }

  const [dragAndDrop, setDragAndDrop] = useState({
    draggedFrom: null,
    draggedTo: null,
  });

  // 사용자가 객체(object)를 드래그하려고 시작할 때 발생함.
  const onDragStart = (event) => {
    let contect = event.target.alt;
    Setcham(contect);
    SetIdxs(event.target.attributes[3].value);
  };

  // 잡은 Item을 놓았을 때 발생
  const onDragEnd = (event) => {};

  const nodrag = (num) => {
    if (num) {
      const name = refer.current[num].id;
      refer.current[num].draggable = false;
      refer.current[num].style.filter = "saturate(0)";
      setPicked((picked) => {
        const newPicked = [...picked];
        if ( name&&picked.indexOf(name) ===-1){
          newPicked.push(name);
        }
        return newPicked;
      });
    }
  };

  const yesdrag = (num) => {
    if (num) {
      refer.current[num].draggable = true;
      refer.current[num].style.filter = "saturate(1)";
      setPicked((picked) => {
        const newPicked = [...picked];
        const result = newPicked.filter((pick) => pick !== num);
        return result;
      });
    }
  };

  const csInput = (input) => {
    refer.current.map((el, idx) => {
      if (el){
      el.draggable = true;
      el.style.filter = "saturate(1)";
      }
    })
    setCsinput(input)
  }

  return (
    <>
      <main className={styles.main}>
        <LeftCham
          cham={cham}
          Setcham={Setcham}
          idxs={idxs}
          nodrag={nodrag}
          yesdrag={yesdrag}
        />
        <div className={styles.choose}>
          <ul className={styles.ul}>
            {clist
              .filter((value) => {
                if (
                  csinput == "" ||
                  value.ko.toLowerCase().includes(csinput.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              .map((item, idx) => {
  
                return (
                  <li key={idx} className={styles.li}>
                    <button
                      className={styles.btn}
                      //

                      //
                    >
                      <img
                        src={`/champion/tiles/${item.en}_0.jpg`}
                        id={item.ko}
                        alt={item.en}
                        index={idx}
                        className={styles.img}
                        draggable={true}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        ref={(el) => (refer.current[idx] = el)}
                      />
                      <span className={styles.name}>{item.ko}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
          <CSInput csInput={csInput} />
        </div>
        <RightCham
          cham={cham}
          Setcham={Setcham}
          idxs={idxs}
          nodrag={nodrag}
          yesdrag={yesdrag}
        />
      </main>
    </>
  );
}
