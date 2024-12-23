import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FormRow } from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;
  // console.log('error', errors);
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          {...register('max_capacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Max capacity must be at least 1',
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register('regular_price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price must be at least 1',
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regular_price ||
              'Discount cannot be greater than the price',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput id="image" accept="image/*" disabled={isCreating} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
