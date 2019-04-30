import "./formik-demo.css";
import React from "react";
import { render } from "react-dom";
import { Formik, Field } from "formik";
import Yup from "yup";
import classNames from "classnames";

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            });
          })}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  }
}

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

const App = () => (
  <div className="app">
    <h1>Welcome to the Gig Worker Aggregator Experience!</h1>
    <p>Please enter some information below to see how the app works and begin building your profile.</p>
    <Formik
      initialValues={{
        radioGroup: "",
        checkboxGroup: [],
        singleCheckbox: false,

      }}
      validationSchema={Yup.object().shape({
        radioGroup: Yup.string().required("An option is required"),
        checkboxGroup: Yup.array().required(
          "At least one checkbox is required"
        ),
        singleCheckbox: Yup.bool().oneOf([true], "Must agree to something"),

      })}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 500);
      }}
      render={({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <h2>Job List</h2>
          <p>Which gig jobs are you currently employed at?</p>
          <CheckboxGroup
            id="checkboxGroup"
            label='Select as many as needed. If none of your vehicles are listed, please select "Other"'
            value={values.checkboxGroup}
            error={errors.checkboxGroup}
            touched={touched.checkboxGroup}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          >
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="uber"
              label="Uber"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="lyft"
              label="Lyft"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="flex"
              label="Amazon Flex"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="ddash"
              label="DoorDash"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="ghub"
              label="GrubHub"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="ueats"
              label="UberEats"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="pmates"
              label="Postmates"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="other"
              label="Other"
            />
          </CheckboxGroup>
          <h2>Employment Status</h2>
          <p>Which option best describes you?</p>
          <RadioButtonGroup
            id="radioGroup"
            label="Describe what purpose gig jobs serve for you. Please select one option"
            value={values.radioGroup}
            error={errors.radioGroup}
            touched={touched.radioGroup}
          >
            <Field
              component={RadioButton}
              name="radioGroup"
              id="full"
              label="They are my main source of income"
            />
            <Field
              component={RadioButton}
              name="radioGroup"
              id="part"
              label="They make me extra money on the side"
            />
          </RadioButtonGroup>

        <h2>Weekly Hours</h2>
        <p>How many hours per week do you work at gig jobs?</p>
          <h2>Vehicles</h2>
          <p></p>
          <CheckboxGroup
            id="checkboxGroup"
            label='Select as many as needed. If none of your vehicles are listed, please select "Other"'
            value={values.checkboxGroup}
            error={errors.checkboxGroup}
            touched={touched.checkboxGroup}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          >
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="car"
              label="Car"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="bike"
              label="Bike"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="scoot"
              label="Scooter"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="moto"
              label="Motorcycle"
            />
            <Field
              component={Checkbox}
              name="checkboxGroup"
              id="other"
              label="Other"
            />
          </CheckboxGroup>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    />
  </div>
);

render(<App />, document.getElementById("root"));
