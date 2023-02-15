import Typography from '@mui/material/Typography';
import withRouter from '@fuse/core/withRouter';
import {useEffect} from "react";
import {useParams} from "react-router-dom";

function ThemePage(props) {
    const params = useParams();

    useEffect(() => {
        console.log(params)
        if (!params){
            console.log("testestsetse")
        }
    }, [params]);

  return  (
      <Typography color="text.secondary" variant="h5">
        theme to show!
      </Typography>
  );
}

export default withRouter(ThemePage);
