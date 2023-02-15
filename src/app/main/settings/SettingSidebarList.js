import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import {styled} from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {motion} from 'framer-motion';
import {useDispatch} from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {useEffect} from 'react';

const StyledListItem = styled(ListItem)(({theme, active}) => ({
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: '100%',
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
    fontWeight: 500,
    '&.active': {
        backgroundColor:
            theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, .05)!important'
                : 'rgba(255, 255, 255, .1)!important',
        pointerEvents: 'none',
        '& .list-item-icon': {
            color: theme.palette.secondary.main,
        },
    },
    '& .list-item-icon': {
        marginRight: 16,
    },
}));

function SettingSidebarList(props) {
    const {list} = props
    const dispatch = useDispatch();

    return (
        <div className="px-16 py-24">
            <div
                component={motion.div}
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1, transition: {delay: 0.2}}}
            >
                <List className="">
                    {list.map((item) => {
                        return (
                            <StyledListItem
                                button
                                component={NavLinkAdapter}
                                to={`/settings/${item.id}`}
                                end
                                activeClassName="active"
                                key={item.id}
                            >
                                <FuseSvgIcon key={item.id} className="list-item-icon" color="disabled">
                                    {item.icon}
                                </FuseSvgIcon>
                                <ListItemText className="truncate" primary={item.name} disableTypography/>
                            </StyledListItem>
                        );
                    })}

                </List>
            </div>
        </div>
    );
}

export default SettingSidebarList;
