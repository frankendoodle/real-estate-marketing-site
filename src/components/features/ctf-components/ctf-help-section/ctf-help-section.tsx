import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import {
  Container,
  Theme,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import {
  HelpSectionFieldsFragment,
  HelpOptionFieldsFragment,
} from './__generated/ctf-help-section.generated';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    backgroundColor: '#ffffff',
  },
  headline: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(6),
    textAlign: 'center',
    color: '#333',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
      borderColor: theme.palette.primary.main,
    },
  },
  cardSelected: {
    borderColor: theme.palette.primary.main,
    backgroundColor: '#f0f7ff',
  },
  cardMedia: {
    height: 120,
    backgroundSize: 'contain',
    margin: theme.spacing(3, 3, 0, 3),
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: '#333',
  },
  cardDescription: {
    fontSize: '0.95rem',
    color: '#666',
  },
  selectedMessage: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#e3f2fd',
    borderRadius: theme.spacing(1),
    textAlign: 'center',
  },
}));

export const CtfHelpSection = (props: HelpSectionFieldsFragment) => {
  const {
    headline,
    helpOptionsCollection,
    sys: { id },
  } = props;

  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode({ entryId: id });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const helpOptions = helpOptionsCollection?.items || [];

  const handleOptionClick = (option: HelpOptionFieldsFragment) => {
    setSelectedOption(option.categoryValue || option.sys.id);
    console.log('Selected help option:', option.categoryValue);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      {headline && (
        <Typography
          variant="h2"
          className={classes.headline}
          {...inspectorMode({ fieldId: 'headline' })}
        >
          {headline}
        </Typography>
      )}

      <Grid container spacing={3}>
        {helpOptions.map(option => {
          if (!option) return null;

          const isSelected = selectedOption === (option.categoryValue || option.sys.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={option.sys.id}>
              <Card
                className={`${classes.card} ${isSelected ? classes.cardSelected : ''}`}
                onClick={() => handleOptionClick(option)}
                elevation={isSelected ? 4 : 1}
              >
                {option.iconImage?.url && (
                  <CardMedia
                    className={classes.cardMedia}
                    image={option.iconImage.url}
                    title={option.iconImage.title || option.title || ''}
                  />
                )}
                <CardContent className={classes.cardContent}>
                  {option.title && (
                    <Typography className={classes.cardTitle}>{option.title}</Typography>
                  )}
                  {option.description && (
                    <Typography className={classes.cardDescription}>
                      {option.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {selectedOption && (
        <Box className={classes.selectedMessage}>
          <Typography variant="body1" color="primary">
            Great! You&apos;ve selected an option. This selection can be used to pre-fill form
            fields or route your inquiry appropriately.
          </Typography>
        </Box>
      )}
    </Container>
  );
};
