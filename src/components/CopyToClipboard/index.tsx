import React, { useState } from 'react';
import { Button } from "@mui/material"
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from "@mui/material/Tooltip"

const CopyToClipboardButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        // Select the text in the input element
        tempInput.select();
        document.execCommand('copy');
        // Remove the temporary input element
        document.body.removeChild(tempInput);
        // Update state to indicate that the text has been copied
        setCopied(true);
        // Reset the copied state after a short delay (optional)
        setTimeout(() => {
            setCopied(false);
        }, 2500);
    };
    return (
        <div>
            <Tooltip title="Copy to Clipboard">
                <Button onClick={copyToClipboard}>www.plastodeal.com</Button>
            </Tooltip>
            {copied && <span style={{ color: "green", display: "flex", alignItems: "center", justifyContent: "center" }}><DoneIcon />  Copied to clipboard!</span>}

        </div>
    );
};
export default CopyToClipboardButton;