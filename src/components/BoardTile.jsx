import React, { useState, useEffect } from 'react'; // Import useEffect
import { Heart, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// Assume this utility function exists, or you need to implement it
import { updateBoardLikeStatus, getBoardLikeStatus, updateBoardTrashedStatus, deleteBoardPrmnt  } from "@/lib/Boards";
import { addListItem, boardDateTime } from '../lib/BoardPageLib';
import { useAppContext } from '@/Contexts/AppContext';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





export const BoardTile = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    const { setBoards, boards } = useAppContext();
    const location = useLocation()
    // Function to toggle the liked state and update in IndexedDB
    const toggleLike = async () => {
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);
        // Update the like status in IndexedDB for the current board
        await updateBoardLikeStatus(props.id, newLikeStatus);
    };

    // Optionally, load the initial like status from IndexedDB when the component mounts
    useEffect(() => {
        const loadLikeStatus = async () => {
            // Assume getBoardLikeStatus is a function to fetch the like status from IndexedDB
            const likeStatus = await getBoardLikeStatus(props.id);
            
            setIsLiked(likeStatus);
        };
        loadLikeStatus();
        
    }, [props.id]);
    const handlePrmntDeleteBoard = async () => {
        if(location.pathname == '/trash')
        {
            
           await deleteBoardPrmnt(props.id);
            
            
        } else {
            await updateBoardTrashedStatus(props.id, true);
            const updatedBoards = boards.filter(board => board.id !== props.id);
            setBoards(updatedBoards);
            window.location.reload()
        }
        
    }
    return (
        <div className="bg-gray-200 dark:bg-card border rounded p-4">
            <div className='flex justify-between'>
                <Link to={"/board/"+ props.id}>
                <h2 className='font-semibold text-lg'>{props.title}</h2>
                </Link>
                <div className='flex'>
                    <Button variant="ghost" size="icon" onClick={toggleLike}>
                        {
                            isLiked ? <Heart fill='#f43f5e' color='#f43f5e' strokeWidth={4} size={20} />
                                : <Heart size={20} />
                        }
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Trash className='text-red-400' size={20} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action can be undone. The board will be added to trash and can be restored later.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handlePrmntDeleteBoard()}>Sure</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <p className='text-sm text-zinc-500'>{boardDateTime(props.id)}</p>
            
        </div>
    );
}