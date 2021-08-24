import { Link } from 'umi';
import { Button } from 'antd-mobile';
import logo from "./logo.jpg";
import styles from './index.less';
export default function StartPage() {
  return (
      <div className={styles.container}>
          <div className={styles.header}><img src={logo} />心理测试</div>
          <div className={styles.content}>
            <h2 className={styles.title}>SCL90自评量表在线测试</h2>
            <div>
            <p>《症状自评量表SCL90》是世界上最著名的心理健康测试量表之一，是当前使用最为广泛的精神障碍和心理疾病门诊检查量表，将协助您从十个方面来了解自己的心理健康程度。</p>
            <p>说明：下面有90条测验项目，列出了有些人可能会有的问题，请仔细地阅读每一条，然后根据最近一星期以内，您的实际感觉，选择适合的答案。</p>
            </div>
            <Link to="/index"><Button className={styles.link}>立即测试</Button></Link>
          </div>
      </div>
  );
}
