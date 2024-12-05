type layoutProps = {
  children: React.ReactNode;
  recentPosts: React.ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return <>{children}</>;
};

export default layout;
