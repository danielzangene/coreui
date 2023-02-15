import withReducer from 'app/store/withReducer';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {useParams} from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import SettingPage from './SettingPage';
import SettingSidebarList from './SettingSidebarList';
import ParamsPage from "./ParamsPage";
import ThemePage from "./ThemePage";
import ExamplePage from "../example/Example";

const Root = styled(FusePageCarded)(({theme}) => ({
    '& .FusePageCarded-header': {},
    '& .FusePageCarded-sidebar': {},
    '& .FusePageCarded-leftSidebar': {},
}));

function Settings(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    const params = useParams();

    const settingList = [
        {id: "params", name: "مقادیر ثابت", page: <ParamsPage key='params' />, icon: 'heroicons-outline:adjustments'},
        {id: "theme", name: "تم", page: <ThemePage key='theme'/>, icon: 'heroicons-outline:color-swatch'}
    ]
    useEffect(() => {
    }, [settingList]);


    return (
        <Root
            content={
                <div className="flex flex-col w-full items-center p-24">
                    <SettingPage list={settingList}/>
                </div>
            }
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarOnClose={() => {
                setLeftSidebarOpen(false);
            }}
            leftSidebarContent={<SettingSidebarList list={settingList}/>}
            scroll={isMobile ? 'normal' : 'content'}
        />
    );
}
export default Settings;
