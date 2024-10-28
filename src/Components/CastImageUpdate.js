import React, { useState, useEffect } from 'react';
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

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('Image updated successfully!');
      setError('');
      setDialogOpen(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again!');
      setMessage('');
    } finally {
      setLoading(false);
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
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f7ff 100%)',
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            fontWeight: 450,
            color: '#1a237e',
            py: 3,
            background: 'linear-gradient(90deg, #1a237e 0%, #3949ab 100%)',
            color: 'white',
            mb: 0
          }}
        >
          Cast Image Update
        </Typography>

        <Grid container sx={{ minHeight: '500px' }}>
          <Grid item xs={12} md={6} sx={{ 
            p: 4,
            borderRight: { md: '1px solid #e0e0e0' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f8faff'
          }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px dashed',
                borderColor: invalidFile ? 'error.main' : file ? 'success.main' : 'primary.main',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                bgcolor: invalidFile ? 'error.lighter' : file ? 'success.lighter' : 'primary.lighter',
                transition: 'all 0.3s ease',
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
                <Typography variant="h6" color="primary.main" sx={{ mb: 2, fontWeight: 400 }}>
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
        disableBackdropClick
        open={dialogOpen} 
        // onClose={() => ()}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
        >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircleIcon color="success" />
            <Typography variant="h6">Upload Successful</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            File uploaded successfully. Download the following purge list and hand it over to the infra team.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={handleDownload}
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Download Purge List
          </Button>
        </DialogActions>
        </Dialog>
    </Container>
  );
};

export default CastImage;
