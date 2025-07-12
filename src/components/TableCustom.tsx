import { Table, Pagination } from "antd";

interface TableCustomProps {
  columns: object[];
  data: object[];
  loading?: boolean;
  rowKey?: string;
  scroll?: object;
  totalData?: number;
  current?: number;
  pageSize?: number;
  handlePageChange?: (newPage: number, newPageSize: number) => void;
}

const TableCustom = ({
  columns,
  data,
  loading,
  rowKey,
  scroll,
  totalData,
  current,
  pageSize,
  handlePageChange,
}: TableCustomProps) => {
  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey}
        pagination={false}
        scroll={scroll}
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="font-normal">
          Menampilkan <span className="font-bold">{totalData || 0}</span> data
        </div>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={totalData || 0}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TableCustom;
