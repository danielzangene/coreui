import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Link, NavLink} from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {useEffect, useState} from "react";
import {getUserData, logoutHandler} from "../../util/TokenHandler";

function UserMenu(props) {

    const [userMenu, setUserMenu] = useState(null);
    const [user, setUser] = useState(null);

    const userMenuClick = (event) => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    useEffect(() => {
        console.log(getUserData())
        setUser(getUserData())
    }, []);

    return (
        <>
            <Button
                className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
                onClick={userMenuClick}
                color="inherit"
            >
                <div className="hidden md:flex flex-col mx-4 items-end">
                    <Typography component="span" className="font-semibold flex">
                        {user && user.name}
                    </Typography>
                    <Typography className="text-11 font-medium capitalize" color="text.secondary">
                        {user && user.role.name}
                    </Typography>
                </div>

                <Avatar className="md:mx-4">{user && user.data && user.data}</Avatar>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                classes={{
                    paper: 'py-8',
                }}
            >
                <MenuItem component={Link} to="/user/profile" onClick={userMenuClose} role="button">
                    <ListItemIcon className="min-w-40">
                        <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="??????????????"/>
                </MenuItem>

                <MenuItem
                    component={NavLink}
                    to="/sign-out"
                    onClick={() => {
                        logoutHandler()
                        userMenuClose();
                    }}
                >
                    <ListItemIcon className="min-w-40">
                        <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="????????"/>
                </MenuItem>
            </Popover>
        </>
    );
}

export default UserMenu;
