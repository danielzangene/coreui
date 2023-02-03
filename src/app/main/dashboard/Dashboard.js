import {styled} from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import UseFetch from "../../util/UseFetch";

const Root = styled(FusePageSimple)(({theme}) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
    },
    '& .FusePageSimple-toolbar': {},
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {},
}));

function ExamplePage(props) {
    const {data} = UseFetch("/data/test", "POST", null)

    return (
        <Root
            content={
                <div className="p-24">
                    <h4>{data && data.resultData}</h4>
                    <br/>
                    <DemoContent/>
                </div>
            }
            scroll="content"
        />
    );
}

export default ExamplePage;
