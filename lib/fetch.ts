const getUser = async (supabase: any) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);
  return user;
};

export { getUser };
