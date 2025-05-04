import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  eventTitle: "",
  date: "",
  time: "",
  location: "",
  description: "",
  hostName: "",
};

const validationSchema = Yup.object({
  eventTitle: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  hostName: Yup.string().required("Required"),
});

const CreateEventForm = ({ action, onClose, initialValuesEdit, setRefresh }) => {
  const handleSubmit = async (values) => {
    setRefresh(false);
    try {
      if (action === "create") {
        const formattedDate = new Date(values.date).toISOString().split("T")[0];
        const response = await axios.post("/api/manage/event", {
          eventTitle: values.eventTitle,
          date: formattedDate,
          time: values.time,
          location: values.location,
          description: values.description,
          hostName: values.hostName,
        });

        console.log("Event created successfully:", response.data);
      } else if (action === "edit" && initialValuesEdit) {
        const formattedDate = new Date(values.date).toISOString().split("T")[0];

        const response = await axios.put(`/api/manage/event/${initialValuesEdit.id}`, {
          eventTitle: values.eventTitle,
          date: formattedDate,
          time: values.time,
          location: values.location,
          description: values.description,
          hostName: values.hostName,
        });

        console.log("Event updated successfully:", response.data);
      }
      onClose();
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else {
        console.error("Request error:", error.message);
      }
    }
    setRefresh(false); // Set refresh state before making the requests
  };

  return (
    <Formik
      initialValues={action === "create" ? initialValues : initialValuesEdit}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Box ml={2} mr={2}>
            <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>Event Title</Typography>
            <TextField
              fullWidth
              label='Event Title'
              name='eventTitle'
              value={values.eventTitle}
              onChange={handleChange}
              error={touched.eventTitle && Boolean(errors.eventTitle)}
              helperText={touched.eventTitle && errors.eventTitle}
              margin='normal'
            />

            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>Date</Typography>
                <TextField
                  fullWidth
                  type='date'
                  name='date'
                  value={action === "create" ? values.date : new Date(values.date).toISOString().split("T")[0]}
                  onChange={handleChange}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0], // Sets today's date as the minimum date
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>Time</Typography>
                <TextField
                  fullWidth
                  type='time'
                  name='time'
                  value={values.time}
                  onChange={handleChange}
                  error={touched.time && Boolean(errors.time)}
                  helperText={touched.time && errors.time}
                />
              </Grid>
            </Grid>
            <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }} mt={1}>
              Location
            </Typography>
            <TextField
              fullWidth
              label='Location'
              name='location'
              value={values.location}
              onChange={handleChange}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              margin='normal'
            />
            <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }} mt={1}>
              Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Description'
              name='description'
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              margin='normal'
            />
            <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }} mt={1}>
              HostName
            </Typography>
            <TextField
              fullWidth
              label='HostName'
              name='hostName'
              value={values.hostName}
              onChange={handleChange}
              error={touched.hostName && Boolean(errors.hostName)}
              helperText={touched.hostName && errors.hostName}
              margin='normal'
            />
            <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
              <Button type='button' variant='outlined' sx={{ textTransform: "none" }} onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary' sx={{ textTransform: "none" }}>
                {action === "create" ? "Create" : "Edit"}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEventForm;
