
import { Table } from 'antd';
import { TYPE_NAME } from  "./config"

const columns = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: text => TYPE_NAME[text],
  },
  {
    title: '平均分',
    dataIndex: 'avg',
    key: 'avg',
    render: text => text.toFixed(1) + " 分",
  },
  {
    title: '总分',
    dataIndex: 'sum',
    key: 'sum',
    render: text => text + " 分",
  }
];

export default function TableComponent(props) {
  const { data = [] } = props;
  return (
      <Table columns={columns} dataSource={data} pagination={false} />
  );
}
