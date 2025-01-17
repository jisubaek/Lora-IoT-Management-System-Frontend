import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import SiteMap from './SiteAdd_map';
import { cookies, setCookie, useCookies, getCookie } from "react-cookie";

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const SitePost = (props) => {
  const theme = createTheme();
  const [nodenameState, setnodenameState] = useState('');
  const [nodenameError, setnodenameError] = useState('');
  const [siteError, setsiteError] = useState('');
  const [batteryError, setbatteryError] = useState('');
  const [registerError, setregisterError] = useState('');
  
  const [add,setAdd]=useState('')

  const history = useNavigate();

  const handleClick = () => {
    alert('등록 완료하였습니다.')
    }

  const onhandlePost = async (data) => {
    const { name, type, address, information } = data;
    const postData = { name, type, address, information };

    // post
    await axios({
        method: 'post',
        url: 'http://220.149.31.104:9090/api/product/site/add',
        headers: {'Content-Type': 'multipart/form-data'},
          'authorization': getCookie('access-token'),
          'authorization-refresh': getCookie('refresh-token') 
    })
      .then(function (response) {
        console.log(response, '성공');
      })
      .catch(function (err) {
        console.log(err);
        setregisterError('등록에 실패하였습니다. 다시 한번 확인해 주세요.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      name: data.get('name'),
      type: data.get('type'),
      address: data.get('address'),
      information: data.get('information')
    };
    const { name, type, address, information } = joinData;

    if (true) {
      onhandlePost(joinData);
    }
  };

  const recieveadd = (e) => {
    setAdd(e);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Site
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="sitename"
                    id="sitename"
                    name="sitename"
                    label="Site 명"
                    error={nodenameState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{batteryError}</FormHelperTexts>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="type"
                    name="type"
                    label="type"
                    error={batteryError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{batteryError}</FormHelperTexts>

                <Grid item xs={12}>




                  <SiteMap recieveadd={recieveadd()} />
                  {/* <div> address: {props.address} </div> */}





                </Grid>
                <FormHelperTexts>{siteError}</FormHelperTexts>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="information"
                    name="information"
                    label="information"
                    error={batteryError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{batteryError}</FormHelperTexts>

              </Grid>



              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                onClick={handleClick}
              >
                등록
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SitePost;