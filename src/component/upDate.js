import  React, {useState , useEffect} from 'react';
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BorderColorIcon from '@mui/icons-material/BorderColor';


export default function UpDate() {
    //ใช้ useParams ดึงค่า id มาจากหน้า
    const { id } = useParams();
    useEffect(() => {
        //ดึงapi user ตาม id เเล้ว set ค่าที่แก้ไข้เข้าไป เพื่อให้หน้าโชว์ข้อมูลอัพเดต
      fetch("https://www.melivecode.com/api/users/"+id)
        .then(res => res.json())
        .then(
          (result) => {
            setFname(result.user.fname)
            setLname(result.user.lname)
            setUsername(result.user.username)
            setEmail(result.user.email)
            setAvatar(result.user.avatar)
          }
        )
        //[id] เปลี่ยนค่าทุกค่า ยกเว้น id 
    }, [id])

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
    'id': id,
      'fname': fname,
      'lname': lname,
      'username': username,
      'email': email,
      'avatar': avatar,
    }
  fetch('https://www.melivecode.com/api/users/update', {
      method: 'PUT',
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
         window.location.href = '/';
        }
      }
    )
  };
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',width: 130,height: 130, }}>
            <BorderColorIcon sx={{ width: 90,height: 90,}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
          Edit Data
          </Typography>
          <div className="pt-4 pb-2">
            Data ID : {id}
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={ (e) => setFname(e.target.value) }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={ (e) => setLname(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                label="Url Img"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              upDate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body3">
                  Back to Page Users List
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}