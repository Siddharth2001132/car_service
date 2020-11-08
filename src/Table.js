import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function Table(props) {
    return (
      <div>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField="id">
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="value">Value</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }


export default Table;
