import { useState } from 'react';
import { ChakraProvider, CSSReset, Box, Heading, FormControl, FormLabel, Input, Button, VStack, InputGroup, InputRightElement, IconButton, useToast, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for show/hide password
import { useDispatch, useSelector } from 'react-redux';
// import { UserLogin } from '../../../redux/Authtication/action';
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { UserLogin } from '../../../redux/Authentication/action';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
 
  const navigate = useNavigate();
  // const location = useLocation();
  const loader = useSelector(st => st.authReducer.isLoginLoading);
  const isLoginError = useSelector(st => st.authReducer.isLoginError);
  const userSignupPreviousState = useSelector(st => st.authReducer.userSignupPreviousState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserLogin({ email: formData.email, password: formData.password, role: "user" }, toast)).then((res) => {
      if (!isLoginError) {
        // Check if the previous route was the signup route
        
        // Redirect based on the condition
        if (userSignupPreviousState === "signup") {
          navigate('/');
        } else {
          navigate(-1);
        }
      }
    });


  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        display="flex"
        alignItems="center"
        // justifyContent="center"
        height="100vh"
        boxShadow="lg"
        p={6}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <VStack spacing={4} border={"1px solid black"} p={10} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"} borderRadius={"10px"} w={400}>
            <Heading mb={8}>Login</Heading>

            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={handleTogglePassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button m={5} colorScheme="teal" type="submit">
                {loader ? <ClipLoader /> : "Login"}
              </Button>
            </form>
            <Text>{`Don't Have Any Accoutn`} <Link color='blue' to={"/user/signup"}>Create A Accoutn</Link> </Text>
            <Text><Link color='blue' to={"/user/forgetpass"}>Forget Password?</Link> </Text>

          </VStack>
        </motion.div>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
