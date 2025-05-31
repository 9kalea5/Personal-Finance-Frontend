import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { login } from '../services/auth';

const validationSchema = yup.object({
  email: yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await login(values);
        toast.success('Login successful!');
        navigate('/dashboard'); // You'll need to create a dashboard route
      } catch (error) {
        const errorMessage = error.detail || 'Invalid email or password';
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
            Welcome Back
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
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

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                align="right"
                sx={{ alignSelf: 'flex-end' }}
              >
                Forgot password?
              </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2, position: 'relative' }}
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
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Create one
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
