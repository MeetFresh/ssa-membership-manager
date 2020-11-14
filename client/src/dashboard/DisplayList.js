import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox'
import {connect} from "react-redux";
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function DisplayList(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <TableContainer style={{ maxHeight: 444 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.checkList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{maxWidth: 300, overflow: "hidden", whiteSpace: "nowrap"}}>
                    {row.email}
                  </TableCell>
                  <TableCell>{row.first + " " + row.last}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}