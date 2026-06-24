import { Button, Grid, TextField } from "@mui/material";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
} from "formik";
import React from "react";

// ✅ Define form type
interface FormValues {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumbers: string[];
}

export default function FormikFieldArray() {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phoneNumbers: [""],
  };

  // ✅ Typed email validation
  const validateEmail = (value: string): string | undefined => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address";
    return undefined;
  };

  // ✅ Typed validate function
  const validateField = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {};

    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.fullName) errors.fullName = "Full name is required";

    return errors;
  };

  // ✅ Typed submit
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validate={validateField}
      onSubmit={handleSubmit}
      validateOnMount={false}
    >
      {(formik) => (
        <Form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {/* First Name */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                fullWidth
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                helperText={
                  formik.touched.firstName && formik.errors.firstName
                }
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                fullWidth
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                helperText={
                  formik.touched.lastName && formik.errors.lastName
                }
              />
            </Grid>

            {/* Full Name */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="fullName"
                label="Full Name"
                fullWidth
                error={Boolean(
                  formik.touched.fullName && formik.errors.fullName
                )}
                helperText={
                  formik.touched.fullName && formik.errors.fullName
                }
              />
            </Grid>

            {/* Email */}
            <Grid item xs={6}>
              <Field name="email">
                {({field, meta}: {field: any; meta: any}) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Grid>

            {/* Phone Numbers */}
            <Grid item xs={12}>
              <FieldArray name="phoneNumbers">
                {({ push, remove }) => (
                  <>
                    {formik.values.phoneNumbers.map((phone, index) => (
                      <div key={index} style={{ marginBottom: 10 }}>
                        <TextField
                          label="Phone Number"
                          value={phone}
                          fullWidth
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            formik.setFieldValue(
                              `phoneNumbers[${index}]`,
                              e.target.value
                            )
                          }
                        />

                        {formik.values.phoneNumbers.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      disabled={formik.values.phoneNumbers.length === 3}
                      onClick={() => push("")}
                    >
                      Add Phone Number
                    </Button>
                  </>
                )}
              </FieldArray>
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}