import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation} from 'react-i18next';


export default function BasicAccordion() {
  const {t} = useTranslation()
  return (
    <WrapperComponent isHeader>
      <div>
        <Typography textAlign="left" width="95%" fontSize="30px">{t('Faq.heading')}</Typography>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{t('Faq.question1')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer1')}
              {/* It is simply a platform for the plastic allied industries. Plastic
              allied industries are able to exhibit their products. It is just a
              B2B platform to provide and exhibit themselves. It is a subscription
              base platform(Rs 5100 +GST) for 1 year. No hidden or extra charges
              to put your products on this platform. */}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{t('Faq.question2')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer2')}
              {/* Step 1: Go to login page Step 2: Click on sign up Step 3: Free login
              1) Enter personal information and create login step 4: Company login
              1) Enter personal information 2) Enter company information 3) Pay
              the amount Rs.5100 + GST 4) Your company login will successfully
              added. */}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{t('Faq.question3')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer3')}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{t('Faq.question4')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer4')}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{t('Faq.question5')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer5')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{t('Faq.question6')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer6')}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{t('Faq.question7')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t('Faq.answer7')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </WrapperComponent>

  );
}
