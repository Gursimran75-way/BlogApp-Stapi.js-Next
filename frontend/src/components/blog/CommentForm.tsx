'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { postComment } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface CommentFormProps {
    blogId: number;
}

export default function CommentForm({ blogId }: CommentFormProps) {
    const [author, setAuthor] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postComment(
                { author, content, blog: blogId,},
                token
            );
            alert('Comment submitted for approval!');
            setAuthor('');
            setEmail('');
            setContent('');
        } catch (error) {
            alert('Failed to submit comment');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box component="form" onSubmit={handleSubmit} mt={2}>
                <TextField
                    label="Your Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Your Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Your Comment"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit Comment
                </Button>
            </Box>
        </motion.div>
    );
}