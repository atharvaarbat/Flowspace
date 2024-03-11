import { addListItem, getBoardList, getBoardLists, deleteBoardListItem, deleteBoardList } from '../../lib/BoardPageLib';
import { toast } from 'react-toastify';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, LayoutDashboard, MoreHorizontal, PlusIcon, Trash } from 'lucide-react';
import { useState } from 'react';

const ListComponent = (props) => {
    const listIndex = props.index
    const [isRenaming, setIsRenaming] = useState(false)
    const handelDeleteList = () => {
        deleteBoardList(props.boardId, listIndex)
    }
    return (
        <div className='border p-2 rounded max-w-[350px] h-fit '>

            <div className='p-2 flex gap-2 items-center'>
                <LayoutDashboard size={20} />
                <CardTitle className='text-lg'>
                    {props.listData.listTitle}
                </CardTitle>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='ml-auto' >
                            <MoreHorizontal size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuItem  onClick={() => handelDeleteList()}>

                            <span>Delete List</span>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <Card className="border-0">

                <CardContent className='p-2 '>
                    <AddListItemBtn boardId={props.boardId} listIndex={listIndex} />
                    <div className='flex flex-col gap-1'>
                        {props.listData.listData.map((item, index) => {
                            if (item.type == 'text') {
                                return <TextListItem content={item.content} key={index} listIndex={listIndex} index={index} boardId={props.boardId} />
                            } else if (item.type == 'youtube') {
                                return <YoutubeListItem content={item.content} key={index} listIndex={listIndex} index={index} boardId={props.boardId} />
                            }

                        })

                        }
                    </div>


                </CardContent>

            </Card>
        </div>
    )
}

export default ListComponent



const TextListItem = (props) => {
    const handelDeleteItem = () => {
        deleteBoardListItem(props.boardId, props.listIndex, props.index);
    }
    return (
        <div className='pl-2 flex items-center gap-2 hover:dark:bg-zinc-900 border hover:bg-gray-100 rounded-lg'>
            <p className='w-full'>{props.content}</p>
            <Button variant='ghost' size='icon' className='ml-auto ' onClick={() => { handelDeleteItem() }}>
                <Trash size={20} />
            </Button>
        </div>
    )
}
const YoutubeListItem = (props) => {
    const link = props.content
    const vdoId = link.split('watch?v=')[1]

    const handelDeleteItem = () => {
        deleteBoardListItem(props.boardId, props.listIndex, props.index);
    }
    return (
        <div className='p-2 flex items-center gap-2 hover:dark:bg-zinc-900 border hover:bg-gray-100 rounded-lg relative'>
            <div className='rounded-lg overflow-hidden'>
                <iframe src={"https://www.youtube.com/embed/" + vdoId}
                    title="YouTube video player"

                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                >

                </iframe>

            </div>
            <Button variant='ghost' size='icon' className='ml-auto absolute right-2 top-2' onClick={() => handelDeleteItem()}>
                <Trash size={20} />
            </Button>


        </div>
    )
}

const AddListItemBtn = (props) => {
    const boardId = props.boardId;
    const listIndex = props.listIndex;
    const [listData, setListData] = useState({ listTitle: 's' })
    const AddListInit = async () => {
        //setListData( await getBoardList(boardId, listIndex))

    }
    AddListInit()
    const [newItemData, setNewItemData] = useState({ type: 'text', content: '' })
    const handelAddListItem = () => {
        if (newItemData.content != '') {
            addListItem(boardId, listIndex, newItemData.type, newItemData.content)
        } else {
            toast.error('Please enter a valid content')
        }
    }

    //addListItem(props.boardId, listIndex, "text", "Appended List Text")
    return (

        <Dialog>
            <DialogTrigger asChild>

                <Button variant='ghost' className='w-full flex gap-2 my-1'><PlusIcon size={20} />
                    Add a new card</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a card to to {listData.listTitle} </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Type
                        </Label>
                        <Select onValueChange={(value) => setNewItemData({ ...newItemData, type: value })}>
                            <SelectTrigger className="w-[180px]" >
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="youtube">Youtube</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Content/URL
                        </Label>
                        <Input
                            id="username"
                            defaultValue=""
                            className="col-span-3"
                            onChange={(e) => setNewItemData({ ...newItemData, content: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => {
                        handelAddListItem()
                    }}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}