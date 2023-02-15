import withRouter from '@fuse/core/withRouter';
import {useParams} from "react-router-dom";

function SettingPage(props) {
    const {list} = props
    const params = useParams();

    return list.filter((item) => item.id === params.pageId).map((item) => item.page);
}

export default withRouter(SettingPage);
