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
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
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

const UserEdit = id => {
  if(id > 12) {
    window.location = '/update/'+id
  } else {
    alert('!แก้ไข้ได้เฉพาะ id ที่ 13 ขึ้นไป')
  }  
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

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const styleBoxDelete = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  if (error) {
    return <div className="text-center pt-20 text-3xl">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="text-center pt-20 text-3xl">Loading...</div>;
  } else {
    return (
      
    <div>
 
           
      <div className=" flex justify-center pt-10">
        <div className="w-full">
     
        <Container sx={{ py: 2 }} >
          <p className="text-center text-3xl">Users List</p>
          <div className='flex justify-end mb-5'>
              <Link to="/create">
                  <Button variant="contained" color="success" className="w-28 ">
                  <LibraryAddIcon className='mr-1' />
                    <p className="text-md">
                    CREATE
                    </p>
                  </Button>
              </Link>
              </div>
          <Grid container spacing={3}>
            {items.map((card) => (
              <Grid item key={card} xs={6} sm={4} md={3}>
                <Card
                  sx={{ height: '100%',width:'100%', display: 'flex', flexDirection: 'column' }}
                >  
                <div className="flex justify-center">
                <img src={card.avatar} className="w-20" alt=""/>
                </div>
                 
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                    {card.fname} {card.lname}
                    </Typography>
                    <Typography>
                      {card.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" onClick={()=> UserEdit(card.id)}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => UserDelete(card.id)}>Delete</Button>       
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <div className="mx-10 py-20">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='border-2'>
          <TableRow >       
            <TableCell align="center">Name</TableCell>
            <TableCell align="lift">Email</TableCell>
            <TableCell align="center">
              <div>
              <Link to="/create">
                  <Button variant="contained" color="success">
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
                    <Button onClick={() => UserEdit(row.id)}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => UserDelete(row.id)}>Delete</Button>
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

  </div>
   
    );
  }
 
}