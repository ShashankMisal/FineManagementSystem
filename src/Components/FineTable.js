import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Switch from '@material-ui/core/Switch';
import db from '../firebase.js'


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = props.fines.sort((a, b) => b.data.createdAt?.toDate() - a.data.createdAt?.toDate())  



  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

   const handleStatusChange = (fineid,isPaid,fineAmount) =>{

      if(fineid!==""){
            
          const fineDoc = db.collection('users').doc(props.toUpdateUserId)
            const fineDoc2 = fineDoc.collection('fines').doc(fineid)
            fineDoc2.update({isPaid:!(isPaid)}).then((res)=>{
                console.log("res:",res)
            }).catch((err)=>console.log(err)) 

          
          db.collection('users').doc(props?.toUpdateUserId).update({
            totalFinePaid: (isPaid===false)
                            ?(parseInt(props?.summary.totalFinePaid) + parseInt(fineAmount))
                            :(parseInt(props?.summary.totalFinePaid) - parseInt(fineAmount))
                        })

         db.collection('users').doc(props?.toUpdateUserId).update({fineDue:(isPaid===false)
                            ?(parseInt(props?.summary.fineDue) - parseInt(fineAmount))
                            :(parseInt(props?.summary.fineDue) + parseInt(fineAmount))
        })
      }
  }

 
 

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow style={{backgroundColor:"rgb(7 0 32)"}}>
            <TableCell style={{color:"white"}}>Fine Amount</TableCell>
            <TableCell style={{color:"white"}} align="right">Fine Date</TableCell>
            <TableCell style={{color:"white"}} align="right"> Paid Status</TableCell>
          </TableRow>
        </TableHead>    
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,index) => (
            <TableRow key={index} >
              <TableCell component="th" scope="row">
              ₹{row.data.fineAmount}
              </TableCell>
              <TableCell style={{ width: 110 }} align="right">
                { new Date(row.data.createdAt?.toDate()).toLocaleDateString()}
              </TableCell>

              <TableCell style={{ width: 110 }} align="right" value={index} >
            
              {props.toUpdateUserId ?
                    <Switch
                    checked={row.data.isPaid}
                    onChange={()=>{handleStatusChange(row?.finesid,row.data?.isPaid,row.data?.fineAmount)}}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    style={ row.data.isPaid?{color:"#1a6c1a"}:{color:"#ba0101"}}
                    />
                :(
                <Chip
                icon={ row.data.isPaid
                  ? <CheckCircleOutlineIcon style={{color:"white",fontSize:"22px"}} />
                  : <FaceIcon style={{color:"white",fontSize:"22px"}} />}
                  label= { row.data.isPaid ?"Paid" :"Not-Paid"}
                  color="default"
                  style={ row.data.isPaid ? {background:"linear-gradient(to right, #000000, #0f9b0f)",color:"white"} : {background:"linear-gradient(to right, rgb(255 25 0), rgb(70 4 4))",color:"white"}}
                  /> 
                )}
              </TableCell>

              
            
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={0} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow style={{backgroundColor:"#f2f0fb"}}>
              
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
   
    </>
  );
}