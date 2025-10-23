import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import {
  Container,
  Theme,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Checkbox,
  Box,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { ContactFormFieldsFragment } from './__generated/ctf-contact-form.generated';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(6),
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headline: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: '#333',
  },
  subheadline: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: theme.spacing(4),
  },
  formSection: {
    marginBottom: theme.spacing(4),
  },
  submitButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
  },
  successMessage: {
    padding: theme.spacing(3),
    backgroundColor: '#4caf50',
    color: '#ffffff',
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  privacyText: {
    fontSize: '0.875rem',
    color: '#666',
    marginTop: theme.spacing(2),
  },
}));

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  contactType: string;
  otherContactType: string;
  message: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export const CtfContactForm = (props: ContactFormFieldsFragment) => {
  const {
    headline,
    subheadline,
    contactTypeOptions,
    otherContactTypes,
    submitButtonText,
    successMessage,
    privacyPolicyText,
    enableCaptcha,
    sys: { id },
  } = props;

  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode({ entryId: id });

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    contactType: '',
    otherContactType: '',
    message: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const contactOptions = contactTypeOptions
    ? JSON.parse(contactTypeOptions as string)
    : { options: [] };
  const otherOptions = otherContactTypes
    ? JSON.parse(otherContactTypes as string)
    : { options: [] };

  const handleInputChange =
    (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: undefined,
        });
      }
    };

  const handleCheckboxChange =
    (field: keyof ContactFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.checked,
      });
    };

  const handleSelectChange = (field: keyof ContactFormData) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.contactType) newErrors.contactType = 'Please select a contact type';
    if (formData.contactType === 'other' && !formData.otherContactType) {
      newErrors.otherContactType = 'Please select a specific type';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Form submitted:', formData);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        contactType: '',
        otherContactType: '',
        message: '',
        agreeToTerms: false,
        subscribeNewsletter: false,
      });
    }, 5000);
  };

  if (submitted && successMessage) {
    return (
      <Container maxWidth="md" className={classes.root}>
        <div className={classes.successMessage}>
          <Typography variant="h5" align="center">
            {successMessage}
          </Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.formContainer}>
        {headline && (
          <Typography
            variant="h1"
            className={classes.headline}
            {...inspectorMode({ fieldId: 'headline' })}
          >
            {headline}
          </Typography>
        )}
        {subheadline && (
          <Typography
            className={classes.subheadline}
            {...inspectorMode({ fieldId: 'subheadline' })}
          >
            {subheadline}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <Grid container spacing={2} className={classes.formSection}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                required
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                required
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Grid container spacing={2} className={classes.formSection}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
          </Grid>

          {/* Company */}
          <div className={classes.formSection}>
            <TextField
              fullWidth
              label="Company (Optional)"
              value={formData.company}
              onChange={handleInputChange('company')}
            />
          </div>

          {/* Contact Type Radio Buttons */}
          {contactOptions.options && contactOptions.options.length > 0 && (
            <FormControl
              component="fieldset"
              className={classes.formSection}
              error={!!errors.contactType}
            >
              <FormLabel component="legend" {...inspectorMode({ fieldId: 'contactTypeOptions' })}>
                I am a *
              </FormLabel>
              <RadioGroup value={formData.contactType} onChange={handleInputChange('contactType')}>
                {contactOptions.options.map((option: any) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
              {errors.contactType && (
                <Typography color="error" variant="caption">
                  {errors.contactType}
                </Typography>
              )}
            </FormControl>
          )}

          {/* Other Contact Type Dropdown */}
          {formData.contactType === 'other' &&
            otherOptions.options &&
            otherOptions.options.length > 0 && (
              <div className={classes.formSection}>
                <FormControl fullWidth error={!!errors.otherContactType}>
                  <FormLabel {...inspectorMode({ fieldId: 'otherContactTypes' })}>
                    Please specify *
                  </FormLabel>
                  <Select
                    value={formData.otherContactType}
                    onChange={handleSelectChange('otherContactType')}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select type...
                    </MenuItem>
                    {otherOptions.options.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.otherContactType && (
                    <Typography color="error" variant="caption">
                      {errors.otherContactType}
                    </Typography>
                  )}
                </FormControl>
              </div>
            )}

          {/* Message */}
          <div className={classes.formSection}>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={6}
              required
              value={formData.message}
              onChange={handleInputChange('message')}
              error={!!errors.message}
              helperText={errors.message}
              placeholder="Tell us how we can help you..."
            />
          </div>

          {/* Checkboxes */}
          <div className={classes.formSection}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange('agreeToTerms')}
                />
              }
              label={<Typography variant="body2">I agree to the terms and conditions *</Typography>}
            />
            {errors.agreeToTerms && (
              <Typography color="error" variant="caption" display="block">
                {errors.agreeToTerms}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.subscribeNewsletter}
                  onChange={handleCheckboxChange('subscribeNewsletter')}
                />
              }
              label={<Typography variant="body2">Subscribe to our newsletter</Typography>}
            />
          </div>

          {/* Privacy Policy Text */}
          {privacyPolicyText && (
            <Typography
              className={classes.privacyText}
              {...inspectorMode({ fieldId: 'privacyPolicyText' })}
            >
              {privacyPolicyText}
            </Typography>
          )}

          {/* Captcha Placeholder */}
          {enableCaptcha && (
            <Box className={classes.formSection}>
              <Typography variant="body2" color="textSecondary">
                [Captcha would be displayed here in production]
              </Typography>
            </Box>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.submitButton}
            fullWidth
            {...inspectorMode({ fieldId: 'submitButtonText' })}
          >
            {submitButtonText || 'Submit'}
          </Button>
        </form>
      </div>
    </Container>
  );
};
