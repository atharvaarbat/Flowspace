import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/Contexts/AppContext';
import LoadingIndicator from '@/components/Loader'; // Import the loading component
import { saveBoardData, loadBoardData } from '../lib/Boards';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-toastify';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { BoardTile } from '@/components/BoardTile';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';


const Home = () => {

    const { setBoards } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [localBoards, setLocalBoards] = useState([]); // Local state to hold boards

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const boards = await loadBoardData();
                setLocalBoards(boards); // Update local state with fetched boards
                setBoards(boards); // Update global state, if you're using it
                setLoading(false);
            } catch (error) {
                console.error("Failed to load boards:", error);
                setLoading(false);
            }
        };

        fetchBoards();
    }, [setBoards]);

    if (loading) {
        return <LoadingIndicator />; // Or any loading indicator
    }
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-4">
                    <div className='flex justify-between'>
                        <h1 className="text-2xl font-bold mb-4">Trashed Boards</h1>
                        <NewBoardBtn />
                    </div>

                    {loading ? (
                        <LoadingIndicator /> // Use the LoadingIndicator component
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                            {localBoards.map((board) => {

                                if (board.trashed) {
                                    
                                    return (
                                        <div key={board.id} className="">


                                            <BoardTile title={board.title} id={board.id} liked={board.liked} />

                                        </div>
                                    )

                                }

                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Home;





const NewBoardBtn = () => {
    const navigate = useNavigate();
    const { boards, setBoards } = useAppContext();
    const [boardName, setBoardName] = useState('');
    const handleAddBoard = async (e) => {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        if (!boardName) {
            toast.error('A board name is must! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "dark",

            });
            return;
        }
        const newBoard = {
            id: Date.now().toString(), // Simple unique ID generation
            title: boardName,
            lists: [
                { listTitle: 'To Do', listData: [] },
                { listTitle: 'On Going', listData: [] },
                { listTitle: 'Completed', listData: [] }
            ],
        }
        await saveBoardData(newBoard); // Save the new board
        const updatedBoards = [...boards, newBoard]; // Add the new board to the current list
        setBoards(updatedBoards); // Update the context (or local state if not using context)
        setBoardName(''); // Reset the input field after saving
        navigate(`/board/${newBoard.id}`); // Navigate to the new board
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" > <PlusIcon className='w-5 h-5 mr-2' /> New Board </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new board 📃</DialogTitle>
                    <DialogDescription>
                        Enter the name of the new board and click Add.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddBoard}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" className="col-span-3" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit">Add Board</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}