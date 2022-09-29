const Comment = ({ comment }) => {
  return (
    <div className="w-fit shadow shadow-gray-200 bg-gray-50 rounded-md p-2 px-5">
      <div className="flex gap-2 items-end">
        <div className="h-8 w-8 border border-gray-300 rounded-full"></div>
        <p className="text-xs text-gray-800">@{comment.user}</p>
      </div>
      <p className="text-sm pt-2 max-w-xs sm:max-w-sm md:max-w-md">{comment.body}</p>
      <div className="pt-2">
      <span className="text-gray-400 mr-2 leading-none text-sm pr-3 inline-flex">
            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>{comment.likes.length}
          </span>
          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
            </svg>{comment.subComments.length}
          </span>
      </div>
    </div>
  );
};

export default Comment;
