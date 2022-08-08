import { useState } from 'react'
import store from '../state/store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filter = createFilterOptions();

export default function AddModal() {
  const [value, setValue] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  
  const workspaces = store(state => state.workspaces);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFormSubmit = (event) => {
    console.log(url, value);
    // Connect it with Github API and store adequate information to DB
  }

  // Styler for pop-up modal
  const style = {
    position: 'absolute',
    display: 'inline-grid',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div id="AddModal">
      <Button onClick={handleOpen}>
         <div className="addButton-icon" >
            <AddCircleIcon sx={{ fontSize: 35 }} style={{color: "lightgrey"}} />
          </div>
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="github-url"
            label="Add your URL"
            value={url}
            onChange={handleUrlChange}
          />
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option);
              if (inputValue !== '' && !isExisting) {
                filtered.push(`Add "${inputValue}"`);
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="url"
            options={workspaces}
            getOptionLabel={(option) => {
              return option;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Search for workspace" />
            )}
          />
          <Button onClick={handleFormSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
