import Typography from '@mui/material/Typography';
import withRouter from '@fuse/core/withRouter';
import {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {lighten} from '@mui/material/styles';

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Backdrop, CircularProgress, Drawer} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import UseFetchUrl from "../../util/UseFetchUrl";
import netConfig from "../../util/netConfig";
import {showMessage} from "app/store/fuse/messageSlice";

function ParamsPageDrawer(props) {
    const {folder, folderSetter, width} = props
    const [anchor, setAnchor] = useState(folder);
    const [newFolder, setNewFolder] = useState(null);
    const [data, setData] = useState(null);

    async function getData() {
        const d = await UseFetchUrl("/api/config/sub", "PATCH", {configId: anchor})
        console.log(d)
        if (d.code !== netConfig.okStatus) {
            dispatch(
                showMessage({
                    message: d.message,
                    autoHideDuration: 6000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    },
                    variant: 'error'
                }))
        } else {
            setData(d.resultData)
        }
        console.log(d)
    }

    useEffect(() => {
        getData()
    }, []);

    return !data ? (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={!data}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    ) : (
        <div className="w-11/12 table-responsive mt-24" id='drawer-container'>
            <Drawer
                anchor='right'
                open={anchor}
                onClose={() => {
                    folderSetter(null)
                    setAnchor(false)
                }}
                PaperProps={{style: {position: 'absolute', width: `${width - 5}%`}}}
                BackdropProps={{
                    style: {
                        position: 'absolute',
                        backgroundColor: (theme) => lighten(theme.palette.primary.dark, 0.04)
                    }
                }}
                ModalProps={{
                    container: document.getElementById('drawer-container'),
                    style: {position: 'absolute'}
                }}
            >
                <Table className="simple w-full m-20">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" width={1} onClick={() => {
                                folderSetter(null)
                                setAnchor(false)
                            }}>
                                <FuseSvgIcon className="text-48" size={24}
                                             color="action">material-twotone:arrow_forward_ios</FuseSvgIcon>
                            </TableCell>
                            <TableCell colSpan={2}>
                                <Typography
                                    color="text.secondary"
                                    className="font-semibold text-12 whitespace-nowrap"
                                >
                                    {data.config.code}
                                </Typography>
                            </TableCell>
                            <TableCell component="th" width={1} title='افزودن پارامتر جدید'>
                                <FuseSvgIcon className="text-48 cursor-pointer" size={24}
                                             color="action">material-twotone:add</FuseSvgIcon>
                            </TableCell>
                            <TableCell component="th" width={1} ></TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {data && data.subConfig.map((item) => {
                            return (
                                <TableRow className='cursor-pointer' key={item.id}>
                                    <TableCell component="th" width={1}>
                                        <FuseSvgIcon className="text-48" size={24}
                                                     color="action">
                                            {item.value ? 'heroicons-outline:document' : 'heroicons-outline:folder'}
                                        </FuseSvgIcon>
                                    </TableCell>
                                    <TableCell component="th">
                                        <Typography className="" color="text.secondary "
                                                    onClick={() => setNewFolder(item.id)}>
                                            {item.code}
                                        </Typography>
                                    </TableCell>
                                    <TableCell component="th" width={1}>
                                        <FuseSvgIcon className="text-48" size={24}
                                                     color="action">heroicons-outline:trash</FuseSvgIcon>
                                    </TableCell>
                                    <TableCell component="th" width={1}>
                                        <FuseSvgIcon className="text-48" size={24}
                                                     color="action">heroicons-outline:pencil</FuseSvgIcon>
                                    </TableCell>
                                    <TableCell component="th" width={1} ></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {newFolder && <ParamsPageDrawer folder={newFolder} folderSetter={setNewFolder} width={width - 5}/>}
            </Drawer>
        </div>
    );
}

export default withRouter(ParamsPageDrawer);
