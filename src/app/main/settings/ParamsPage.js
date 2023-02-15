import Typography from '@mui/material/Typography';
import withRouter from '@fuse/core/withRouter';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ParamsPageDrawer from "./ParamsPageDrawer";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import UseFetchUrl from "../../util/UseFetchUrl";
import netConfig from "../../util/netConfig";
import {showMessage} from "app/store/fuse/messageSlice";
import {useDispatch} from "react-redux";
import {Backdrop, CircularProgress} from "@mui/material";

function ParamsPage(props) {
    const [data, setData] = useState(null);
    const [anchor, setAnchor] = useState('');
    const params = useParams();
    const dispatch = useDispatch();

    async function getData() {
        const d = await UseFetchUrl("/api/config/all", "PATCH", null)
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
        <div className="table-responsive mt-12" id='drawer-container'>
            <Table className="simple w-full min-w-full">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" width={1}>
                            <FuseSvgIcon className="text-48 hidden" size={24}
                                         color="action">material-twotone:arrow_back_ios_new</FuseSvgIcon>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Typography
                                color="text.secondary"
                                className="font-semibold text-12 whitespace-nowrap"
                            >
                                لیست
                            </Typography>
                        </TableCell>
                        <TableCell component="th" width={1} title='افزودن پارامتر جدید'>
                            <FuseSvgIcon className="text-48 cursor-pointer" size={24}
                                         color="action">material-twotone:add</FuseSvgIcon>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data && data.map((item) => {
                        return (
                            <TableRow className='cursor-pointer' key={item.id}>
                                <TableCell component="th" width={1}>
                                    <FuseSvgIcon className="text-48" size={24} color="action">
                                        {item.parentId ? 'heroicons-outline:document' : 'heroicons-outline:folder'}
                                    </FuseSvgIcon>
                                </TableCell>
                                <TableCell component="th">
                                    <Typography className="" color="text.secondary " onClick={() => setAnchor(item.id)}>
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
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {anchor && <ParamsPageDrawer folder={anchor} folderSetter={setAnchor} width={95}/>}
        </div>
    );
}

export default withRouter(ParamsPage);
