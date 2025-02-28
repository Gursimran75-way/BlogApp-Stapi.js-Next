'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>Blog Platform</Typography>
                <Link href="/"><Button color="warning">Home</Button></Link>
                {user ? (
                    <>
                        <Link  href="/my-blogs"><Button   color="warning">My Blogs</Button></Link>
                        <Link href="/create-blog"><Button color="warning">Create Blog</Button></Link>
                        <Button color="warning" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Link href="/login"><Button color="warning">Login</Button></Link>
                        <Link href="/signup"><Button color="warning">Signup</Button></Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}