import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';
import { Send, ThumbsUp, MessageSquare, CornerRightDown, Trash2, Edit3, X, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';

const Commentar = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const [pinnedComment, setPinnedComment] = useState(null);
    const replyInputRef = useRef(null);

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .select('*')
                .eq('is_pinned', false)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
            } else {
                setComments(data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchPinnedComment = async () => {
        try {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .select('*')
                .eq('is_pinned', true)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
                console.error('Error fetching pinned comment:', error);
            } else {
                setPinnedComment(data);
            }
        } catch (error) {
            console.error('Error fetching pinned comment:', error);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchPinnedComment();

        const channel = supabase.channel('realtime comments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_comments' }, payload => {
                fetchComments();
                fetchPinnedComment();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '' || comment.trim() === '') {
            Swal.fire('Oops...', 'Name and comment cannot be empty!', 'error');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .insert([{ name, content: comment }]);

            if (error) {
                console.error('Error posting comment:', error);
                Swal.fire('Error!', 'Something went wrong while posting your comment.', 'error');
            } else {
                setName('');
                setComment('');
                Swal.fire('Success!', 'Your comment has been posted.', 'success');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleReplySubmit = async (parentId) => {
        if (replyContent.trim() === '') return;

        try {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .insert([{ name: 'Reply', content: replyContent, parent_id: parentId }]);

            if (error) {
                console.error('Error posting reply:', error);
            } else {
                setReplyTo(null);
                setReplyContent('');
            }
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    const handleLike = async (id, currentLikes) => {
        try {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .update({ likes: currentLikes + 1 })
                .eq('id', id);

            if (error) {
                console.error('Error liking comment:', error);
            }
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data, error } = await supabase
                        .from('portfolio_comments')
                        .delete()
                        .eq('id', id);

                    if (error) {
                        console.error('Error deleting comment:', error);
                        Swal.fire('Error!', 'Something went wrong while deleting your comment.', 'error');
                    } else {
                        Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
                    }
                } catch (error) {
                    console.error('Error deleting comment:', error);
                }
            }
        });
    };

    const handleEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    };

    const handleUpdate = async (id) => {
        if (editingContent.trim() === '') return;

        try {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .update({ content: editingContent })
                .eq('id', id);

            if (error) {
                console.error('Error updating comment:', error);
            } else {
                setEditingCommentId(null);
                setEditingContent('');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const renderComment = (comment, isReply = false) => (
        <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-8' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0"></div>
            <div className="flex-grow">
                <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">{comment.name}</span>
                        <span className="text-xs text-slate-400">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                    </div>
                    {editingCommentId === comment.id ? (
                        <div className="flex mt-2">
                            <input
                                type="text"
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                className="w-full bg-slate-700 text-white rounded-l-md px-2 py-1"
                            />
                            <button onClick={() => handleUpdate(comment.id)} className="bg-green-500 px-2 rounded-r-md"><Check size={16} /></button>
                            <button onClick={() => setEditingCommentId(null)} className="bg-red-500 px-2 ml-1 rounded-md"><X size={16} /></button>
                        </div>
                    ) : (
                        <p className="text-slate-300 mt-1">{comment.content}</p>
                    )}
                </div>
                <div className="flex gap-4 items-center mt-2 text-xs text-slate-400">
                    <button onClick={() => handleLike(comment.id, comment.likes)} className="flex items-center gap-1 hover:text-white">
                        <ThumbsUp size={14} /> {comment.likes}
                    </button>
                    <button onClick={() => { setReplyTo(comment.id); setTimeout(() => replyInputRef.current?.focus(), 0); }} className="flex items-center gap-1 hover:text-white">
                        <MessageSquare size={14} /> Reply
                    </button>
                    <button onClick={() => handleEdit(comment)} className="flex items-center gap-1 hover:text-white">
                        <Edit3 size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(comment.id)} className="flex items-center gap-1 hover:text-white text-red-500">
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
                {replyTo === comment.id && (
                    <div className="mt-2 flex">
                        <input
                            ref={replyInputRef}
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full bg-slate-700 text-white rounded-l-md px-3 py-2"
                        />
                        <button onClick={() => handleReplySubmit(comment.id)} className="bg-purple-600 px-4 rounded-r-md">
                            <Send size={18} />
                        </button>
                    </div>
                )}
                <div className="mt-3 space-y-3">
                    {comments.filter(c => c.parent_id === comment.id).map(reply => renderComment(reply, true))}
                </div>
            </div>
        </div>
    );
    
    return (
        <div className="w-full mx-auto p-6 rounded-lg shadow-lg" id="comment">
            <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">Leave a Comment</h2>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-800/50 text-white rounded-md px-4 py-2 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <textarea
                        placeholder="Your Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-slate-800/50 text-white rounded-md px-4 py-2 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:outline-none h-24"
                    />
                </div>
                <button type="submit" className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity">
                    Post Comment
                </button>
            </form>

            <div className="space-y-4">
                {pinnedComment && renderComment(pinnedComment)}
                {comments.filter(c => !c.parent_id && !c.is_pinned).map(comment => renderComment(comment))}
            </div>
        </div>
    );
};

export default Commentar;