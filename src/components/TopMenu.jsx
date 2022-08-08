import { useState } from 'react';
import store from '../state/store';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function TopMenu() {
  const [workspaces, setView] = store(state => [state.workspaces, state.setView])
  const [addValue, setAddValue] = useState('');
  const [value, setValue] = useState(0);

  const handleClick = (event) => {
    setView(event.target.innerText)
    // console.log('this is view', event.target.innerText);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // const Menu = (workspaces) => (
  //   <div className="workspace-container">
  //     {
  //       workspaces.map((workspace, index) => (
  //         <div className="workspace-item" key={index} onClick={(e) => handleClick(e)} value={workspace}>
  //           {workspace}
  //         </div>
  //       ))
  //     }
  //   </div>
  // )


  return (
      <Stack
        id="TopMenu"
        direction="row"
        divider={<Divider color="grey" orientation="vertical" flexItem />}
        spacing={2}
      >
        {workspaces.map((workspace, index) => (
          <Item sx={{fontWeight: "400", background: "#2e4e5c", color: "lightgrey"}} className="workspace-item" key={index} onClick={(e) => handleClick(e)}>{workspace}</Item>
        ))}
      </Stack>
  )
}
{/* <Box id="TopMenu" sx={{ maxWidth: { xs: 300, sm: 400 }, bgcolor: '483D8B' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
      {workspaces.map((workspace, index) => (
          <Tab textColor="white" className="workspace-item" key={index} onClick={(e) => handleClick(e)} label={workspace}/>
        ))}
      </Tabs>
    </Box> */}

export default TopMenu;
    // <nav id="TopMenu">
    //   {Menu(workspaces)}
    // </nav>