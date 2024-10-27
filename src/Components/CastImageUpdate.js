import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box, CircularProgress, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios';

const CastImage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [castId, setCastId] = useState('');
  const [gcpPath, setGcpPath] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const [invalidFile, setInvalidFile] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile?.type;

    if (selectedFile && (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg')) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setInvalidFile(false);
    } else {
      setFile(null);
      setFileName('');
      setInvalidFile(true);
      // setError('Only JPEG or PNG files are allowed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('castId', castId);
    formData.append('gcpPath', gcpPath);

    setDialogOpen(true);
    try {
      const response = await axios.post('http://localhost:8080/castImage/upload-cast-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Image updated successfully!');
        setError('');
      }
    } catch (err) {
      setError(err.response?.data || 'Something went wrong. Try again!');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // const fileUrl = 'http://localhost:8080/path-to-purge-list-file';
    // const link = document.createElement('a');
    // link.href = fileUrl;
    // link.setAttribute('download', 'purge_list.txt');
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    
    setIsDownloadComplete(true);
    setDialogOpen(false);
    
    // Remove beforeunload event after download is complete
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  const handleBeforeUnload = (event) => {
    if (!isDownloadComplete) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDownloadComplete]);

  return (
    <Box
      sx={{
        marginTop: 4,
        p: 4,
        maxWidth: '450px',
        mx: 'auto',
        borderRadius: 3,
        bgcolor: 'background.paper',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Update Cast Image
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                justifyContent: 'space-between',
                border: '1px solid #ddd',
                padding: '8px 12px',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                animation: invalidFile ? 'blink-red 1s infinite' : 'none',
                '@keyframes blink-red': {
                  '0%, 100%': { borderColor: '#ddd' },
                  '50%': { borderColor: 'red' },
                },
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  color: '#fff',
                  bgcolor: '#1976d2',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
                startIcon={<UploadIcon />}
              >
                Upload
                <input
                  type="file"
                  hidden
                  accept=".jpeg,.jpg,.png"
                  onChange={handleFileChange}
                />
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '200px',
                }}
              >
                {fileName ? fileName : 'No file selected'}
              </Typography>
            </Stack>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mt: 1 ,
                animation: invalidFile ? 'blink-red 1s infinite' : 'none',
                '@keyframes blink-red': {
                  '0%, 100%': { borderColor: '#ddd' },
                  '50%': { borderColor: 'red' },
                },
              }}
            >
              Only JPG, JPEG and PNG files are allowed.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cast ID"
              variant="outlined"
              required
              value={castId}
              onChange={(e) => setCastId(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="GCP Path"
              variant="outlined"
              required
              value={gcpPath}
              onChange={(e) => setGcpPath(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                py: 1,
                fontSize: '16px',
                maxWidth: '150px',
                mx: 'auto',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Grid>

          {message && (
            <Grid item xs={12}>
              <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
                {message}
              </Typography>
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error.main" sx={{ fontWeight: 'bold' }}>
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>

      <Dialog open={dialogOpen} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>File Uploaded Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            File uploaded successfully, download the following purge list and hand it over to the infra team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownload} color="primary" variant="contained">
            Download Purge List
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CastImage;
