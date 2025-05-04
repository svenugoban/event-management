import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({
  isOpen,
  title,
  contentText,
  children,
  onClose, // ✅ Add this to handle the close action
  fullWidth = true,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={fullWidth}>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <DialogTitle>{title}</DialogTitle>
          <IconButton aria-label='close' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {contentText && <Typography sx={{ fontSize: "14px", mb: 2 }}>{contentText}</Typography>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
