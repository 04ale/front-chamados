import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import ImageWithLoader from "@/components/ImageWithLoader";
import SeeMore from "../SeeMore";

function CommentItem({ comment, currentUser }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const listRef = ref(storage, `/tickets/comments/${comment.id}`);

    listAll(listRef)
      .then((res) => {
        const imagePromises = res.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );
        Promise.all(imagePromises).then((urls) => {
          setImageUrls(urls);
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar imagens do comentário: ", error);
      });
  }, [comment.id]);

  const date = new Date(comment.created_at);
  const finalDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const isCurrentUser = currentUser.name === comment.author.name;

  return (
    <li
      className={`flex w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className="flex flex-col max-w-[80%] rounded-xl shadow-md p-3"
        style={{
          backgroundColor: isCurrentUser ? "#8B45711A" : "#fffdfa",
          border: "1px solid #dddddd",
        }}
      >
        <div
          className={`flex items-center gap-2 mb-1 text-sm text-gray-600 ${
            isCurrentUser ? "justify-end" : "justify-start"
          }`}
          style={{ color: "#5A2C40" }}
        >
          {!isCurrentUser && <User size={16} />}
          <span className="font-semibold">{comment.author.name}</span>
          <span className="text-xs">{finalDate}</span>
          {isCurrentUser && <User size={16} />}
        </div>

        <SeeMore>{comment.body}</SeeMore>
        <div className="mt-2 flex gap-2 flex-wrap">
          {imageUrls.map((image, index) => (
            <Link
              to={`/photo?url=${encodeURIComponent(image)}`}
              target="_blank"
              key={index}
              rel="noopener noreferrer"
            >
              <ImageWithLoader
                src={image}
                className="border border-gray-300 rounded-md space-x-1 w-20 h-20"
              />
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
