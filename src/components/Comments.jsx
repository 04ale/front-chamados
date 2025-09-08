import { User, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function Comments({ closeComments, ticketId, ticketInfo }) {
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const [body, setBody] = useState("");
  const formRef = useRef(null);
  const { user } = useAuth();

  async function getComments() {
    const res = await api.get(`/tickets/${ticketId}/comments`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setComments(res.data.comments);
  }

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createComment() {
    await api.post(
      `/tickets/${ticketId}/comments`,
      {
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setBody("");
    getComments();
  }

  useEffect(() => {
    if (openComments && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openComments]);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center">
      <X
        onClick={closeComments}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:w-[900px] max-h-[70vh] overflow-auto text-[#5A2C40] bg-[#FFFBF5] rounded-lg p-6">
        <div className="flex flex-col gap-10 items-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-2xl font-semibold">Comentários</h1>
            </div>
            <ul className="flex flex-col gap-4">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div className="flex flex-col md:gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      <User />
                      <h1 className="text-xl font-semibold">
                        {comment.author.name}:
                      </h1>
                    </div>

                    <p className="text-lg break-words">{comment.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="bg-[#5A2C40] hover:bg-[#8B4571] w-[200px] py-3 rounded-lg text-white font-semibold cursor-pointer"
            onClick={() => setOpenComments(true)}
          >
            Novo comentário
          </button>
          {openComments && (
            <form
              ref={formRef}
              onSubmit={createComment}
              className="w-full flex flex-col items-center gap-4"
            >
              <div className="flex flex-col w-full items-center">
                <p className="text-xl font-semibold">Criar novo comentário</p>
                <textarea
                  type="text"
                  className="bg-[#5A2C40]/80 text-white text-lg rounded-lg w-full p-3"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <button
                className="bg-[#5A2C40] hover:bg-[#8B4571] w-[200px] py-3 rounded-lg text-white font-semibold cursor-pointer"
                type="submit"
              >
                Criar comentário
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
