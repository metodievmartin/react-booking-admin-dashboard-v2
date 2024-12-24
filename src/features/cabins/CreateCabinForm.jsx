import { useForm } from 'react-hook-form';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isLoading = isCreating || isEditing;

  const onSubmit = async (data) => {
    console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    }
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
