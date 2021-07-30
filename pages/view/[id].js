import { useRouter } from 'next/router';
import tourApi from '../../src/service/tour-api';

const View = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(data);

  return <p>View: {id}</p>;
};

export async function getServerSideProps(context) {
  const data = await tourApi.getItem(context.params.id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data },
  };
}

export default View;
