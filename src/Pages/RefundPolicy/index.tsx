import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation} from 'react-i18next';
import { getAllStaticPagesAction } from "../../redux/SuperAdminController/staticPages/middleware";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { staticPagesSelector } from "../../redux/SuperAdminController/staticPages/staticPagesSlice";

const RefundPolicy = () => {
  const {t}= useTranslation()
  const dispatch = useAppDispatch()
  const { staticPagesDetails } = useSelector(staticPagesSelector)
  const [refundPolicy, setRefundPolicy] = useState<string | any>()

  useEffect(() => {
    dispatch(getAllStaticPagesAction())
  }, [])
  useEffect(() => {
    console.log("stattic page data", staticPagesDetails);
    const updatedData = staticPagesDetails?.filter((item: any) => item?.title === "RefundPolicy")
    // const text= htmlToText(updatedData[0]?.description)
    console.log("updatedData[0]?.description",updatedData[0]?.description.toString(  ));
    setRefundPolicy(updatedData[0]?.description)

  }, [staticPagesDetails])
  useEffect(() => {
    console.log("privacyPolicy ", refundPolicy);

  })
  return (
    <WrapperComponent isHeader>
      <div style={{ padding: "40px" }} dangerouslySetInnerHTML={{__html:refundPolicy}}>
     
     </div>
    {/* <div>
     <img src={"././plastocurrentlogo.png"} style={{ height: "auto", width: "16%", marginLeft:"44%"}} />
      <br/>
      <br/>
      <Typography fontSize="20px" fontWeight="bolded">
      <b> Refund and Cancellation Policy</b>
      </Typography>
      <br/>
      <Typography sx={{marginLeft:"1%"}}>
        Amount once paid through the payment gateway shall not be refunded other than in the following circumstances:
      </Typography><br />
      <Typography>
        Multiple times debiting of Customer’s Card/Bank Account due to technical error OR Customer's account being debited with excess amount in a single transaction due to technical error. In such cases, excess amount excluding Payment Gateway charges would be refunded to the Customer.
      </Typography>
      <Typography>
        Due to technical error, payment being charged on the Customer’s
        Card/Bank Account but the enrolment for the examination is unsuccessful.
        However, if in such cases, Customer wishes to seek refund of the amount,
        he/she would be refunded net the amount, after deduction of Payment
        Gateway charges or any other charges.
      </Typography>
      <Typography sx={{marginLeft:"2%"}}>
        The Customer will have to make an application for refund along with the
        transaction number and original payment receipt if any generated at the
        time of making payments.
      </Typography>
      <br />
      <Typography sx={{marginLeft:"2%"}}>
        The application will be processed manually and after verification, if
        the claim is found valid, the amount received in excess will be refunded
        through electronic mode in favor of the applicant and confirmation sent
        to the mailing address given in the online registration form, within a
        period of 21 calendar days on receipt of such claim. It will take 3-21
        days for the money to show in your bank account depending on your bank’s
        policy.
      </Typography>
      <br />
      <Typography sx={{marginLeft:"2%"}}>
        Company assumes no responsibility and shall incur no liability if it is
        unable to affect any Payment Instruction(s) on the Payment Date owing to
        any one or more of the following circumstances:
      </Typography>
      <br />
      <Typography>
        If the Payment Instruction(s) issued by you is/are incomplete,
        inaccurate, and invalid and delayed.
        <Typography>
          If the Payment Account has insufficient funds/limits to cover for the
          amount as mentioned in the Payment Instruction(s){" "}
        </Typography>
        If the funds available in the Payment Account are under any encumbrance
        or charge.
        <Typography>
          If your Bank or the NCC refuses or delays honoring the Payment
          Instruction(s){" "}
          <Typography>
            Circumstances beyond the control of Company (including, but not
            limited to, fire, flood, natural disasters, bank strikes, power
            failure, systems failure like computer or telephone lines breakdown
            due to an unforeseeable cause or interference from an outside force)
           </Typography>
           <Typography>
           In case the payment is not effected for any reason, you will be intimated about the failed payment by an e-mail 
          </Typography>
        </Typography>
      </Typography>
      <Typography  sx={{marginLeft:"2%"}}>
      User agrees that Company, in its sole discretion, for any or no reason, and without penalty, may suspend or terminate his/her account (or any part thereof) or use of the Services and remove and discard all or any part of his/her account, user profile, or his/her recipient profile, at any time. Company may also in its sole discretion and at any time discontinue providing access to the Services, or any part thereof, with or without notice. User agrees that any termination of his /her access to the Services or any account he/she may have or portion thereof may be effected without prior notice, and also agrees that Company will not be liable to user or any third party for any such termination. Any suspected, fraudulent, abusive or illegal activity may be referred to appropriate law enforcement authorities. These remedies are in addition to any other remedies Company may have at law or in equity. Upon termination for any reason, user agrees to immediately stop using the Services.
      </Typography>
      <br/>
      <Typography  sx={{marginLeft:"2%"}}>
      Company may elect to resolve any dispute, controversy or claim arising out of or relating to this Agreement or Service provided in connection with this Agreement by binding arbitration in accordance with the provisions of the <b>Indian Arbitration & Conciliation Act, 1996.</b> Any such dispute, controversy or claim shall be arbitrated on an individual basis and shall not be consolidated in any arbitration with any claim or controversy of any other party.
      </Typography>
    </div> */}
    </WrapperComponent>
  );
};

export default RefundPolicy;
