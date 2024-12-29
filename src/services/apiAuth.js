import supabase, { supabaseUrl } from './supabase';

export async function signup({ email, password, full_name }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return null;
  }

  const { data: authData, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  console.log(authData);

  return authData?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, full_name, avatar }) {
  // 1. Update password OR full name - usually only one of these will be passed
  let updateData;

  if (password) {
    updateData = { password };
  }

  if (full_name) {
    updateData = { data: { full_name } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) {
    return data;
  }

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Date.now()}`;

  const { error: uploadAvatarError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (uploadAvatarError) {
    throw new Error(uploadAvatarError.message);
  }

  // 3. Update user's avatar
  const { data: updatedAvatarUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateAvatarError) {
    throw new Error(updateAvatarError.message);
  }

  return updatedAvatarUser;
}
