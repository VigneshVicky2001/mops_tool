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
      // Simulated API call
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f7ff 100%)',
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#1a237e',
            mb: 3
          }}
        >
          Cast Image Uploader
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Upload Area */}
            <Box
              sx={{
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
                <Box sx={{ position: 'relative' }}>
                  <IconButton
                    onClick={removeFile}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'error.lighter' },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={{
                      maxHeight: 200,
                      maxWidth: '100%',
                      borderRadius: 1,
                      boxShadow: 3,
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {fileName}
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2} alignItems="center">
                  <ImageIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadIcon />}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' },
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
                  <Typography 
                    variant="caption" 
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
                </Stack>
              )}
            </Box>

            {/* Input Fields */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: 4,
                bgcolor: 'primary.main',
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

            {/* Messages */}
            {message && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'success.lighter',
                }}
              >
                <CheckCircleIcon color="success" />
                <Typography color="success.main" fontWeight="medium">
                  {message}
                </Typography>
              </Stack>
            )}

            {error && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'error.lighter',
                }}
              >
                <ErrorIcon color="error" />
                <Typography color="error.main" fontWeight="medium">
                  {error}
                </Typography>
              </Stack>
            )}
          </Stack>
        </form>

        {/* Success Dialog */}
        <Dialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)}
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
      </Paper>
    </Container>
  );
};

export default CastImage;