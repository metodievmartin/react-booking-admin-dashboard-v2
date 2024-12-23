import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to get cabins');
  }

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Unable to create a cabin');
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
