import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { requestPasswordReset } from '../services/auth';

const validationSchema = yup.object({
  email: yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await requestPasswordReset(values.email);
        toast.success("We've sent a password reset link to your email.");
        formik.resetForm();
      } catch (error) {
        const errorMessage = error.detail || 'No account is associated with this email.';
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo placeholder */}
        <Box sx={{ mb: 4 }}>
          <img
            src="/logo-placeholder.png"
            alt="Logo"
            style={{ height: '48px', width: 'auto' }}
          />
        </Box>

        <Card sx={{ width: '100%', p: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Forgot your password?
          </Typography>

          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Enter your email address below and we'll send you a link to reset your password.
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ position: 'relative' }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-12px',
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  'Send reset link'
                )}
              </Button>

              <Typography variant="body2" align="center">
                Remembered your password?{' '}
                <Link component={RouterLink} to="/login" variant="body2">
                  Login here
                </Link>
              </Typography>
            </Stack>
          </form>
        </Card>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, mb: 4 }}
        >
          © {new Date().getFullYear()} Personal Finance. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
