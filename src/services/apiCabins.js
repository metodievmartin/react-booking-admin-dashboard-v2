import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to get cabins');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // create a name for the image and replace all '/' in it otherwise supabase will create folders
  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  // Create a cabin if no ID is passed - it means it's editing mode
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  console.log('query data: ', data);

  if (error) {
    console.error(error);
    throw new Error('Unable to create a cabin');
  }

  // do proceed with uploading if the image already has a path - it means it's already uploaded
  if (hasImagePath) {
    return data;
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
