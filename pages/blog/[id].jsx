import { db, auth, storage, provider } from "../../config/fire-config";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { Typography, Box } from "@mui/material";
const Blog = (props) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        {props.title}
      </Typography>
      <Typography variant="h6">{props.content}</Typography>
      <Link href="/">Back</Link>
    </Box>
  );
};
export const getServerSideProps = async ({ query }) => {
  const content = {};
  const docRef = doc(db, "blog", `${query.id}`);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      content["title"] = docSnap.data().title;
      content["content"] = docSnap.data().content;
    } else {
      alert("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      title: content.title,
      content: content.content,
      id: query.id,
    },
  };
};
export default Blog;
