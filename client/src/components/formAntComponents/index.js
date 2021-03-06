/* Workaround to allow antd form components work with redux-form
- formItemLayout: adjust size of form according to display resolutions
- tailFormLayout: adjust size of form according to display resolutions

*/

import React from 'react';
import { Form, Input, Radio, Select, Checkbox, DatePicker } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};

const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

export const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  return errors;
};

export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);

// EXAMPLES
/*

<Form onSubmit={handleSubmit}>
      <Field label="First Name" name="firstName" component={AInput} placeholder="First Name" hasFeedback />

      <Field label="Last Name" name="lastName" component={AInput} placeholder="Last Name" />

      <Field label="Email" name="email" component={AInput} type="email" placeholder="Email" />

      <Field label="Sex" name="sex" component={ARadioGroup} value="male">
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
      </Field>

      <Field label="Favoraite Color" name="favoriteColor" component={ASelect}>
        <Option value="ff0000">Red</Option>
        <Option value="00ff00">Green</Option>
        <Option value="0000ff">Blue</Option>
      </Field>

      <Field label="Employed" name="employed" id="employed" component={ACheckbox} type="checkbox" />

      <Field
        label="Filter dates"
        name="rangepicker"
        component={ARangePicker}
        placeholder={["From", "To"]}
        hasFeedback
        onFocus={e => e.preventDefault()}
        onBlur={e => e.preventDefault()}
      />

      <Field label="Notes" name="notes" component={ATextarea} />

      <FormItem {...tailFormItemLayout}>
        <Button type="primary" disabled={pristine || submitting} htmlType="submit" style={{ marginRight: "10px" }}>
          Submit
        </Button>

        <Button disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </FormItem>
    </Form>

*/
