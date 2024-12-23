import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to get cabins');
  }

  return data;
}

export async function createCabin(newCabin) {
  // create a name for the image and replace all '/' in it otherwise supabase will create folders
  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // /https://kyinodprqcyaolulourj.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  // Create a cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Unable to create a cabin');
  }

  // Upload image
  const { error: storageError, ...rest } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
      cacheControl: '3600',
      upsert: false,
    });

  console.log(storageError);
  console.log(rest);

  // Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, status } = await supabase.from('cabins').delete().eq('id', id);

  if (error || status !== 204) {
    console.error(error);
    throw new Error(`Unable to delete a cabin with id: ${id}`);
  }

  return true;
}
