import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  IconButton,
  Container,
  Grid,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import ErrorSound from '../Assets/error-sound.wav';
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
  const [previewUrl, setPreviewUrl] = useState(null);
  const errorSoundRef = useRef(new Audio(ErrorSound));

  const playErrorSound = () => {
    errorSoundRef.current.play();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile?.type;

    if (selectedFile && (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg')) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setInvalidFile(false);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setFileName('');
      setInvalidFile(true);
      setPreviewUrl(null);
      playErrorSound();
    }
  };

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [purgeListDialogOpen, setPurgeListDialogOpen] = useState(false);
  const [purgeList, setPurgeList] = useState(null); // Stores the purge list data
  
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
  
    try {
      const response = await axios.post('https://localhost:3000/castImage/save-cast-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201 || response.status === 200) {
        setMessage(response.data.message || 'Image uploaded successfully!');
        setError('');
        setDialogOpen(true);
      } else if (response.status === 400 && response.data.includes("Cast ID already exists. Try updating!")) {
        setUpdateDialogOpen(true);
      } else {
        setError(response.data || 'Something went wrong. Try again!');
        setMessage('');
      }
    } catch (err) {
      setError(err.response?.data || 'Something went wrong. Try again!');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = async () => {
    setUpdateDialogOpen(false);
    setLoading(true);
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('castId', castId);
    formData.append('gcpPath', gcpPath);
  
    try {
      const response = await axios.post('https://localhost:3000/castImage/update-cast-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        await generatePurgeList();
      } else {
        setError(response.data || 'Failed to update image.');
      }
    } catch (err) {
      setError(err.response?.data || 'Failed to update image.');
    } finally {
      setLoading(false);
    }
  };
  
  const generatePurgeList = async () => {
    try {
      const response = await axios.get('https://localhost:3000/castImage/generate-purge-curls', {
        params: { castId },
      });
  
      if (response.status === 200) {
        setPurgeList(response.data);
        setPurgeListDialogOpen(true);
      }
    } catch (err) {
      setError('Failed to generate purge list.');
    }
  };
  
  

  const handleDownload = () => {
    setIsDownloadComplete(true);
    setDialogOpen(false);
  };

  const removeFile = () => {
    setFile(null);
    setFileName('');
    setPreviewUrl(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isDownloadComplete) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your download isn\'t complete yet.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDownloadComplete]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper
        // elevation={6}
        sx={{
          boxShadow: 'none',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#f4f6f8',
        }}
      >
        <Grid container sx={{ minHeight: '500px' }}>
          <Grid item xs={12} md={6} sx={{ 
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f4f6f8'
          }}>
              <Box
                sx={{
                  height: '50px',
                  width: '550px',
                  bgcolor: 'black',
                  color: 'white',
                  p: 1,
                  textAlign: 'center',
                }}
              >
              </Box>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '3px solid black',
                borderColor: invalidFile ? 'error.main' : file ? 'success.main' : 'black',
                p: 3,
                textAlign: 'center',
                bgcolor: '#f8faff',
                transition: 'all 0.3s ease',
                animation: invalidFile ? 'blink 0.2s linear 3' : 'none',
                transition: 'all 0.3s ease',
                '@keyframes blink': {
                  '0%': { borderColor: 'error.main', color: 'error.main' },
                  '50%': { borderColor: 'transparent', color: 'transparent' },
                  '100%': { borderColor: 'error.main', color: 'error.main' },
                },
              }}
            >
              {previewUrl ? (
                <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                  <IconButton
                    onClick={removeFile}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'error.lighter' },
                      zIndex: 1,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={{
                      maxHeight: 300,
                      maxWidth: '100%',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    {fileName}
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2} alignItems="center">
                  <ImageIcon sx={{ fontSize: 64, color: 'primary.main' }} />
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadIcon />}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' },
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Choose Image
                    <input
                      type="file"
                      hidden
                      accept=".jpeg,.jpg,.png"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Supported formats: JPG, JPEG, PNG
                  </Typography>
                </Stack>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} sx={{ height: '100%' }}>
                <Typography variant="h5" color="primary.main" sx={{ mb: 2, fontWeight: "bold", fontFamily: "16px mulish" }}>
                  Image Info
                </Typography>

                <TextField
                  label="Cast ID"
                  required
                  value={castId}
                  onChange={(e) => setCastId(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      width: '350px',
                    }
                  }}
                />

                <TextField
                  label="GCP Path"
                  required
                  value={gcpPath}
                  onChange={(e) => setGcpPath(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      width: '350px',
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    height: '40px',
                    width: '190px',
                    borderRadius: 1,
                    fontSize: '1.0rem',
                    fontWeight: 540,
                    boxShadow: 4,
                    bgcolor: 'primary.main',
                    mt: 'auto',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      boxShadow: 6,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Upload Image'
                  )}
                </Button>
                {(message || error) && (
                  <Box sx={{ mt: 2 }}>
                    {message && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          bgcolor: 'success.light',
                          color: 'white',
                          p: 2,
                          borderRadius: 2,
                          boxShadow: 1,
                          gap: 1,
                        }}
                      >
                        <CheckCircleIcon />
                        <Typography>{message}</Typography>
                      </Stack>
                    )}
                    {error && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          bgcolor: 'error.light',
                          color: 'white',
                          p: 2,
                          borderRadius: 2,
                          boxShadow: 1,
                          gap: 1,
                        }}
                      >
                        <ErrorIcon />
                        <Typography>{error}</Typography>
                      </Stack>
                    )}
                  </Box>
                )}
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Cast Image Already Exists</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The cast image already exists. Do you want to update it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={() => setUpdateDialogOpen(false)}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={purgeListDialogOpen}
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Purge List Generated</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The purge list has been generated. Please download it and share it with the infra team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              const blob = new Blob([purgeList], { type: 'text/plain' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'purge_list.txt';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setPurgeListDialogOpen(false);
            }}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Download Purge List
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CastImage;