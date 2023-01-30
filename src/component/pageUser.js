import  React , {useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function PageUser() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    UsersGet()
  }, [])
  

  const UsersGet = () => {
    //ดึงapi
    fetch("https://www.melivecode.com/api/users")
    .then(res => res.json())
    .then(
      (result) => {
        //set ค่าให้ตอน โหลด
        setIsLoaded(true);
        setItems(result);
      },
    
      (error) => {
        setIsLoaded(true);
        //set ค่าให้ตอน error
        setError(error);
      }
    )
  }
  
  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch('https://www.melivecode.com/api/users/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        // result ของ json ที่ resอ่าน บอกว่า ข้อมูลใน message alert ออกมา
        alert(result['message'])
        //บอกให้ result ค่า status ที่ === 'ok' ทำ
        if (result['status'] === 'ok') {
          UsersGet();
        }
      }
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      
    <div>
 
           
      <div className=" flex justify-center pt-10">
        <div className="w-[90%]">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='border-2'>
          <TableRow >       
            <TableCell align="center">Name</TableCell>
            <TableCell align="lift">Email</TableCell>
            <TableCell align="center">
              <div>
              <Link to="/create">
                  <Button variant="contained" color="primary">
                    CREATE
                  </Button>
              </Link>
              </div>    
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">     
                <div className="flex w-full ml-[15%] h-full items-center">
                  <div className='pr-[5%]'> 
                  <img src={row.avatar} alt="" className="w-14"/>
                  </div>
                 
                  <div className="">
                  {row.fname} {row.lname}
                  </div>
                </div>
            
              </TableCell>       
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="center">
              <ButtonGroup color="primary" aria-label="outlined primary button group">

                    <Button onClick={() => UserDelete(row.id)}>Delete</Button>
                  </ButtonGroup>
              </TableCell>
   
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>

      </div>
  </div>
   
    );
  }
 
}