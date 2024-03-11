import { getBoardDetails } from '@/lib/BoardPageLib';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addBoardList, getBoardLists } from '../../lib/BoardPageLib';
import { Button } from "@/components/ui/button"
import ListComponent from './BoardList';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function Board({ params }) {
    const { id } = useParams();
    const [boardData, setBoardData] = useState({ lists: [] })
    const [boardLists, setBoardLists] = useState([])
    useEffect(() => {
        const initBoard = async () => {

            setBoardData(await getBoardDetails(id))
            setBoardLists(await getBoardLists(id))
        }
        initBoard()
    }, [])


    return (
        <div className='flex h-full w-[100vw]'>
            <Sidebar />
            <div className="flex flex-col sm:w-[80vw] ">
                <Navbar />
                <Header boardData={boardData} boardId={id} />

                <div className="py-4 px-2 flex gap-2 overflow-auto flex-1">

                    {
                        boardLists.map((list, index) => {
                            return <ListComponent
                                key={index}
                                listData={list} index={index} boardId={id} />
                        })

                    }

                </div>

            </div>

        </div>
    );
}

export default Board;

import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const Header = (props) => {
    const [listTitle, setListTitle] = useState('To Do')
    const handleAddList = () => {
        if(listTitle !== ''){
            const newList = { listTitle: listTitle, listData: [] }
            addBoardList(props.boardId, newList)
        }else{
            toast.error('A list title is required')
        }
        
    }
    return (
        <header className="flex items-center justify-between p-2">
            <h1 className="text-xl font-bold  p-2 px-4 ">{props.boardData.title}</h1>
            <div className='flex gap-2 items-center px-8'>

                <Dialog>
                    <DialogTrigger asChild>
                    <Button> <Plus className='mr-2' /> Add List</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add List</DialogTitle>
                            
                        </DialogHeader>
                        <form>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue="To Do"
                                    className="col-span-3"
                                    onChange={(e)=>{setListTitle(e.target.value)}}
                                />
                            </div>
                            
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => handleAddList()}>Save changes</Button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>


        </header>
    )
}

