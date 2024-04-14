import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from "../../../redux/Authentication/action"
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role : "admin"
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAdminLoginLoading } = useSelector(st => st.authReducer);
  const { isAdminLoginError } = useSelector(st => st.authReducer);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    console.log({ formData });
    dispatch(adminLogin(formData, toast)).then((res) => {
      if (!isAdminLoginError) {
        navigate(-1);
      }
    })
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Hey Admin, Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                onChange={handleOnChange}
                value={formData.email}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                onChange={handleOnChange}
                value={formData.password}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleClick}
              >
                {isAdminLoginLoading ? <ClipLoader /> : "Sign in"}
              </Button>

            </Stack>
            <Box>
            <Text>{`Don't Have Any Admin Account?`}</Text>
            <Link to={"/admin/signup"}><Text>{`Create A New Account`}</Text></Link>
          </Box>
          </Stack>
        </Box>
      </Stack>

    </Flex>
  );
}
