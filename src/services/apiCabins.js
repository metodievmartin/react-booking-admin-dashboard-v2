import supabase from './supabase.js';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Unable to get cabins');
  }

  return data;
}
