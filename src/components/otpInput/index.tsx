import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

interface IOtp {
    setOtp: React.Dispatch<React.SetStateAction<any>>
    otp:any
}
const OtpInput: React.FC<IOtp> = ({setOtp,otp}) => {
    

    const handleChange = (newValue: any) => {
        setOtp(newValue)
    }
    const handleComplete = (finalValue: string) => {
        fetch('...')
    }

    return (
        <MuiOtpInput
            value={otp}
            onChange={handleChange}
            onComplete={handleComplete}
            length={6}
            autoFocus
            validateChar={(character: string, index: number) => true} />
    )
}
export default OtpInput