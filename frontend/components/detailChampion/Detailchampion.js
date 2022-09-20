import { useRouter } from "next/router";

export default function DetailChampion() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
}
