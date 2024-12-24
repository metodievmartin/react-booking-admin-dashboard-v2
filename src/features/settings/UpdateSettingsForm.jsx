import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings;

  const { isUpdating, updateSetting } = useUpdateSetting();

  const handleUpdate = (e, settingID) => {
    const { value } = e.target;

    if (!value) {
      return;
    }

    updateSetting({ [settingID]: value });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min_booking_length"
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, 'min_booking_length')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max_booking_length"
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, 'max_booking_length')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max_guests_per_booking"
          defaultValue={max_guests_per_booking}
          onBlur={(e) => handleUpdate(e, 'max_guests_per_booking')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast_price"
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, 'breakfast_price')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
