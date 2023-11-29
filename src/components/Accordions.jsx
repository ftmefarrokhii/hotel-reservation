import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  maxWidth:`900px`,
  margin: `0 auto`,
  borderRadius:`1rem`,
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Accordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>How do I make a hotel reservation?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To make a hotel reservation, you can visit a hotel booking website or use a hotel booking app.
           Enter your desired destination, travel dates, number of guests, and any other preferences.
            Browse through the available hotels, compare prices, amenities, and guest reviews.
           Once you find a suitable hotel, 
          select the room type and make a reservation by providing your contact and payment information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Can I make changes to my hotel reservation?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, in most cases, you can make changes to your hotel reservation. However, it depends on
           the hotel's cancellation and modification policy. If you need to change your dates, room
           type, or other details, it's best to contact the hotel directly or the booking platform
            you used to make the reservation. They will assist you with the necessary modifications
           and inform you if any fees or charges apply.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>How do I cancel a hotel reservation?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To cancel a hotel reservation, you should refer to the cancellation policy provided
           by the hotel or booking platform. Typically, you can cancel your reservation online
            through the booking platform or by contacting the hotel directly. Make sure to check
            the cancellation deadline to avoid any fees or charges. If you have any difficulties,
            reach out to the hotel or booking platform's customer service for assistance.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
