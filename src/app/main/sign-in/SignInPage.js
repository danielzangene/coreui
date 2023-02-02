import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import {showMessage} from 'app/store/fuse/messageSlice';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import {CircularProgress} from "@mui/material";
import UseFetchUrl from "../../util/UseFetchUrl";
import netConfig from "../../util/netConfig";
import {isUserLoggedIn} from "../../util/TokenHandler";
import {useDispatch} from "react-redux";


const schema = yup.object().shape({
  email: yup.string().required('لطفا نام کاربری را وارد کنید'),
  password: yup.string().required('لطفا رمزعبور را وارد کتید.')
});

const defaultValues = {
  email: '',
  password: '',
};

function SignInPage() {
  const [isPending, setIsPending] = useState(false)
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const dispatch = useDispatch();

  useEffect(() => {
    if(isUserLoggedIn())console.log("testestset")
  }, [isPending]);

  async function onSubmit({ email, password }) {
    setIsPending(true)
    const data = await UseFetchUrl("/api/auth/signin", "POST", { username:email, password })
    if (data.code !== netConfig.okStatus) {
      dispatch(
          showMessage({
            message     : data.message,
            autoHideDuration: 6000,
            anchorOrigin: {
              vertical  : 'bottom',
              horizontal: 'right'
            },
            variant: 'error'
          }))

  } else if (data) {
      if (data.resultData) localStorage.setItem("accessToken", data.resultData.token)
      location.href = '/dashboard'
    }
    setIsPending(false)

  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            ورود
          </Typography>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="نام کاربری"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="رمزعبور"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Link className="text-md font-medium" to="/pages/auth/forgot-password">
                رمزعبور خود را فراموش کرده اید؟
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={!isPending && (_.isEmpty(dirtyFields) || !isValid)}
              type="submit"
              size="large"
            >
              {isPending ? <CircularProgress size={20}/> : 'ورود'}
            </Button>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>
      </Box>
    </div>
  );
}

export default SignInPage;
