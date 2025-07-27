import { MessageCircle, Send } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./Drawer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Comment } from "./Comments";
import { useCommentStore } from "@/store/CommentStore";
import { useCreateComments, useGetComments } from "@/queries/comment.queries";
import { getUser } from "@/store/AuthStore";

// Main Comment Section Component
const CommentSection = ({
  isOpen,
  setIsOpen,
  selectedVideoId,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedVideoId: string;
}) => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState();

  const user = getUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  // create Comments
  const CreateComment = useCreateComments(
    selectedVideoId,
    user ? user.username : "ME"
  );

  // get Comments
  const getComments = useGetComments(selectedVideoId, { enabled: isOpen });

  useEffect(() => {
    getComments.isSuccess && console.log("coments", getComments.data);
  }, [getComments.isSuccess]);

  useEffect(() => {
    if (getComments.isSuccess) {
      setComments(getComments.data);
    }
  }, [getComments.isSuccess]);

  const handleAddComment = () => {
    console.log(selectedVideoId);
    if (newComment.trim()) {
      CreateComment.mutateAsync({
        content: newComment.trim(),
      });

      // const comment = {
      //   id: comments.length + 1,
      //   username: "you",
      //   avatar:
      //     "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      //   text: newComment.trim(),
      //   timestamp: new Date(),
      //   likes: 0,
      //   isLiked: false,
      // };
      // setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleLike = (commentId, isLiked) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked,
              likes: isLiked ? comment.likes + 1 : comment.likes - 1,
            }
          : comment
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  if (getComments.isPending) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
          </DrawerHeader>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Getting comments</p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
    //   {/* Trigger Button */}
    //   <button
    //     onClick={() => setIsOpen(true)}
    //     className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
    //   >
    //     <MessageCircle className="w-5 h-5 text-gray-600" />
    //     <span className="font-medium text-gray-700">{comments.length} Comments</span>
    //   </button>

    //   {/* Comment Drawer */}
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {getComments && getComments.data?.length} Comments
          </DrawerTitle>
        </DrawerHeader>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6">
          {getComments &&
            getComments?.data?.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onLike={handleLike}
                onReply={() => console.log("Reply to", comment.username)}
              />
            ))}

          {getComments && getComments.data?.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-end space-x-3">
            <div className="w-8 h-8 border-2 border-white rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white font-bold text-md">
              {user && user.username[0]}
            </div>
            {/* <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover"
            /> */}
            <div className="flex-1 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 bg-gray-50 text-[16px] rounded-2xl border-0 resize-none text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                rows="1"
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`p-3 rounded-full transition-all ${
                newComment.trim()
                  ? "bg-primary text-white hover:bg-primary transform hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
    // {/* </div> */}
  );
};

export default CommentSection;
