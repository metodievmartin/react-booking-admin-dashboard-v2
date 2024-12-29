import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

const SignupForm = () => {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmitHandler(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow label="Full name" error={errors?.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          {...register('full_name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please provide a valid email',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.password_confirm?.message}
      >
        <Input
          type="password"
          id="password_confirm"
          {...register('password_confirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues()['password'] || 'Passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
