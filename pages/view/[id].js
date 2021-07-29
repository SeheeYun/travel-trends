const View = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>View: {pid}</p>;
};

export default View;
