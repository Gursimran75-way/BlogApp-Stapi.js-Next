import { Typography, Box } from '@mui/material';
import { Comment } from '@/lib/types';

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    console.log('Comments received:', comments);

    return (
        <Box mt={2}>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Box key={comment.id} mb={2} pb={1} sx={{ borderBottom: '1px solid #eee' }}>
                        <Typography>{comment.content}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            By {comment.author || 'Anonymous'}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography>No comments available.</Typography>
            )}
        </Box>
    );
}