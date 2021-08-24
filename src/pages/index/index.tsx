
import { useState, useRef, useEffect } from 'react';
import { Progress } from 'antd';
import { Button, Toast } from 'antd-mobile';
import html2canvas from "html2canvas";
import { debounce } from "@/tools";
import ResultImg from "./start.jpg";
import { questions, S } from './config';
import styles from './index.less';
import TableComponent from './table';


interface Item {
  id: number;
  value: number;
  type: number;
}

const initArr = JSON.parse(sessionStorage.getItem("arrRef")) || [];
const initState = sessionStorage.getItem("state")||0;

export default function IndexPage() {
  const [state, setState] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(initArr.length == questions.length );
  const arrRef = useRef<Item[]>(initArr);
  const resultRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  
  const onclick = debounce((id: number, value: number, type:number) => {
    setState(id);
    const _index = arrRef.current.findIndex(item=>item.id === id);
    _index > -1 ?arrRef.current[_index] = {
      id, value, type
    }: 
    arrRef.current.push({
      id, value, type
    });

    if(id == questions.length) Toast.loading("正在疯狂计算中~~", 1);

    sessionStorage.setItem("state", id)
    sessionStorage.setItem("arrRef", JSON.stringify(arrRef.current))
  }, 100)

  // 上一题
  const prevQuestion = debounce(()=>{
    if(state == 0) return;
    setResult(false);
    setState(state - 1);
  }, 200)

  // 计算结果
  const compuntResult = () => {
    setResult(true)
  }

  // 格式化
  const format = data => {
    const obj = {} as any;
    let arr = [] as any;
    let sum = 0;
    data.map(item=>{
      if(obj.hasOwnProperty(item.type)){
        obj[item.type].sum =obj[item.type].sum + item.value;
        obj[item.type].len ++;
      }else{
        obj[item.type] = {
          sum: item.value,
          len: 1
        }
      }
    })

    Object.keys(obj).map(key=> {
      sum = sum + obj[key].sum;
      return arr.push({"type": key, sum: obj[key].sum, avg: obj[key].sum / obj[key].len})
    })
    arr.push({"type": 100, sum, avg: sum /questions.length })
    return arr
  }

  const convert2Img = ()=> {
    if(resultRef.current) {
      setLoading(true);
      Toast.info("图片生成中~")
      html2canvas(resultRef.current).then(canvas => {
        // document.body.appendChild(canvas)
        Toast.info("长按图片保存到本地！")
        imgRef.current.src = canvas.toDataURL();
      });
    }
  }
 

  useEffect(()=>{
    if(state === questions.length && arrRef.current.length == questions.length ) {
      // 计算结果
      setTimeout(() => {
        compuntResult()
      }, 1000);
    }
  },[arrRef.current, state])
  
  return (
    <div className={styles.container}>
      {!result ? <>
      <div className={styles.header}>
        <Button type="primary" size="small" className={styles.f1} onClick={prevQuestion}>上一题</Button> 
        <Progress percent={(state / questions.length * 100).toFixed(0)} size="small" className={styles.f2}/> 
        <span className={styles.f3}><span className={styles.state}>{state}</span>/<span>{questions.length}</span></span>
      </div>
      <div className={styles.content}>
        {questions.map(
          (item, index) =>
            state == index && (
              <div className="animate__animated animate__fadeInRight">
                <h2>{item.name}</h2>
                {S.map((i) => (
                  <p className={styles.li} onClick={() => onclick(item.id, i.id, item.type)}>{i.title}</p>
                ))}
              </div>
            ),
        )}
      </div>
      </>:
      <div className={styles.result}>
        <div ref={resultRef}>
          <img src ={ResultImg} alt="心灵评估" width="100%" />
          <div className={styles.content}>
            <h2>结果分析</h2>
            <div className={styles.table}>
              <TableComponent data={format(arrRef.current)} />
            </div>
            <div className={styles.pg}>
              按中国常模结果，如果您的SCL90总分超过160分，单顶均分超过2分就应作进一步检查，标准分为大于200分说明你有明显心理问题的可能性，可求助于心理咨询，大于250分则比较严重，需要作医学上的详细检查，很可能要做针对性的心理治疗或在医生的指导下服药。
            </div>
          </div>
        </div>
        {loading &&<div className={styles.loadingImg}> <img ref={imgRef} /></div>}
        <Button className={styles.link} onClick={convert2Img}>生成图片</Button>
      </div> 
      }
    </div>
  );
}
