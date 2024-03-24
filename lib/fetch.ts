const getUser = async (supabase: any) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export { getUser };
